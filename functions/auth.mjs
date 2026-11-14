import { verifyRecaptcha } from "./recaptcha.mjs";

const encoder = new TextEncoder();
const SESSION_SECONDS = 7 * 24 * 60 * 60;
// Cloudflare Workers Web Crypto caps PBKDF2 at 100,000 iterations.
const PASSWORD_ITERATIONS = 100_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200, headers = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function cleanText(value, limit = 500) {
  return typeof value === "string"
    ? value.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, limit)
    : "";
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(base64), character => character.charCodeAt(0));
}

function randomToken(size = 32) {
  return bytesToBase64Url(crypto.getRandomValues(new Uint8Array(size)));
}

async function sha256(value) {
  return bytesToBase64Url(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}

async function derivePassword(password, salt) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: PASSWORD_ITERATIONS }, key, 256);
  return new Uint8Array(bits);
}

function equalBytes(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
  return difference === 0;
}

function userPayload(row) {
  const avatarUrl = row.profile_image_updated_at
    ? `/api/auth/profile-image?v=${encodeURIComponent(row.profile_image_updated_at)}`
    : row.avatar_url || null;
  return { id: row.id, name: row.name, email: row.email, avatarUrl, emailVerified: Boolean(row.email_verified) };
}

function cookieToken(request) {
  for (const part of (request.headers.get("Cookie") || "").split(";")) {
    const index = part.indexOf("=");
    if (index < 0 || part.slice(0, index).trim() !== "trekking_session") continue;
    return decodeURIComponent(part.slice(index + 1).trim());
  }
  return "";
}

function sessionCookie(token, maxAge = SESSION_SECONDS) {
  return `trekking_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}

async function parseJson(request) {
  const raw = await request.text();
  if (encoder.encode(raw).byteLength > 16_000) throw new Error("request_too_large");
  return JSON.parse(raw);
}

async function rateLimited(request, env, action) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = await sha256(`${action}:${ip}`);
  const now = Date.now();
  const row = await env.DB.prepare(`
    INSERT INTO auth_rate_limits (rate_key, window_started_at, attempts)
    VALUES (?, ?, 1)
    ON CONFLICT(rate_key) DO UPDATE SET
      attempts = CASE WHEN window_started_at <= ? THEN 1 ELSE attempts + 1 END,
      window_started_at = CASE WHEN window_started_at <= ? THEN ? ELSE window_started_at END
    RETURNING attempts
  `).bind(key, now, now - 60_000, now - 60_000, now).first();
  return (row?.attempts || 1) > 8;
}

export async function readCurrentUser(request, env) {
  const token = cookieToken(request);
  if (!token) return null;
  const tokenHash = await sha256(token);
  const row = await env.DB.prepare(`
    SELECT u.id, u.name, u.email, u.avatar_url, u.email_verified, i.updated_at AS profile_image_updated_at
    FROM auth_sessions s JOIN auth_users u ON u.id = s.user_id
    LEFT JOIN auth_profile_images i ON i.user_id = u.id
    WHERE s.token_hash = ? AND s.expires_at > ?
  `).bind(tokenHash, Date.now()).first();
  return row ? userPayload(row) : null;
}

function matchesImageSignature(bytes, mimeType) {
  if (mimeType === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mimeType === "image/png") return bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  if (mimeType === "image/webp") return bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

async function profileImage(request, env) {
  const user = await readCurrentUser(request, env);
  if (!user) return json({ error: "Sign in to manage your profile photo." }, 401);
  if (request.method === "GET") {
    const row = await env.DB.prepare("SELECT mime_type, data, updated_at FROM auth_profile_images WHERE user_id = ?")
      .bind(user.id).first();
    if (!row) return new Response("Profile photo not found", { status: 404, headers: { "Cache-Control": "no-store" } });
    const bytes = row.data instanceof ArrayBuffer
      ? new Uint8Array(row.data)
      : ArrayBuffer.isView(row.data)
        ? new Uint8Array(row.data.buffer, row.data.byteOffset, row.data.byteLength)
        : Uint8Array.from(row.data || []);
    return new Response(bytes, {
      headers: {
        "Content-Type": row.mime_type,
        "Cache-Control": "private, max-age=3600",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
  if (request.method === "DELETE") {
    await env.DB.prepare("DELETE FROM auth_profile_images WHERE user_id = ?").bind(user.id).run();
    return json({ user: await readCurrentUser(request, env) });
  }
  if (request.method !== "POST") return json({ error: "Use POST to upload a profile photo." }, 405);
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 1_100_000) return json({ error: "Choose an image smaller than 1 MB." }, 413);
  let form;
  try { form = await request.formData(); } catch { return json({ error: "The image upload could not be read." }, 400); }
  const file = form.get("file");
  if (!(file instanceof File)) return json({ error: "Choose a photo to upload." }, 400);
  if (file.size < 1 || file.size > 1_048_576) return json({ error: "Choose an image smaller than 1 MB." }, 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!matchesImageSignature(bytes, file.type)) return json({ error: "Upload a valid JPG, PNG, or WebP image." }, 415);
  const updatedAt = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO auth_profile_images (user_id, mime_type, data, updated_at)
    VALUES (?, ?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET
      mime_type = excluded.mime_type, data = excluded.data, updated_at = excluded.updated_at`)
    .bind(user.id, file.type, bytes, updatedAt).run();
  return json({ user: await readCurrentUser(request, env) });
}

