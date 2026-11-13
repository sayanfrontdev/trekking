import { createServer } from "node:http";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHmac, createHash, createSign, createPublicKey, verify as verifySignature } from "node:crypto";
import { applicationDefault, cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const root = typeof import.meta.url === "string"
  ? path.dirname(fileURLToPath(import.meta.url))
  : process.cwd();
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
const scrypt = promisify(scryptCallback);
const dataDirectory = path.join(root, "data");
const dataFile = path.join(dataDirectory, "site-data.json");
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || "";
let firestore = null;
if (firebaseProjectId) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : null;
  const firebaseApp = initializeApp({
    projectId: firebaseProjectId,
    credential: serviceAccount ? cert(serviceAccount) : applicationDefault()
  });
  firestore = getFirestore(firebaseApp);
}
const storeCollections = {
  users: "users",
  sessions: "sessions",
  passwordResets: "passwordResets",
  bookings: "bookings",
  inquiries: "inquiries",
  payments: "payments"
};
const storeKeyFields = {
  users: "id",
  sessions: "tokenHash",
  passwordResets: "tokenHash",
  bookings: "id",
  inquiries: "id",
  payments: "orderId"
};
const authRequestCounts = new Map();
const oauthStates = new Map();
let writeQueue = Promise.resolve();
let dataStoreInitialization;
const tripCatalog = {
  sandakphu: "Sandakphu: the trail above the clouds",
  "sandakphu-village-trail": "Singalila ridge and quiet villages",
  sikkim: "Sikkim, slowly",
  "sikkim-village-walk": "Sikkim village walks and monastery stays",
  darjeeling: "Tea trails & Darjeeling mornings",
  "darjeeling-tea-country": "Darjeeling tea country by foot",
  kashmir: "Kashmir, the great outdoors",
  "kashmir-meadows": "Kashmir meadow and lake escape",
  himachal: "Himachal beyond the postcards",
  "himachal-forest-paths": "Pine forest paths of Himachal",
  weekend: "A little further into the hills"
};

async function readStore() {
  if (firestore) {
    const entries = await Promise.all(Object.entries(storeCollections).map(async ([key, collection]) => {
      const snapshot = await firestore.collection(collection).get();
      return [key, snapshot.docs.map(document => document.data())];
    }));
    const store = Object.fromEntries(entries);
    store.users ||= [];
    store.sessions ||= [];
    store.passwordResets ||= [];
    store.bookings ||= [];
    store.inquiries ||= [];
    store.payments ||= [];
    return store;
  }
  if (process.env.NODE_ENV === "production") throw new Error("FIREBASE_PROJECT_ID is required in production.");
  try {
    const store = JSON.parse(await readFile(dataFile, "utf8"));
    store.users ||= [];
    store.sessions ||= [];
    store.passwordResets ||= [];
    store.bookings ||= [];
    store.inquiries ||= [];
    store.payments ||= [];
    return store;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return { users: [], sessions: [], passwordResets: [], bookings: [], inquiries: [], payments: [] };
  }
}

