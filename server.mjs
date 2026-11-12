import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
try { process.loadEnvFile?.(path.join(root, ".env")); } catch { /* Optional local env file. */ }

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};
const requestCounts = new Map();

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(payload));
}

async function readJson(request, maxBytes = 16_000) {
  let raw = "";
  for await (const chunk of request) {
    raw += chunk;
    if (Buffer.byteLength(raw) > maxBytes) throw new Error("request_too_large");
  }
  return JSON.parse(raw);
}

function allowRequest(request) {
  const now = Date.now();
  const key = request.socket.remoteAddress || "unknown";
  const entry = requestCounts.get(key);
  if (!entry || now - entry.startedAt >= 60_000) {
    requestCounts.set(key, { startedAt: now, count: 1 });
    return true;
  }
  entry.count += 1;
  return entry.count <= 15;
}

async function handleChat(request, response) {
  if (request.method !== "POST") return sendJson(response, 405, { error: "Use POST to send a chat message." });
  if (!allowRequest(request)) return sendJson(response, 429, { error: "Please wait a moment before sending another message." });
  if (!process.env.OPENAI_API_KEY) {
    return sendJson(response, 503, { error: "The AI assistant is not configured yet. Add OPENAI_API_KEY to the server environment." });
  }

  let body;
  try {
    body = await readJson(request);
  } catch (error) {
    const status = error.message === "request_too_large" ? 413 : 400;
    return sendJson(response, status, { error: status === 413 ? "That conversation is too long. Start a new chat." : "The message could not be read." });
  }

  const messages = Array.isArray(body?.messages) ? body.messages.slice(-20) : [];
  const input = messages
    .filter(message => ["user", "assistant"].includes(message?.role) && typeof message.content === "string")
    .map(message => ({ role: message.role, content: message.content.trim().slice(0, 2_000) }))
    .filter(message => message.content);
  if (!input.length || input.at(-1).role !== "user") {
    return sendJson(response, 400, { error: "Type a question before sending." });
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-6-astra",
        store: false,
        instructions: "You are the TREKKING website assistant. Answer questions clearly and helpfully, including general questions, with a special focus on Himalayan travel and the journeys on this site. The site features Sandakphu, Darjeeling, Sikkim, Kashmir, and Himachal journeys. Never invent live availability, route conditions, exact current prices, booking confirmations, or discount eligibility; tell the visitor to confirm those details with the trip team. This site cannot take bookings or payments. Do not ask for passwords, payment card details, or other sensitive information.",
        input
      }),
      signal: AbortSignal.timeout(45_000)
    });
    const result = await upstream.json();
    if (!upstream.ok) {
      console.error("OpenAI chat request failed:", upstream.status);
      return sendJson(response, 502, { error: "I couldn’t get an answer just now. Please try again in a moment." });
    }
    const answer = typeof result.output_text === "string" ? result.output_text.trim() : "";
    if (!answer) return sendJson(response, 502, { error: "I didn’t get a response. Please try asking another way." });
    return sendJson(response, 200, { answer });
  } catch (error) {
    console.error("AI chat service error:", error.name || "Error");
    return sendJson(response, 502, { error: "The assistant is temporarily unavailable. Please try again." });
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  if (url.pathname === "/api/chat") return handleChat(request, response);
  if (!["GET", "HEAD"].includes(request.method || "")) return sendJson(response, 405, { error: "Method not allowed." });

  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const target = path.resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const fileInfo = await stat(target);
    const filePath = fileInfo.isDirectory() ? path.join(target, "index.html") : target;
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, () => console.log(`TREKKING site running at http://localhost:${port}`));