async function createSession(request, env, user) {
  const token = randomToken();
  const now = Date.now();
  await env.DB.prepare("DELETE FROM auth_sessions WHERE expires_at <= ?").bind(now).run();
  await env.DB.prepare(
    "INSERT INTO auth_sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).bind(await sha256(token), user.id, now + SESSION_SECONDS * 1000, new Date(now).toISOString()).run();
  return json({ user: userPayload(user) }, 200, { "Set-Cookie": sessionCookie(token) });
}

async function register(request, env) {
  let body;
  try { body = await parseJson(request); } catch { return json({ error: "The account details could not be read." }, 400); }
  const email = cleanText(body.email, 254).toLowerCase();
  const name = cleanText(body.name, 120);
  const password = typeof body.password === "string" ? body.password : "";
  if (!EMAIL_RE.test(email) || password.length < 12 || password.length > 128) {
    return json({ error: "Use a valid email and a password between 12 and 128 characters." }, 400);
  }
  if (name.length < 2) return json({ error: "Enter your name." }, 400);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePassword(password, salt);
  const user = {
    id: crypto.randomUUID(), name, email,
    password_salt: bytesToBase64Url(salt), password_hash: bytesToBase64Url(hash),
    avatar_url: null
  };
  try {
    await env.DB.prepare(`INSERT INTO auth_users
      (id, email, name, password_salt, password_hash, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(user.id, email, name, user.password_salt, user.password_hash, new Date().toISOString()).run();
  } catch {
    const existing = await env.DB.prepare("SELECT id FROM auth_users WHERE email = ?").bind(email).first();
    if (existing) return json({ error: "An account with that email already exists. Sign in instead." }, 409);
    throw new Error("account_storage_failed");
  }
  const response = await createSession(request, env, user);
  return json({ user: userPayload(user) }, 201, { "Set-Cookie": response.headers.get("Set-Cookie") });
}

async function login(request, env) {
  let body;
  try { body = await parseJson(request); } catch { return json({ error: "The account details could not be read." }, 400); }
  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  if (!EMAIL_RE.test(email) || password.length < 1 || password.length > 128) {
    return json({ error: "Email or password is incorrect." }, 401);
  }
  const row = await env.DB.prepare("SELECT * FROM auth_users WHERE email = ?").bind(email).first();
  const salt = row?.password_salt ? base64UrlToBytes(row.password_salt) : new Uint8Array(16);
  const candidate = await derivePassword(password, salt);
  const expected = row?.password_hash ? base64UrlToBytes(row.password_hash) : new Uint8Array(32);
  if (!row?.password_hash || !equalBytes(candidate, expected)) return json({ error: "Email or password is incorrect." }, 401);
  return createSession(request, env, row);
}

function oauthReady(provider, env) {
  return provider === "google"
    ? Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)
    : Boolean(env.APPLE_CLIENT_ID && env.APPLE_TEAM_ID && env.APPLE_KEY_ID && env.APPLE_PRIVATE_KEY);
}

async function beginOAuth(provider, request, env) {
  if (!oauthReady(provider, env)) return json({ error: `${provider} sign-in credentials are not configured in Cloudflare Worker secrets.` }, 503);
  const state = randomToken(24);
  const nonce = randomToken(24);
  await env.DB.prepare("DELETE FROM auth_oauth_states WHERE expires_at <= ?").bind(Date.now()).run();
  await env.DB.prepare("INSERT INTO auth_oauth_states (state, provider, nonce, expires_at) VALUES (?, ?, ?, ?)")
    .bind(state, provider, nonce, Date.now() + 10 * 60_000).run();
  const google = provider === "google";
  const callback = `${new URL(request.url).origin}/auth/${provider}/callback`;
  const params = new URLSearchParams({
    client_id: google ? env.GOOGLE_CLIENT_ID : env.APPLE_CLIENT_ID,
    redirect_uri: callback,
    response_type: "code",
    response_mode: google ? "query" : "form_post",
    scope: google ? "openid email profile" : "email name",
    state,
    nonce
  });
  const endpoint = google ? "https://accounts.google.com/o/oauth2/v2/auth" : "https://appleid.apple.com/auth/authorize";
  return Response.redirect(`${endpoint}?${params}`, 302);
}

function oauthError(message, status = 400) {
  const escaped = message.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return new Response(`<!doctype html><meta charset="utf-8"><title>Sign-in unavailable</title><main style="font:16px system-ui;max-width:560px;margin:12vh auto;padding:24px"><h1>Sign-in could not be completed</h1><p>${escaped}</p><a href="/">Return to TREKKING</a></main>`, {
    status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
  });
}

async function appleClientSecret(env) {
  const now = Math.floor(Date.now() / 1000);
  const head = bytesToBase64Url(encoder.encode(JSON.stringify({ alg: "ES256", kid: env.APPLE_KEY_ID }))) ;
  const body = bytesToBase64Url(encoder.encode(JSON.stringify({ iss: env.APPLE_TEAM_ID, iat: now, exp: now + 300, aud: "https://appleid.apple.com", sub: env.APPLE_CLIENT_ID })));
  const pem = env.APPLE_PRIVATE_KEY.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const pkcs8 = Uint8Array.from(atob(pem), character => character.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", pkcs8, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, encoder.encode(`${head}.${body}`));
  return `${head}.${body}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

async function exchangeOAuthCode(provider, code, request, env) {
  const callback = `${new URL(request.url).origin}/auth/${provider}/callback`;
  const clientSecret = provider === "google" ? env.GOOGLE_CLIENT_SECRET : await appleClientSecret(env);
  const form = new URLSearchParams({
    grant_type: "authorization_code", code, redirect_uri: callback,
    client_id: provider === "google" ? env.GOOGLE_CLIENT_ID : env.APPLE_CLIENT_ID,
    client_secret: clientSecret
  });
  const endpoint = provider === "google" ? "https://oauth2.googleapis.com/token" : "https://appleid.apple.com/auth/token";
  const result = await fetch(endpoint, {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form
  });
  const payload = await result.json();
  if (!result.ok || !payload.id_token) throw new Error("oauth_token_exchange_failed");
  return payload.id_token;
}

async function verifiedClaims(provider, idToken) {
  const [headerPart, payloadPart, signaturePart] = idToken.split(".");
  if (!headerPart || !payloadPart || !signaturePart) throw new Error("invalid_id_token");
  const header = JSON.parse(new TextDecoder().decode(base64UrlToBytes(headerPart)));
  const claims = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payloadPart)));
  if (provider === "google") {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    if (!response.ok) throw new Error("google_token_invalid");
    return response.json();
  }
  const keyResponse = await fetch("https://appleid.apple.com/auth/keys");
  if (!keyResponse.ok) throw new Error("apple_keys_unavailable");
  const keySet = await keyResponse.json();
  const jwk = keySet.keys?.find(candidate => candidate.kid === header.kid && candidate.alg === header.alg);
  if (!jwk || header.alg !== "RS256") throw new Error("apple_key_missing");
  const publicKey = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, base64UrlToBytes(signaturePart), encoder.encode(`${headerPart}.${payloadPart}`));
  if (!valid) throw new Error("apple_signature_invalid");
  return claims;
}