function updateStore(update) {
  const operation = writeQueue.then(async () => {
    if (firestore) {
      const lockRef = firestore.collection("appMetadata").doc("storeWriteLock");
      return firestore.runTransaction(async transaction => {
        const lock = await transaction.get(lockRef);
        const snapshots = await Promise.all(Object.entries(storeCollections).map(([key, collection]) =>
          transaction.get(firestore.collection(collection)).then(snapshot => [key, snapshot])
        ));
        const prior = Object.fromEntries(snapshots.map(([key, snapshot]) => [key,
          snapshot.docs.map(document => document.data())
        ]));
        for (const key of Object.keys(storeCollections)) prior[key] ||= [];
        const next = structuredClone(prior);
        const value = update(next);

        for (const [key, collection] of Object.entries(storeCollections)) {
          const keyField = storeKeyFields[key];
          const before = new Map(prior[key].map(item => [String(item[keyField]), item]));
          const after = new Map(next[key].map(item => [String(item[keyField]), item]));
          const collectionRef = firestore.collection(collection);
          for (const [id] of before) if (!after.has(id)) transaction.delete(collectionRef.doc(id));
          for (const [id, item] of after) {
            if (!before.has(id) || JSON.stringify(before.get(id)) !== JSON.stringify(item)) {
              transaction.set(collectionRef.doc(id), item);
            }
          }
        }
        transaction.set(lockRef, { updatedAt: FieldValue.serverTimestamp(), revision: (lock.data()?.revision || 0) + 1 });
        return value;
      });
    }
    if (process.env.NODE_ENV === "production") throw new Error("FIREBASE_PROJECT_ID is required in production.");
    const store = await readStore();
    const result = update(store);
    await mkdir(dataDirectory, { recursive: true, mode: 0o700 });
    const temporaryFile = `${dataFile}.${process.pid}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(store, null, 2), { mode: 0o600 });
    await rename(temporaryFile, dataFile);
    return result;
  });
  writeQueue = operation.catch(() => {});
  return operation;
}

function cleanText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, maxLength) : "";
}

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || "").split(";").map(part => {
    const index = part.indexOf("=");
    return index < 0 ? ["", ""] : [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }).filter(([key]) => key));
}

function setSessionCookie(response, token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `trekking_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure}`);
}

function clearSessionCookie(response) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";c
  response.setHeader("Set-Cookie", `trekking_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`);
}

async function currentUser(request) {
  const token = parseCookies(request).trekking_session;
  if (!token) return null;
  const store = await readStore();
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const session = store.sessions.find(item => item.tokenHash === tokenHash);
  if (!session || session.expiresAt <= Date.now()) return null;
  const user = store.users.find(item => item.id === session.userId);
  return user ? { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl || null } : null;
}

function googleAvatarUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "googleusercontent.com" || url.hostname.endsWith(".googleusercontent.com")) ? url.href : "";
  } catch { return ""; }
}

function sameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === request.headers.host; } catch { return false; }
}

function allowAuthRequest(request) {
  const now = Date.now();
  const key = request.socket.remoteAddress || "unknown";
  const entry = authRequestCounts.get(key);
  if (!entry || now - entry.startedAt >= 60_000) {
    authRequestCounts.set(key, { startedAt: now, count: 1 });
    return true;
  }
  entry.count += 1;
  return entry.count <= 8;
}

async function createSession(user, response) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  await updateStore(store => {
    store.sessions = store.sessions.filter(item => item.expiresAt > Date.now());
    store.sessions.push({ tokenHash, userId: user.id, expiresAt });
  });
  setSessionCookie(response, token);
  return { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl || null };
}

function oauthProviderReady(provider) {
  return provider === "google"
    ? Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REDIRECT_URI)
    : Boolean(process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY_PATH && process.env.APPLE_REDIRECT_URI);
}

async function createOAuthState(provider) {
  const state = randomBytes(24).toString("base64url");
  const nonce = randomBytes(24).toString("base64url");
  const flow = { provider, nonce, expiresAt: Date.now() + 10 * 60_000 };
  if (firestore) await firestore.collection("oauthStates").doc(state).set(flow);
  else oauthStates.set(state, flow);
  return { state, nonce };
}

async function consumeOAuthState(state) {
  if (!state) return null;
  if (!firestore) {
    const flow = oauthStates.get(state);
    oauthStates.delete(state);
    return flow || null;
  }
  const reference = firestore.collection("oauthStates").doc(state);
  return firestore.runTransaction(async transaction => {
    const snapshot = await transaction.get(reference);
    if (!snapshot.exists) return null;
    transaction.delete(reference);
    return snapshot.data();
  });
}

function sendOAuthError(response, status, message) {
  response.writeHead(status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  response.end(`<!doctype html><meta charset="utf-8"><title>Sign-in unavailable</title><main style="font:16px system-ui;max-width:560px;margin:12vh auto;padding:24px"><h1>Sign-in could not be completed</h1><p>${message}</p><a href="/">Return to TREKKING</a></main>`);
}

async function oauthLogin(provider, claims, name, response) {
  const email = cleanText(claims.email, 254).toLowerCase();
  const verified = claims.email_verified === true || claims.email_verified === "true";
  if (!verified || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !claims.sub) {
    return sendOAuthError(response, 401, "The provider did not return a verified email address.");
  }
  let user;
  try {
    await updateStore(store => {
      user = store.users.find(item => item.email === email);
      if (!user) {
        user = { id: randomBytes(12).toString("hex"), name: cleanText(name, 120) || email.split("@")[0], email, createdAt: new Date().toISOString() };
        store.users.push(user);
      }
      if (provider === "google") user.avatarUrl = googleAvatarUrl(claims.picture) || user.avatarUrl || "";
      user.providers ||= {};
      user.providers[provider] = claims.sub;
    });
  } catch (error) {
    console.error("Social account storage failed:", error.code || error.name || "Error");
    return sendOAuthError(response, 500, "Your account could not be saved.");
  }
  await createSession(user, response);
  response.writeHead(303, { Location: "/", "Cache-Control": "no-store" }).end();
}

async function beginOAuth(provider, response) {
  if (!oauthProviderReady(provider)) return sendOAuthError(response, 503, `${provider === "google" ? "Google" : "Apple"} sign-in credentials are not configured on the server.`);
  const { state, nonce } = await createOAuthState(provider);
  const google = provider === "google";
  const endpoint = google ? "https://accounts.google.com/o/oauth2/v2/auth" : "https://appleid.apple.com/auth/authorize";
  const params = new URLSearchParams({
    client_id: google ? process.env.GOOGLE_CLIENT_ID : process.env.APPLE_CLIENT_ID,
    redirect_uri: google ? process.env.GOOGLE_REDIRECT_URI : process.env.APPLE_REDIRECT_URI,
    response_type: "code",
    response_mode: google ? "query" : "form_post",
    scope: google ? "openid email profile" : "openid email name",
    state,
    nonce
  });
  if (google) params.set("access_type", "online");
  response.writeHead(302, { Location: `${endpoint}?${params}`, "Cache-Control": "no-store" }).end();
}

async function exchangeCode(provider, code, redirectUri) {
  let clientSecret;
  let endpoint;
  let clientId;
  if (provider === "google") {
    clientId = process.env.GOOGLE_CLIENT_ID;
    clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    endpoint = "https://oauth2.googleapis.com/token";
  } else {
    clientId = process.env.APPLE_CLIENT_ID;
    endpoint = "https://appleid.apple.com/auth/token";
    const keyPath = path.resolve(root, process.env.APPLE_PRIVATE_KEY_PATH);
    const privateKey = await readFile(keyPath, "utf8");
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: "ES256", kid: process.env.APPLE_KEY_ID })).toString("base64url");
    const payload = Buffer.from(JSON.stringify({ iss: process.env.APPLE_TEAM_ID, iat: now, exp: now + 300, aud: "https://appleid.apple.com", sub: clientId })).toString("base64url");
    const unsigned = `${header}.${payload}`;
    const signer = createSign("SHA256");
    signer.update(unsigned);
    signer.end();
    clientSecret = `${unsigned}.${signer.sign({ key: privateKey, dsaEncoding: "ieee-p1363" }).toString("base64url")}`;
  }
  const form = new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri, client_id: clientId, client_secret: clientSecret });
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form, signal: AbortSignal.timeout(20_000) });
  const result = await response.json();
  if (!response.ok || !result.id_token) throw new Error("oauth_token_exchange_failed");
  return result.id_token;
}

async function readVerifiedIdentityToken(provider, token) {
  if (provider === "google") {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error("google_token_invalid");
    return response.json();
  }
  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature) throw new Error("apple_token_invalid");
  const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString("utf8"));
  const claims = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  const response = await fetch("https://appleid.apple.com/auth/keys", { signal: AbortSignal.timeout(15_000) });
  const { keys } = await response.json();
  const jwk = keys?.find(key => key.kid === header.kid && key.alg === header.alg);
  if (!jwk || header.alg !== "RS256") throw new Error("apple_key_missing");
  const publicKey = createPublicKey({ key: jwk, format: "jwk" });
  const valid = verifySignature("RSA-SHA256", Buffer.from(`${encodedHeader}.${encodedPayload}`), publicKey, Buffer.from(encodedSignature, "base64url"));
  if (!valid) throw new Error("apple_signature_invalid");
  return claims;
}

async function finishOAuth(provider, request, response, params) {
  const state = params.get("state") || "";
  const flow = await consumeOAuthState(state);
  if (!flow || flow.provider !== provider || flow.expiresAt < Date.now() || params.has("error")) return sendOAuthError(response, 400, "The sign-in session expired or was cancelled. Please try again.");
  const code = params.get("code");
  if (!code || !oauthProviderReady(provider)) return sendOAuthError(response, 400, "The provider response was incomplete.");
  try {
    const token = await exchangeCode(provider, code, provider === "google" ? process.env.GOOGLE_REDIRECT_URI : process.env.APPLE_REDIRECT_URI);
    const claims = await readVerifiedIdentityToken(provider, token);
    const expectedAudience = provider === "google" ? process.env.GOOGLE_CLIENT_ID : process.env.APPLE_CLIENT_ID;
    const issuerOk = provider === "google"
      ? ["accounts.google.com", "https://accounts.google.com"].includes(claims.iss)
      : claims.iss === "https://appleid.apple.com";
    const expectedNonce = provider === "apple" ? createHash("sha256").update(flow.nonce).digest("hex") : flow.nonce;
    if (claims.aud !== expectedAudience || !issuerOk || Number(claims.exp) * 1000 <= Date.now() || claims.nonce !== expectedNonce) {
      return sendOAuthError(response, 401, "The identity response could not be verified.");
    }
    const verifiedEmail = provider === "google" ? claims.email_verified === "true" : claims.email_verified === "true" || claims.email_verified === true;
    claims.email_verified = verifiedEmail;
    return oauthLogin(provider, claims, claims.name || claims.email?.split("@")[0], response);
  } catch (error) {
    console.error(`${provider} sign-in failed:`, error.name || "Error");
    return sendOAuthError(response, 502, "The identity provider could not complete sign-in. Please try email and password.");
  }
}

async function handleOAuthRequest(request, response, url) {
  const [, , provider, action = "start"] = url.pathname.split("/");
  if (!["google", "apple"].includes(provider)) return sendOAuthError(response, 404, "Identity provider not found.");
  if (action === "start" && request.method === "GET") return beginOAuth(provider, response);
  if (provider === "google" && action === "callback" && request.method === "GET") return finishOAuth(provider, request, response, url.searchParams);
  if (provider === "apple" && action === "callback" && request.method === "POST") {
    let body = "";
    for await (const chunk of request) {
      body += chunk;
      if (Buffer.byteLength(body) > 16_000) return sendOAuthError(response, 413, "The provider response was too large.");
    }
    return finishOAuth(provider, request, response, new URLSearchParams(body));
  }
  return sendOAuthError(response, 405, "Unsupported sign-in request.");
}

async function storeInquiry(type, payload) {
  const id = `${type.toUpperCase()}-${randomBytes(8).toString("hex").toUpperCase()}`;
  const createdAt = new Date().toISOString();
  await updateStore(store => {
    store.inquiries.push({ id, type, status: "received", createdAt, ...payload });
  });
  return { id, createdAt };
}

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
        instructions: "You are the TREKKING website assistant. Answer questions clearly and helpfully, including general questions, with a special focus on Himalayan travel and the journeys on this site. The site features Sandakphu, Darjeeling, Sikkim, Kashmir, and Himachal journeys. Visitors can submit booking and trip enquiries; these are requests, not confirmed bookings. Payments are available only where the site explicitly offers a configured deposit. Never invent live availability, route conditions, exact current prices, booking confirmations, or discount eligibility; tell the visitor to confirm those details with the trip team. Do not ask for passwords, payment card details, or other sensitive information.",
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

async function handleInquiry(request, response, type) {
  if (request.method !== "POST") return sendJson(response, 405, { error: "Use POST to submit this form." });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  if (!allowRequest(request)) return sendJson(response, 429, { error: "Please wait a moment before submitting again." });
  let body;
  try { body = await readJson(request); } catch { return sendJson(response, 400, { error: "The form could not be read." }); }
  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(response, 400, { error: "Enter a valid name and email address." });
  }
  const allowedTypes = new Set(["booking", "planner", "contact"]);
  if (!allowedTypes.has(type)) return sendJson(response, 404, { error: "Form not found." });
  const payload = { name, email, phone: cleanText(body.phone, 40), message: cleanText(body.message, 2_000) };
  if (type === "booking") {
    payload.trip = cleanText(body.trip, 160);
    payload.tripName = tripCatalog[payload.trip] || "";
    payload.date = cleanText(body.date, 40);
    payload.guests = cleanText(body.guests, 40);
    if (!payload.tripName) return sendJson(response, 400, { error: "Choose a valid journey before submitting." });
  } else if (type === "planner") {
    payload.place = cleanText(body.place, 100);
    payload.style = cleanText(body.style, 100);
    payload.dates = cleanText(body.dates, 100);
    payload.people = cleanText(body.people, 40);
    if (!payload.place || !payload.style) return sendJson(response, 400, { error: "Choose a destination and travel style." });
  } else {
    payload.interest = cleanText(body.interest, 120);
    if (payload.message.length < 5) return sendJson(response, 400, { error: "Add a short message before submitting." });
  }
  try {
    const record = await storeInquiry(type, payload);
    return sendJson(response, 201, { reference: record.id, status: "received", message: "Your request was saved. It is not a confirmed booking." });
  } catch (error) {
    console.error("Inquiry storage failed:", error.code || error.name || "Error");
    return sendJson(response, 500, { error: "We couldn’t save your request. Please try again." });
  }
}

async function handleAuth(request, response, action) {
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  if (action === "me" && request.method === "GET") {
    return sendJson(response, 200, { user: await currentUser(request) });
  }
  if (!allowAuthRequest(request)) return sendJson(response, 429, { error: "Too many sign-in attempts. Please wait one minute." });
  if (action === "forgot-password" && request.method === "POST") return handleForgotPassword(request, response);
  if (action === "reset-password" && request.method === "POST") return handleResetPassword(request, response);
  if (action === "logout" && request.method === "POST") {
    const token = parseCookies(request).trekking_session;
    if (token) {
      const tokenHash = createHash("sha256").update(token).digest("hex");
      await updateStore(store => { store.sessions = store.sessions.filter(item => item.tokenHash !== tokenHash); });
    }
    clearSessionCookie(response);
    return sendJson(response, 200, { user: null });
  }
  if (!["register", "login"].includes(action) || request.method !== "POST") {
    return sendJson(response, 405, { error: "Unsupported account action." });
  }
  let body;
  try { body = await readJson(request); } catch { return sendJson(response, 400, { error: "The account details could not be read." }); }
  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 128) {
    return sendJson(response, 400, { error: "Use a valid email and a password between 12 and 128 characters." });
  }
  const store = await readStore();
  let user = store.users.find(item => item.email === email);
  if (action === "register") {
    const name = cleanText(body.name, 120);
    if (name.length < 2) return sendJson(response, 400, { error: "Enter your name." });
    if (user) return sendJson(response, 409, { error: "An account with that email already exists. Sign in instead." });
    const salt = randomBytes(16).toString("hex");
    const passwordHash = (await scrypt(password, salt, 64)).toString("hex");
    user = { id: randomBytes(12).toString("hex"), name, email, salt, passwordHash, createdAt: new Date().toISOString() };
    let duplicate = false;
    try {
      await updateStore(current => {
        if (current.users.some(item => item.email === email)) { duplicate = true; return; }
        current.users.push(user);
      });
    } catch (error) {
      console.error("Account storage failed:", error.code || error.name || "Error");
      return sendJson(response, 500, { error: "We couldn’t create your account. Please try again." });
    }
    if (duplicate) return sendJson(response, 409, { error: "An account with that email already exists. Sign in instead." });
  } else {
    const passwordAccount = Boolean(user?.salt && user?.passwordHash);
    const salt = passwordAccount ? user.salt : "00000000000000000000000000000000";
    const candidate = Buffer.from(await scrypt(password, salt, 64));
    const expected = passwordAccount ? Buffer.from(user.passwordHash, "hex") : Buffer.alloc(64);
    if (!passwordAccount || !timingSafeEqual(candidate, expected)) return sendJson(response, 401, { error: "Email or password is incorrect." });
  }
  let publicUser;
  try { publicUser = await createSession(user, response); }
  catch (error) {
    console.error("Session storage failed:", error.code || error.name || "Error");
    return sendJson(response, 500, { error: "Your account is ready, but sign-in could not be completed. Please try again." });
  }
  return sendJson(response, action === "register" ? 201 : 200, { user: publicUser });
}

async function sendPasswordResetEmail(email, resetUrl) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) throw new Error("email_provider_not_configured");
  const upstream = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: "Reset your TREKKING password",
      text: `Use this link to choose a new password. It expires in 30 minutes: ${resetUrl}`,
      html: `<p>We received a request to reset your TREKKING password.</p><p><a href="${resetUrl}">Choose a new password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p>`
    }),
    signal: AbortSignal.timeout(15_000)
  });
  if (!upstream.ok) throw new Error("reset_email_send_failed");
}

async function handleForgotPassword(request, response) {
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return sendJson(response, 503, { error: "Password reset email is not configured yet. Please contact the site administrator." });
  }
  let body;
  try { body = await readJson(request); } catch { return sendJson(response, 400, { error: "The email address could not be read." }); }
  const email = cleanText(body.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendJson(response, 400, { error: "Enter a valid email address." });
  const store = await readStore();
  const user = store.users.find(item => item.email === email);
  if (user) {
    const token = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = Date.now() + 30 * 60 * 1000;
    await updateStore(current => {
      current.passwordResets = current.passwordResets.filter(item => item.userId !== user.id && item.expiresAt > Date.now());
      current.passwordResets.push({ tokenHash, userId: user.id, expiresAt });
    });
    try {
      const configuredBaseUrl = process.env.APP_BASE_URL || (process.env.NODE_ENV === "production" ? "" : `http://${request.headers.host || "localhost:3000"}`);
      if (!configuredBaseUrl) throw new Error("app_base_url_not_configured");
      const parsedBaseUrl = new URL(configuredBaseUrl);
      if (!/^https?:$/.test(parsedBaseUrl.protocol)) throw new Error("invalid_app_base_url");
      const baseUrl = parsedBaseUrl.origin;
      const resetUrl = `${baseUrl}/reset-password.html#token=${encodeURIComponent(token)}`;
      await sendPasswordResetEmail(email, resetUrl);
    } catch (error) {
      await updateStore(current => { current.passwordResets = current.passwordResets.filter(item => item.tokenHash !== tokenHash); });
      console.error("Password reset email failed:", error.name || "Error");
      return sendJson(response, 200, { message: "If an account exists for that email, a password reset link has been sent." });
    }
  }
  return sendJson(response, 200, { message: "If an account exists for that email, a password reset link has been sent." });
}

