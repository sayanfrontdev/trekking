import { DurableObject } from "cloudflare:workers";
import { handleAuthRequest } from "./functions/auth.mjs";
import { readCurrentUser } from "./functions/auth.mjs";
import { ADMIN_EMAIL, handleSubmissionRequest } from "./functions/submissions.mjs";
import { verifyRecaptcha } from "./functions/recaptcha.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

function json(body, status = 200, cacheControl = "no-store") {
  return Response.json(body, {
    status,
    headers: { ...corsHeaders, "Cache-Control": cacheControl }
  });
}

const chatRequestsByIp = new Map();
const chatSystemPrompt = "You are the TREKKING website assistant. Answer clearly and helpfully, with a focus on Himalayan travel and the journeys on this site: Sandakphu, Darjeeling, Sikkim, Kashmir, and Himachal. Visitors can submit booking and trip enquiries; these are requests, not confirmed bookings. Payments are available only where the site explicitly offers a configured deposit. Never invent live availability, route conditions, exact current prices, booking confirmations, or discount eligibility; ask visitors to confirm those details with the trip team. Do not ask for passwords, card details, or other sensitive information.";

async function handleChatRequest(request, env) {
  if (request.method !== "POST") return json({ error: "Use POST to send a chat message." }, 405);
  if (!env.GEMINI_API_KEY) return json({ error: "The Google AI Studio chat service is not configured yet." }, 503);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  const recent = (chatRequestsByIp.get(ip) || []).filter(time => now - time < 60_000);
  if (recent.length >= 12) return json({ error: "Please wait a moment before sending another message." }, 429);
  recent.push(now);
  chatRequestsByIp.set(ip, recent);
  if (chatRequestsByIp.size > 2_000) {
    for (const [key, times] of chatRequestsByIp) {
      if (!times.some(time => now - time < 60_000)) chatRequestsByIp.delete(key);
    }
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 32_000) return json({ error: "That conversation is too long. Start a new chat." }, 413);
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "The message could not be read." }, 400); }
  const captcha = await verifyRecaptcha(body?.recaptchaToken, env.RECAPTCHA_SECRET_KEY, request);
  if (!captcha.ok) return json({ error: captcha.error }, 400);

  const messages = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
  const input = messages
    .filter(message => ["user", "assistant"].includes(message?.role) && typeof message.content === "string")
    .map(message => ({ role: message.role, content: message.content.trim().slice(0, 2_000) }))
    .filter(message => message.content);
  if (!input.length || input.at(-1).role !== "user") return json({ error: "Type a question before sending." }, 400);
  if (input.reduce((total, message) => total + message.content.length, 0) > 12_000) {
    return json({ error: "That conversation is too long. Start a new chat." }, 413);
  }

  try {
    const model = env.GEMINI_MODEL || "gemini-3.5-flash-lite";
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: {
        "x-goog-api-key": env.GEMINI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: chatSystemPrompt }] },
        contents: input.map(message => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }]
        })),
        generationConfig: { temperature: 0.7, maxOutputTokens: 700 }
      }),
      signal: AbortSignal.timeout(45_000)
    });
    let result;
    try { result = await upstream.json(); }
    catch { return json({ error: "Google AI Studio returned an invalid response. Please try again." }, 502); }
    if (!upstream.ok) {
      const providerStatus = typeof result?.error?.status === "string" ? result.error.status : "unknown";
      console.error("Google AI Studio chat request failed:", upstream.status, providerStatus);
      if (upstream.status === 429) return json({ error: "The AI assistant has reached its current usage limit. Please try again later." }, 429);
      if ([401, 403].includes(upstream.status)) return json({ error: "Google AI Studio rejected the API key. Check that GEMINI_API_KEY is valid and has Gemini API access." }, 502);
      if (upstream.status === 404) return json({ error: "The configured Gemini model is unavailable. Please check GEMINI_MODEL in the Worker settings." }, 502);
      return json({ error: "Google AI Studio could not answer just now. Please try again in a moment." }, 502);
    }
    const answer = Array.isArray(result?.candidates?.[0]?.content?.parts)
      ? result.candidates[0].content.parts.map(part => typeof part.text === "string" ? part.text : "").join("").trim()
      : "";
    if (!answer) {
      return json({ error: "Google AI Studio didn't return a reply. Please try asking another way." }, 502);
    }
    return json({ answer });
  } catch (error) {
    console.error("Google AI Studio chat request failed:", error?.name || "Error");
    return json({ error: "The assistant is temporarily unavailable. Please try again in a moment." }, 502);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    const authResponse = await handleAuthRequest(request, env);
    if (authResponse) return authResponse;
    const submissionResponse = await handleSubmissionRequest(request, env);
    if (submissionResponse) return submissionResponse;

    const url = new URL(request.url);
    if (url.pathname === "/api/site-pages" && request.method === "GET") {
      const pageKey = url.searchParams.get("key");
      if (pageKey) {
        if (!/^[a-z0-9/-]{1,80}$/.test(pageKey)) return json({ error: "Invalid page key." }, 400);
        try {
          const row = await env.DB.prepare("SELECT content_html, updated_at FROM site_pages WHERE page_key = ?")
            .bind(pageKey).first();
          return row
            ? json({ page: { key: pageKey, html: row.content_html, updatedAt: row.updated_at } }, 200, "no-store")
            : json({ error: "No saved page content." }, 404, "no-store");
        } catch { return json({ error: "Page content is unavailable." }, 503); }
      }
      const admin = await readCurrentUser(request, env);
      if (!admin || admin.email.toLowerCase() !== ADMIN_EMAIL || !admin.emailVerified) return json({ error: "Admin access is required." }, admin ? 403 : 401);
      try {
        const result = await env.DB.prepare("SELECT page_key, updated_at FROM site_pages ORDER BY page_key").all();
        return json({ pages: result.results || [] });
      } catch { return json({ error: "Page content is unavailable." }, 503); }
    }
    if (url.pathname === "/api/admin/site-pages" && request.method === "PUT") {
      if (!request.headers.get("Origin") || !sameOriginForWebSocket(request)) return json({ error: "This request could not be verified." }, 403);
      const admin = await readCurrentUser(request, env);
      if (!admin || admin.email.toLowerCase() !== ADMIN_EMAIL || !admin.emailVerified) return json({ error: "Admin access is required." }, admin ? 403 : 401);
      const declaredLength = Number(request.headers.get("Content-Length") || 0);
      if (declaredLength > 8_000_000) return json({ error: "The page update is too large." }, 413);
      let body;
      try {
        const rawBody = await request.text();
        if (rawBody.length > 8_000_000) return json({ error: "The page update is too large." }, 413);
        body = JSON.parse(rawBody);
      } catch { return json({ error: "The page update could not be read." }, 400); }
      if (!Array.isArray(body?.pages) || !body.pages.length || body.pages.length > 50) return json({ error: "Choose one or more pages to save." }, 400);
      const seen = new Set();
      for (const page of body.pages) {
        if (typeof page?.key !== "string" || !/^[a-z0-9/-]{1,80}$/.test(page.key) || seen.has(page.key)) return json({ error: "A page key is invalid or duplicated." }, 400);
        seen.add(page.key);
        if (typeof page.html !== "string" || !page.html.trim() || page.html.length > 1_000_000) return json({ error: `Page ${page.key} must contain HTML under 1 MB.` }, 400);
        if (/<\s*script\b|\son[a-z]+\s*=|javascript\s*:/i.test(page.html)) return json({ error: `Page ${page.key} contains unsupported script or event-handler markup.` }, 400);
      }
      const updatedAt = new Date().toISOString();
      try {
        const statements = body.pages.map(page => env.DB.prepare(
          "INSERT INTO site_pages (page_key, content_html, updated_at, updated_by) VALUES (?, ?, ?, ?) ON CONFLICT(page_key) DO UPDATE SET content_html = excluded.content_html, updated_at = excluded.updated_at, updated_by = excluded.updated_by"
        ).bind(page.key, page.html, updatedAt, admin.email.toLowerCase()));
        await env.DB.batch(statements);
        return json({ saved: body.pages.length, updatedAt });
      } catch { return json({ error: "Page content could not be saved. Apply database migration 0013 first." }, 503); }
    }
    if (url.pathname === "/api/admin/site-pages" && request.method !== "GET") return json({ error: "Use PUT to save page content." }, 405);
    if (request.method === "GET" && ["/community-photos", "/community-photos/"].includes(url.pathname)) {
      return env.ASSETS.fetch(new Request(new URL("/community-photos.html", request.url), request));
    }
    if (url.pathname === "/api/chat") return handleChatRequest(request, env);
    if (request.method !== "GET") return env.ASSETS.fetch(request);

    if (url.pathname === "/api/admin/events" && request.headers.get("Upgrade")?.toLowerCase() === "websocket") {
      if (!sameOriginForWebSocket(request)) return json({ error: "This request could not be verified." }, 403);
      const admin = await readCurrentUser(request, env);
      if (!admin || admin.email.toLowerCase() !== ADMIN_EMAIL || !admin.emailVerified) {
        return json({ error: "Admin access is required." }, admin ? 403 : 401);
      }
      const id = env.SUBMISSION_HUB.idFromName("admin-submissions");
      return env.SUBMISSION_HUB.get(id).fetch(request);
    }
    if (["/admin.html", "/admin", "/admin/"].includes(url.pathname)) {
      const user = await readCurrentUser(request, env);
      const status = !user ? 401 : user.email.toLowerCase() !== ADMIN_EMAIL || !user.emailVerified ? 403 : 200;
      if (status !== 200) {
        const message = status === 401
          ? "Sign in with the authorized Google account before opening the admin page."
          : `Admin access is restricted to ${ADMIN_EMAIL}.`;
        return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Admin access restricted</title><body style="font:16px system-ui;max-width:620px;margin:12vh auto;padding:24px;color:#10213a"><h1>Admin access restricted</h1><p>${message}</p><p><a href="/">Return to the site and sign in</a></p></body></html>`, {
          status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store" }
        });
      }
    }
    if (url.pathname === "/api/site-content") {
      try {
        const row = await env.DB.prepare(
          "SELECT content_json, updated_at FROM site_content WHERE id = 'public'"
        ).first();
        if (!row) return json({ error: "Site content has not been seeded yet." }, 404);
        const media = await env.DB.prepare("SELECT asset_key FROM site_assets GROUP BY asset_key").all();
        const assets = Object.fromEntries((media.results || []).map(({ asset_key }) => [
          `images/${asset_key}`,
          `${url.origin}/api/site-assets/${encodeURIComponent(asset_key)}`
        ]));
        return json(
          { content: { ...JSON.parse(row.content_json), assets, updatedAt: row.updated_at } },
          200,
          "public, max-age=60, stale-while-revalidate=300"
        );
      } catch {
        return json({ error: "Site content could not be loaded." }, 503);
      }
    }

    const mediaMatch = /^\/api\/site-assets\/([^/]+)$/.exec(url.pathname);
    if (mediaMatch) {
      try {
        const assetKey = decodeURIComponent(mediaMatch[1]);
        const result = await env.DB.prepare(
          "SELECT mime_type, data FROM site_assets WHERE asset_key = ? ORDER BY chunk_index"
        ).bind(assetKey).all();
        const rows = result.results || [];
        if (!rows.length) return new Response("Asset not found", { status: 404, headers: corsHeaders });
        const chunks = rows.map(({ data }) => {
          if (data instanceof ArrayBuffer) return new Uint8Array(data);
          if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
          if (Array.isArray(data)) return Uint8Array.from(data);
          throw new TypeError(`Unsupported D1 BLOB result: ${Object.prototype.toString.call(data)}`);
        });
        const body = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
          body.set(chunk, offset);
          offset += chunk.byteLength;
        }
        return new Response(body, {
          headers: {
            ...corsHeaders,
            "Content-Type": rows[0].mime_type,
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff"
          }
        });
      } catch (error) {
        console.error("D1 media response failed", error);
        return new Response("Asset could not be loaded", { status: 503, headers: corsHeaders });
      }
    }

    if (url.pathname !== "/" && !url.pathname.endsWith("/") && !/\.[^/]+$/.test(url.pathname)) {
      const pageUrl = new URL(request.url);
      pageUrl.pathname = `${pageUrl.pathname}.html`;
      return env.ASSETS.fetch(new Request(pageUrl, request));
    }
    return env.ASSETS.fetch(request);
  }
};

function sameOriginForWebSocket(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}

export class AdminSubmissionHub extends DurableObject {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/broadcast" && request.method === "POST") {
      const message = JSON.stringify({ type: "submissions_changed", at: Date.now() });
      let delivered = 0;
      for (const socket of this.ctx.getWebSockets()) {
        try { socket.send(message); delivered += 1; } catch { socket.close(1011, "Notification failed"); }
      }
      return Response.json({ delivered });
    }
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
      return new Response("WebSocket upgrade required", { status: 426 });
    }
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    server.send(JSON.stringify({ type: "connected" }));
    return new Response(null, { status: 101, webSocket: client });
  }
}