async function oauthCallback(provider, request, env) {
  let params;
  if (request.method === "GET") params = new URL(request.url).searchParams;
  else {
    const form = await request.formData();
    params = new URLSearchParams([...form.entries()].map(([key, value]) => [key, String(value)]));
  }
  const state = params.get("state") || "";
  const flow = await env.DB.prepare(`DELETE FROM auth_oauth_states
    WHERE state = ? AND provider = ? AND expires_at > ? RETURNING nonce`)
    .bind(state, provider, Date.now()).first();
  if (!flow || params.has("error")) return oauthError("The sign-in session expired or was cancelled. Please try again.");
  const code = params.get("code");
  if (!code || !oauthReady(provider, env)) return oauthError("The provider response was incomplete.");
  try {
    const identityToken = await exchangeOAuthCode(provider, code, request, env);
    const claims = await verifiedClaims(provider, identityToken);
    const expectedAudience = provider === "google" ? env.GOOGLE_CLIENT_ID : env.APPLE_CLIENT_ID;
    const expectedIssuer = provider === "google" ? ["accounts.google.com", "https://accounts.google.com"] : ["https://appleid.apple.com"];
    const expectedNonce = flow.nonce;
    const verified = claims.email_verified === true || claims.email_verified === "true";
    if (claims.aud !== expectedAudience || !expectedIssuer.includes(claims.iss) || Number(claims.exp) * 1000 <= Date.now() || claims.nonce !== expectedNonce || !verified || !EMAIL_RE.test(claims.email || "")) {
      return oauthError("The identity response could not be verified.", 401);
    }
    const email = claims.email.toLowerCase();
    let appleName = "";
    if (provider === "apple" && params.has("user")) {
      try {
        const appleUser = JSON.parse(params.get("user"));
        appleName = [appleUser?.name?.firstName, appleUser?.name?.lastName].filter(Boolean).join(" ");
      } catch { /* Apple only includes the profile object on first authorization. */ }
    }
    const subColumn = provider === "google" ? "google_sub" : "apple_sub";
    let user = await env.DB.prepare(`SELECT * FROM auth_users WHERE ${subColumn} = ?`).bind(claims.sub).first();
    if (!user) user = await env.DB.prepare("SELECT * FROM auth_users WHERE email = ?").bind(email).first();
    if (!user) {
      const id = crypto.randomUUID();
      const name = cleanText(provider === "apple" ? appleName : claims.name, 120) || email.split("@")[0];
      await env.DB.prepare("INSERT INTO auth_users (id, email, name, email_verified, created_at) VALUES (?, ?, ?, 1, ?)")
        .bind(id, email, name, new Date().toISOString()).run();
      user = await env.DB.prepare("SELECT * FROM auth_users WHERE id = ?").bind(id).first();
    }
    if (user[subColumn] && user[subColumn] !== claims.sub) return oauthError("That email is already linked to a different social account.", 409);
    const avatar = provider === "google" && /^https:\/\/(?:[^/]+\.)?googleusercontent\.com\//.test(claims.picture || "") ? claims.picture : user.avatar_url;
    await env.DB.prepare(`UPDATE auth_users SET ${subColumn} = ?, avatar_url = ?, email_verified = 1 WHERE id = ?`)
      .bind(claims.sub, avatar || null, user.id).run();
    user = await env.DB.prepare("SELECT * FROM auth_users WHERE id = ?").bind(user.id).first();
    const session = await createSession(request, env, user);
    return new Response(null, { status: 303, headers: { Location: "/", "Set-Cookie": session.headers.get("Set-Cookie"), "Cache-Control": "no-store" } });
  } catch (error) {
    console.error(`${provider} sign-in failed`, error);
    return oauthError("The identity provider could not complete sign-in. Please try email and password.", 502);
  }
}