async function handleResetPassword(request, response) {
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  let body;
  try { body = await readJson(request); } catch { return sendJson(response, 400, { error: "The reset details could not be read." }); }
  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!token || password.length < 12 || password.length > 128) {
    return sendJson(response, 400, { error: "Use a reset link and a password between 12 and 128 characters." });
  }
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const store = await readStore();
  const reset = store.passwordResets.find(item => item.tokenHash === tokenHash && item.expiresAt > Date.now());
  if (!reset) return sendJson(response, 400, { error: "This reset link is invalid or expired. Request a new one." });
  const salt = randomBytes(16).toString("hex");
  const passwordHash = (await scrypt(password, salt, 64)).toString("hex");
  await updateStore(current => {
    const activeReset = current.passwordResets.find(item => item.tokenHash === tokenHash && item.expiresAt > Date.now());
    if (!activeReset) return;
    const user = current.users.find(item => item.id === activeReset.userId);
    if (!user) return;
    user.salt = salt;
    user.passwordHash = passwordHash;
    current.passwordResets = current.passwordResets.filter(item => item.userId !== user.id);
    current.sessions = current.sessions.filter(item => item.userId !== user.id);
  });
  const updated = await readStore();
  if (updated.users.find(item => item.id === reset.userId)?.passwordHash !== passwordHash) {
    return sendJson(response, 400, { error: "This reset link is invalid or expired. Request a new one." });
  }
  return sendJson(response, 200, { message: "Your password has been updated. Sign in with your new password." });
}

