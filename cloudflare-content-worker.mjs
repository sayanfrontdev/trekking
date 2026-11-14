import { handleAuthRequest } from "./functions/auth.mjs";
import { readCurrentUser } from "./functions/auth.mjs";
import { ADMIN_EMAIL, handleSubmissionRequest } from "./functions/submissions.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

function json(body, status = 200, cacheControl = "no-store") {
  return Response.json(body, {
    status,
    headers: { ...corsHeaders, "Cache-Control": cacheControl }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    const authResponse = await handleAuthRequest(request, env);
    if (authResponse) return authResponse;
    const submissionResponse = await handleSubmissionRequest(request, env);
    if (submissionResponse) return submissionResponse;
    if (request.method !== "GET") return env.ASSETS.fetch(request);

    const url = new URL(request.url);
    if (url.pathname === "/admin.html") {
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

    return env.ASSETS.fetch(request);
  }
};