async function forgotPassword(request, env) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return json({ error: "Password reset email is not configured yet. Please contact the site administrator." }, 503);
  let body;
  try { body = await parseJson(request); } catch { return json({ error: "The email address could not be read." }, 400); }
  const email = cleanText(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return json({ error: "Enter a valid email address." }, 400);
  const user = await env.DB.prepare("SELECT id FROM auth_users WHERE email = ?").bind(email).first();
  if (user) {
    const token = randomToken();
    const tokenHash = await sha256(token);
    const expiresAt = Date.now() + 30 * 60_000;
    await env.DB.prepare("DELETE FROM auth_password_resets WHERE user_id = ?").bind(user.id).run();
    await env.DB.prepare("INSERT INTO auth_password_resets (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
      .bind(tokenHash, user.id, expiresAt, new Date().toISOString()).run();
    const resetUrl = `${new URL(request.url).origin}/reset-password.html#token=${encodeURIComponent(token)}`;
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.EMAIL_FROM, to: [email], subject: "Reset your TREKKING password", text: `Choose a new password within 30 minutes: ${resetUrl}` })
    });
    if (!sent.ok) {
      await env.DB.prepare("DELETE FROM auth_password_resets WHERE token_hash = ?").bind(tokenHash).run();
      console.error("Password reset email delivery failed", sent.status);
    }
  }
  return json({ message: "If an account exists for that email, a password reset link has been sent." });
}