async function handleAccountRequests(request, response) {
  if (request.method !== "GET") return sendJson(response, 405, { error: "Use GET to read your trip requests." });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  const user = await currentUser(request);
  if (!user) return sendJson(response, 401, { error: "Sign in to view your trip requests." });
  const store = await readStore();
  const requests = store.inquiries
    .filter(item => item.email === user.email && ["booking", "planner"].includes(item.type))
    .slice(-20)
    .reverse()
    .map(item => ({
      reference: item.id,
      type: item.type,
      status: item.status,
      paymentStatus: item.paymentStatus || "unpaid",
      trip: item.tripName || item.trip || item.place || "Trip planning request",
      date: item.date || item.dates || ""
    }));
  return sendJson(response, 200, { requests });
}

function razorpaySettings() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  const expectedPrefix = process.env.RAZORPAY_MODE === "live" ? "rzp_live_" : "rzp_test_";
  if (!process.env.RAZORPAY_KEY_ID.startsWith(expectedPrefix)) return null;
  try {
    return {
      keyId: process.env.RAZORPAY_KEY_ID,
      keySecret: process.env.RAZORPAY_KEY_SECRET,
      deposits: JSON.parse(process.env.RAZORPAY_BOOKING_DEPOSITS_INR || "{}")
    };
  } catch {
    return null;
  }
}

async function handleCreatePaymentOrder(request, response) {
  if (request.method !== "POST") return sendJson(response, 405, { error: "Use POST to create a payment order." });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  if (!allowRequest(request)) return sendJson(response, 429, { error: "Please wait before trying payment again." });
  const settings = razorpaySettings();
  if (!settings) return sendJson(response, 503, { error: "Razorpay test keys and approved trip deposit amounts are not configured." });
  let body;
  try { body = await readJson(request); } catch { return sendJson(response, 400, { error: "Payment details could not be read." }); }
  const reference = cleanText(body.reference, 48);
  const store = await readStore();
  const booking = store.inquiries.find(item => item.type === "booking" && item.id === reference);
  if (!booking) return sendJson(response, 404, { error: "Booking request not found." });
  const amountInr = Number(settings.deposits[booking.trip]);
  const amount = Math.round(amountInr * 100);
  if (!Number.isSafeInteger(amountInr) || amount < 100 || amount > 200_000_000) {
    return sendJson(response, 503, { error: "An approved deposit amount is not configured for this journey." });
  }
  try {
    const auth = Buffer.from(`${settings.keyId}:${settings.keySecret}`).toString("base64");
    const upstream = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency: "INR", receipt: reference.slice(-40), notes: { booking_reference: reference, trip: booking.trip } }),
      signal: AbortSignal.timeout(20_000)
    });
    const order = await upstream.json();
    if (!upstream.ok || typeof order.id !== "string") {
      console.error("Razorpay order creation failed:", upstream.status);
      return sendJson(response, 502, { error: "Razorpay could not start checkout. Your booking request is saved." });
    }
    await updateStore(current => {
      current.payments ||= [];
      current.payments.push({ orderId: order.id, bookingReference: reference, amount, currency: "INR", status: "created", createdAt: new Date().toISOString() });
    });
    return sendJson(response, 201, { key: settings.keyId, orderId: order.id, amount, currency: "INR", name: booking.name, email: booking.email, trip: booking.tripName || booking.trip, reference });
  } catch (error) {
    console.error("Razorpay service error:", error.name || "Error");
    return sendJson(response, 502, { error: "Razorpay is temporarily unavailable. Your booking request is saved." });
  }
}