async function resetPassword(request, env) {
  let body;
  try { body = await parseJson(request); } catch { return json({ error: "The reset details could not be read." }, 400); }
  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!token || password.length < 12 || password.length > 128) return json({ error: "Use a reset link and a password between 12 and 128 characters." }, 400);
  const tokenHash = await sha256(token);
  const reset = await env.DB.prepare("SELECT user_id FROM auth_password_resets WHERE token_hash = ? AND expires_at > ?")
    .bind(tokenHash, Date.now()).first();
  if (!reset) return json({ error: "This reset link is invalid or expired. Request a new one." }, 400);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePassword(password, salt);
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare(`UPDATE auth_users SET password_salt = ?, password_hash = ? WHERE id = ? AND EXISTS
      (SELECT 1 FROM auth_password_resets WHERE token_hash = ? AND expires_at > ?)`)
      .bind(bytesToBase64Url(salt), bytesToBase64Url(hash), reset.user_id, tokenHash, now),
    env.DB.prepare("DELETE FROM auth_password_resets WHERE user_id = ?").bind(reset.user_id),
    env.DB.prepare("DELETE FROM auth_sessions WHERE user_id = ?").bind(reset.user_id)
  ]);
  return json({ message: "Your password has been updated. Sign in with your new password." });
}

export async function handleAuthRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const oauthStart = /^\/auth\/(google|apple)$/.exec(path);
  const oauthCallbackMatch = /^\/auth\/(google|apple)\/callback$/.exec(path);
  if (oauthStart && request.method === "GET") return beginOAuth(oauthStart[1], request, env);
  if (oauthCallbackMatch && ["GET", "POST"].includes(request.method)) return oauthCallback(oauthCallbackMatch[1], request, env);
  if (path === "/api/auth/providers" && request.method === "GET") {
    return json({ providers: { google: oauthReady("google", env), apple: oauthReady("apple", env) } });
  }
  if (!path.startsWith("/api/auth/")) return null;
  if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
  const action = path.slice("/api/auth/".length);
  try {
    if (action === "profile-image") return await profileImage(request, env);
    if (action === "me" && request.method === "GET") return json({ user: await readCurrentUser(request, env) });
    if (action === "logout" && request.method === "POST") {
      const token = cookieToken(request);
      if (token) await env.DB.prepare("DELETE FROM auth_sessions WHERE token_hash = ?").bind(await sha256(token)).run();
      return json({ user: null }, 200, { "Set-Cookie": sessionCookie("", 0) });
    }
    if (!["register", "login", "forgot-password", "reset-password"].includes(action) || request.method !== "POST") {
      return json({ error: "Unsupported account action." }, 405);
    }
    let captchaBody;
    try { captchaBody = await request.clone().json(); } catch { return json({ error: "The account request could not be read." }, 400); }
    const captcha = await verifyRecaptcha(captchaBody.recaptchaToken, env.RECAPTCHA_SECRET_KEY, request);
    if (!captcha.ok) return json({ error: captcha.error }, 400);
    if (await rateLimited(request, env, action)) return json({ error: "Too many sign-in attempts. Please wait one minute." }, 429);
    if (action === "register") return await register(request, env);
    if (action === "login") return await login(request, env);
    if (action === "forgot-password") return await forgotPassword(request, env);
    return await resetPassword(request, env);
  } catch (error) {
    console.error("Cloudflare auth request failed", error);
    return json({ error: "Account access is temporarily unavailable. Please try again." }, 500);
  }
}