async function handlePaymentConfig(request, response, url) {
  if (request.method !== "GET") return sendJson(response, 405, { error: "Use GET to read payment availability." });
  const settings = razorpaySettings();
  const trip = cleanText(url.searchParams.get("trip"), 80);
  const amount = Number(settings?.deposits?.[trip]);
  const enabled = Boolean(settings && tripCatalog[trip] && Number.isSafeInteger(amount) && amount > 0);
  return sendJson(response, 200, { enabled, amountInr: enabled ? amount : null, currency: "INR" });
}

async function handleVerifyPayment(request, response) {
  if (request.method !== "POST") return sendJson(response, 405, { error: "Use POST to verify a payment." });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: "This request could not be verified." });
  let body;
  try { body = await readJson(request); } catch { return sendJson(response, 400, { error: "Payment response could not be read." }); }
  const orderId = cleanText(body.orderId, 80);
  const paymentId = cleanText(body.paymentId, 80);
  const signature = cleanText(body.signature, 128);
  const reference = cleanText(body.reference, 48);
  const settings = razorpaySettings();
  if (!settings || !orderId || !paymentId || !/^[a-f0-9]{64}$/i.test(signature)) return sendJson(response, 400, { error: "Payment response is incomplete." });
  const expected = createHmac("sha256", settings.keySecret).update(`${orderId}|${paymentId}`).digest();
  const received = Buffer.from(signature, "hex");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return sendJson(response, 400, { error: "Payment signature verification failed." });
  const payment = (await readStore()).payments?.find(item => item.orderId === orderId && item.bookingReference === reference);
  if (!payment) return sendJson(response, 404, { error: "Payment order was not found for this booking." });
  try {
    const auth = Buffer.from(`${settings.keyId}:${settings.keySecret}`).toString("base64");
    const upstream = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Basic ${auth}` }, signal: AbortSignal.timeout(15_000)
    });
    const providerPayment = await upstream.json();
    if (!upstream.ok || providerPayment.order_id !== orderId || providerPayment.amount !== payment.amount || providerPayment.currency !== "INR") {
      return sendJson(response, 400, { error: "The payment details did not match this booking." });
    }
    if (providerPayment.status !== "captured") return sendJson(response, 409, { error: "Payment is not captured yet. Please check again shortly." });
  } catch (error) {
    console.error("Razorpay payment status check failed:", error.name || "Error");
    return sendJson(response, 502, { error: "Payment signature received, but capture could not be confirmed yet. Please check again shortly." });
  }
  await updateStore(store => {
    const stored = store.payments.find(item => item.orderId === orderId);
    if (stored) { stored.status = "paid"; stored.paymentId = paymentId; stored.paidAt = new Date().toISOString(); }
    const booking = store.inquiries.find(item => item.id === reference && item.type === "booking");
    if (booking) booking.paymentStatus = "paid";
  });
  return sendJson(response, 200, { verified: true, reference });
}

async function handleBookingStatus(request, response, reference) {
  if (request.method !== "GET") return sendJson(response, 405, { error: "Use GET to read a booking status." });
  const store = await readStore();
  const booking = store.inquiries.find(item => item.type === "booking" && item.id === reference);
  if (!booking) return sendJson(response, 404, { error: "Booking request not found." });
  return sendJson(response, 200, { reference: booking.id, status: booking.status, paymentStatus: booking.paymentStatus || "unpaid", trip: booking.tripName || booking.trip });
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  if (url.pathname.startsWith("/auth/")) return handleOAuthRequest(request, response, url);
  if (url.pathname === "/api/chat") return handleChat(request, response);
  if (url.pathname === "/api/bookings") return handleInquiry(request, response, "booking");
  if (url.pathname === "/api/inquiries/planner") return handleInquiry(request, response, "planner");
  if (url.pathname === "/api/inquiries/contact") return handleInquiry(request, response, "contact");
  if (url.pathname === "/api/payments/create-order") return handleCreatePaymentOrder(request, response);
  if (url.pathname === "/api/payments/config") return handlePaymentConfig(request, response, url);
  if (url.pathname === "/api/payments/verify") return handleVerifyPayment(request, response);
  if (url.pathname.startsWith("/api/bookings/")) return handleBookingStatus(request, response, decodeURIComponent(url.pathname.slice("/api/bookings/".length)));
  if (url.pathname === "/api/auth/providers" && request.method === "GET") {
    return sendJson(response, 200, { providers: { google: oauthProviderReady("google"), apple: oauthProviderReady("apple") } });
  }
  if (url.pathname === "/api/account/requests") return handleAccountRequests(request, response);
  if (url.pathname.startsWith("/api/auth/")) return handleAuth(request, response, url.pathname.slice("/api/auth/".length));
  if (!["GET", "HEAD"].includes(request.method || "")) return sendJson(response, 405, { error: "Method not allowed." });

  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const segments = pathname.split("/").filter(Boolean);
  if (segments.some(segment => segment.startsWith(".")) || ["data", "node_modules", "secrets"].includes(segments[0]) || /\.(?:p8|pem|key)$/i.test(pathname)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" }).end("Forbidden");
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
const host = process.env.HOST || "0.0.0.0";
async function initializeDataStore() {
  if (!firestore) {
    if (process.env.NODE_ENV === "production") throw new Error("FIREBASE_PROJECT_ID must identify the Firebase project in production.");
    return;
  }
  if (!dataStoreInitialization) dataStoreInitialization = (async () => {
    const markerRef = firestore.collection("appMetadata").doc("storeInitialized");
    const marker = await markerRef.get();
    if (!marker.exists) {
      let initialStore = { users: [], sessions: [], passwordResets: [], bookings: [], inquiries: [], payments: [] };
      try {
        initialStore = JSON.parse(await readFile(dataFile, "utf8"));
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      for (const [key, collection] of Object.entries(storeCollections)) {
        const keyField = storeKeyFields[key];
        const items = initialStore[key] || [];
        for (let offset = 0; offset < items.length; offset += 400) {
          const batch = firestore.batch();
          for (const item of items.slice(offset, offset + 400)) {
            batch.set(firestore.collection(collection).doc(String(item[keyField])), item);
          }
          if (items.length) await batch.commit();
        }
      }
      await markerRef.create({ createdAt: FieldValue.serverTimestamp() }).catch(async error => {
        if (error.code !== 6 && error.code !== "already-exists") throw error;
      });
      console.log("Initialized Firestore app data, importing any local data/site-data.json records.");
    }
  })();
  return dataStoreInitialization;
}

async function startServer() {
  await initializeDataStore();
  server.listen(port, host, () => console.log(`TREKKING site listening on ${host}:${port}`));
}

export { server, initializeDataStore };

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  startServer().catch(error => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  });
}
