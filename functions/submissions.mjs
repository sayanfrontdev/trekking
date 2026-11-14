import { readCurrentUser } from "./auth.mjs";
import { verifyRecaptcha } from "./recaptcha.mjs";

export const ADMIN_EMAIL = "sayanmandal72011902@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const tripNames = {
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

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clean(value, limit = 500) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, limit) : "";
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}

async function broadcastSubmissionUpdate(env) {
  try {
    const id = env.SUBMISSION_HUB.idFromName("admin-submissions");
    await env.SUBMISSION_HUB.get(id).fetch("https://submission-hub/broadcast", { method: "POST" });
  } catch (error) {
    console.error("Admin live update broadcast failed", error.name || "Error");
  }
}

async function readBody(request) {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > 16_000) throw new Error("request_too_large");
  return JSON.parse(raw);
}

async function currentAdmin(request, env) {
  const user = await readCurrentUser(request, env);
  if (!user) return { response: json({ error: "Sign in with the administrator account to continue." }, 401) };
  if (user.email.toLowerCase() !== ADMIN_EMAIL || !user.emailVerified) {
    return { response: json({ error: `Admin access is restricted to the verified ${ADMIN_EMAIL} account.` }, 403) };
  }
  return { user };
}

async function submitInquiry(request, env, type) {
  if (request.method !== "POST") return json({ error: "Use POST to submit this form." }, 405);
  if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
  let body;
  try { body = await readBody(request); } catch { return json({ error: "The form could not be read." }, 400); }
  const captcha = await verifyRecaptcha(body.recaptchaToken, env.RECAPTCHA_API_KEY, request);
  if (!captcha.ok) return json({ error: captcha.error }, 400);
  const user = type === "booking" ? await readCurrentUser(request, env) : null;
  if (type === "booking" && !user) return json({ error: "Sign in before submitting a booking request." }, 401);
  const name = type === "booking" ? user.name : clean(body.name, 120);
  const email = type === "booking" ? user.email : clean(body.email, 254).toLowerCase();
  if (name.length < 2 || !EMAIL_RE.test(email)) return json({ error: "Enter a valid name and email address." }, 400);
  const record = {
    reference: `${type.toUpperCase()}-${crypto.randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`,
    type,
    userId: user?.id || null,
    name,
    email,
    phone: clean(body.phone, 40),
    message: clean(body.message, 2_000),
    trip: "",
    tripName: "",
    date: "",
    guests: "",
    place: "",
    style: "",
    dates: "",
    people: "",
    interest: "",
    createdAt: new Date().toISOString()
  };
  if (type === "booking") {
    record.trip = clean(body.trip, 160);
    record.tripName = tripNames[record.trip] || "";
    record.date = clean(body.date, 40);
    record.guests = clean(body.guests, 40);
    if (!record.tripName) return json({ error: "Choose a valid journey before submitting." }, 400);
  } else if (type === "planner") {
    record.place = clean(body.place, 100);
    record.style = clean(body.style, 100);
    record.dates = clean(body.dates, 100);
    record.people = clean(body.people, 40);
    if (!record.place || !record.style) return json({ error: "Choose a destination and travel style." }, 400);
  } else {
    record.interest = clean(body.interest, 120);
    if (record.message.length < 5) return json({ error: "Add a short message before submitting." }, 400);
  }
  await env.DB.prepare(`INSERT INTO inquiries
    (reference, type, user_id, name, email, phone, message, trip, trip_name, date, guests,
     place, style, dates, people, interest, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(record.reference, type, record.userId, record.name, record.email, record.phone, record.message,
      record.trip, record.tripName, record.date, record.guests, record.place, record.style, record.dates,
      record.people, record.interest, record.createdAt).run();
  await broadcastSubmissionUpdate(env);
  return json({ reference: record.reference, status: "received", message: "Your request was saved. It is not a confirmed booking." }, 201);
}

async function subscribeNewsletter(request, env) {
  if (request.method !== "POST") return json({ error: "Use POST to sign up for the newsletter." }, 405);
  if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
  let body;
  try { body = await readBody(request); } catch { return json({ error: "The signup could not be read." }, 400); }
  const captcha = await verifyRecaptcha(body.recaptchaToken, env.RECAPTCHA_API_KEY, request);
  if (!captcha.ok) return json({ error: captcha.error }, 400);
  const email = clean(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return json({ error: "Enter a valid email address." }, 400);
  const reference = `NEWS-${crypto.randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`;
  const createdAt = new Date().toISOString();
  const insert = await env.DB.prepare(`INSERT INTO newsletter_subscribers (reference, email, created_at)
    VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING`).bind(reference, email, createdAt).run();
  if (!insert.meta?.changes) return json({ status: "subscribed", alreadySubscribed: true });
  await broadcastSubmissionUpdate(env);
  return json({ status: "subscribed", alreadySubscribed: false }, 201);
}

function validImageSignature(bytes, mimeType) {
  if (mimeType === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mimeType === "image/png") return bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  if (mimeType === "image/webp") return bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

function bytesFromBlob(value) {
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  return Uint8Array.from(value || []);
}

async function travelPhotoImage(request, env, id) {
  if (request.method !== "GET") return json({ error: "Use GET to view this photo." }, 405);
  const user = await readCurrentUser(request, env);
  if (!user) return json({ error: "Sign in to view community travel photos." }, 401);
  const row = await env.DB.prepare(`SELECT p.user_id, p.mime_type, p.data, p.status
    FROM community_travel_photos p WHERE p.id = ?`).bind(id).first();
  if (!row) return new Response("Photo not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  const isAdmin = user.email.toLowerCase() === ADMIN_EMAIL && user.emailVerified;
  if (row.status !== "approved" && row.user_id !== user.id && !isAdmin) {
    return new Response("Photo not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  }
  const chunkResult = await env.DB.prepare("SELECT data FROM community_travel_photo_chunks WHERE photo_id = ? ORDER BY chunk_index")
    .bind(id).all();
  const chunks = (chunkResult.results || []).map(chunk => bytesFromBlob(chunk.data));
  const imageChunks = chunks.length ? chunks : [bytesFromBlob(row.data)];
  const imageBytes = new Uint8Array(imageChunks.reduce((total, chunk) => total + chunk.byteLength, 0));
  let imageOffset = 0;
  for (const chunk of imageChunks) { imageBytes.set(chunk, imageOffset); imageOffset += chunk.byteLength; }
  return new Response(imageBytes, { headers: {
    "Content-Type": row.mime_type,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Content-Disposition": "inline"
  } });
}

async function userTravelPhotos(request, env) {
  const user = await readCurrentUser(request, env);
  if (!user) return json({ error: "Sign in to view or share travel photos." }, 401);
  if (request.method === "GET") {
    const result = await env.DB.prepare(`SELECT p.id, p.user_id, p.caption, p.location, p.status, p.created_at, u.name AS uploader_name
      FROM community_travel_photos p JOIN auth_users u ON u.id = p.user_id
      WHERE p.status = 'approved' OR p.user_id = ?
      ORDER BY CASE WHEN p.status = 'approved' THEN 0 ELSE 1 END, p.created_at DESC LIMIT 250`)
      .bind(user.id).all();
    return json({ photos: (result.results || []).map(row => ({
      id: row.id,
      owner: row.user_id === user.id,
      caption: row.caption,
      location: row.location,
      status: row.status,
      createdAt: row.created_at,
      uploaderName: row.uploader_name,
      imageUrl: `/api/travel-photos/${encodeURIComponent(row.id)}/image`
    })) });
  }
  if (request.method === "DELETE") {
    if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
    const id = decodeURIComponent(new URL(request.url).pathname.split("/").at(-1));
    const result = await env.DB.prepare("DELETE FROM community_travel_photos WHERE id = ? AND user_id = ?")
      .bind(id, user.id).run();
    if (!result.meta?.changes) return json({ error: "You can delete only your own photo." }, 404);
    await broadcastSubmissionUpdate(env);
    return json({ deleted: true, id });
  }
  if (request.method !== "POST") return json({ error: "Use POST to upload a photo." }, 405);
  if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
  const maxPhotoBytes = 5 * 1024 * 1024;
  if (Number(request.headers.get("Content-Length") || 0) > maxPhotoBytes + 250_000) return json({ error: "Choose an image no larger than 5 MB." }, 413);
  let form;
  try { form = await request.formData(); } catch { return json({ error: "The photo upload could not be read." }, 400); }
  const file = form.get("file");
  if (!(file instanceof File) || file.size < 1 || file.size > maxPhotoBytes) return json({ error: "Choose an image no larger than 5 MB." }, 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!validImageSignature(bytes, file.type)) return json({ error: "Upload a valid JPG, PNG, or WebP image." }, 415);
  const existing = await env.DB.prepare("SELECT COUNT(*) AS total FROM community_travel_photos WHERE user_id = ? AND status != 'rejected'")
    .bind(user.id).first();
  if (Number(existing?.total || 0) >= 20) return json({ error: "You can keep up to 20 submitted or approved photos. Delete one before uploading another." }, 429);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const insertPhoto = env.DB.prepare(`INSERT INTO community_travel_photos
    (id, user_id, caption, location, mime_type, data, status, created_at)
    VALUES (?, ?, ?, ?, ?, X'', 'pending', ?)`)
    .bind(id, user.id, clean(form.get("caption"), 180), clean(form.get("location"), 120), file.type, createdAt);
  const chunkStatements = [];
  const chunkSize = 900_000;
  for (let offset = 0, chunkIndex = 0; offset < bytes.length; offset += chunkSize, chunkIndex++) {
    chunkStatements.push(env.DB.prepare(`INSERT INTO community_travel_photo_chunks (photo_id, chunk_index, data) VALUES (?, ?, ?)`)
      .bind(id, chunkIndex, bytes.slice(offset, Math.min(offset + chunkSize, bytes.length))));
  }
  await env.DB.batch([insertPhoto, ...chunkStatements]);
  await broadcastSubmissionUpdate(env);
  return json({ id, status: "pending", message: "Photo submitted for review. Only you can see it until an admin approves it." }, 201);
}

async function adminTravelPhotos(request, env) {
  if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
  const admin = await currentAdmin(request, env);
  if (admin.response) return admin.response;
  if (request.method === "GET") {
    const result = await env.DB.prepare(`SELECT p.id, p.caption, p.location, p.created_at, u.name AS uploader_name, u.email AS uploader_email
      FROM community_travel_photos p JOIN auth_users u ON u.id = p.user_id
      WHERE p.status = 'pending' ORDER BY p.created_at ASC LIMIT 100`).all();
    return json({ photos: (result.results || []).map(row => ({ ...row, imageUrl: `/api/travel-photos/${encodeURIComponent(row.id)}/image` })) });
  }
  const match = /^\/api\/admin\/travel-photos\/([^/]+)$/.exec(new URL(request.url).pathname);
  if (!match || request.method !== "PATCH") return json({ error: "Unsupported photo review action." }, 405);
  let body;
  try { body = await readBody(request); } catch { return json({ error: "The review action could not be read." }, 400); }
  if (!["approved", "rejected"].includes(body?.status)) return json({ error: "Choose approve or reject." }, 400);
  const id = decodeURIComponent(match[1]);
  const reviewedAt = new Date().toISOString();
  const result = await env.DB.prepare(`UPDATE community_travel_photos SET status = ?, reviewed_at = ?, reviewed_by = ?
    WHERE id = ? AND status = 'pending'`).bind(body.status, reviewedAt, admin.user.email, id).run();
  if (!result.meta?.changes) return json({ error: "This photo is no longer waiting for review." }, 404);
  await broadcastSubmissionUpdate(env);
  return json({ id, status: body.status, reviewedAt });
}

function publicInquiry(row) {
  return {
    reference: row.reference,
    type: row.type,
    status: row.status,
    paymentStatus: row.payment_status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    trip: row.trip,
    tripName: row.trip_name,
    date: row.date,
    guests: row.guests,
    place: row.place,
    style: row.style,
    dates: row.dates,
    people: row.people,
    interest: row.interest,
    createdAt: row.created_at,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by
  };
}

async function sendDecisionEmail(env, inquiry, status) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return { sent: false, reason: "email_not_configured" };
  const subject = `Update to your TREKKING ${inquiry.type} request`;
  const requestLabel = inquiry.trip_name || inquiry.place || inquiry.interest || `${inquiry.type} request`;
  const decisionText = status === "accepted" ? "accepted" : "declined";
  const confirmation = inquiry.type === "booking" && status === "accepted"
    ? "This is an update to your request, not final trip confirmation. The team will contact you to confirm availability and itinerary details."
    : "If you have questions, please reply to this email or contact the TREKKING team.";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [inquiry.email],
        subject,
        text: `Hello ${inquiry.name},\n\nThe TREKKING team has ${decisionText} your ${requestLabel}.\nReference: ${inquiry.reference}\n\n${confirmation}\n\nTREKKING`
      }),
      signal: AbortSignal.timeout(12_000)
    });
    if (!response.ok) {
      console.error("Decision email delivery failed", response.status);
      return { sent: false, reason: "email_delivery_failed" };
    }
    return { sent: true, reason: "sent" };
  } catch (error) {
    console.error("Decision email request failed", error.name || "Error");
    return { sent: false, reason: "email_delivery_failed" };
  }
}

export async function handleSubmissionRequest(request, env) {
  const url = new URL(request.url);
  const { pathname } = url;
  if (pathname === "/api/travel-photos") {
    try { return await userTravelPhotos(request, env); }
    catch (error) {
      console.error("D1 community photo request failed", error.name || "Error");
      return json({ error: "Community photos are temporarily unavailable. Please try again." }, 500);
    }
  }
  const travelPhotoImageMatch = /^\/api\/travel-photos\/([^/]+)\/image$/.exec(pathname);
  if (travelPhotoImageMatch) {
    try { return await travelPhotoImage(request, env, decodeURIComponent(travelPhotoImageMatch[1])); }
    catch (error) {
      console.error("D1 community photo image failed", error.name || "Error");
      return new Response("Photo unavailable", { status: 500, headers: { "Cache-Control": "no-store" } });
    }
  }
  if (pathname.startsWith("/api/admin/travel-photos")) {
    try { return await adminTravelPhotos(request, env); }
    catch (error) {
      console.error("D1 community photo review failed", error.name || "Error");
      return json({ error: "Photo review is temporarily unavailable. Please try again." }, 500);
    }
  }
  const travelPhotoMatch = /^\/api\/travel-photos\/([^/]+)$/.exec(pathname);
  if (travelPhotoMatch && request.method === "DELETE") {
    try { return await userTravelPhotos(request, env); }
    catch (error) {
      console.error("D1 community photo delete failed", error.name || "Error");
      return json({ error: "The photo could not be deleted. Please try again." }, 500);
    }
  }
  if (pathname === "/api/payments/config" && request.method === "GET") {
    return json({ enabled: false, amountInr: null, currency: "INR" });
  }
  if (pathname === "/api/newsletter") {
    try { return await subscribeNewsletter(request, env); }
    catch (error) {
      console.error("D1 newsletter signup failed", error);
      return json({ error: "We couldn't save your signup. Please try again." }, 500);
    }
  }
  const bookingStatusMatch = /^\/api\/bookings\/([^/]+)$/.exec(pathname);
  if (bookingStatusMatch && request.method === "GET") {
    const reference = decodeURIComponent(bookingStatusMatch[1]);
    const booking = await env.DB.prepare("SELECT reference, status, payment_status, trip_name, trip FROM inquiries WHERE reference = ? AND type = 'booking'")
      .bind(reference).first();
    if (!booking) return json({ error: "Booking request not found." }, 404);
    return json({ reference: booking.reference, status: booking.status, paymentStatus: booking.payment_status, trip: booking.trip_name || booking.trip });
  }
  if (["/api/bookings", "/api/inquiries/planner", "/api/inquiries/contact"].includes(pathname)) {
    const type = pathname === "/api/bookings" ? "booking" : pathname.endsWith("planner") ? "planner" : "contact";
    try { return await submitInquiry(request, env, type); }
    catch (error) {
      console.error("D1 form submission failed", error);
      return json({ error: "We couldn’t save your request. Please try again." }, 500);
    }
  }
  if (pathname === "/api/account/requests" && request.method === "GET") {
    const user = await readCurrentUser(request, env);
    if (!user) return json({ error: "Sign in to view your trip requests." }, 401);
    const result = await env.DB.prepare(`SELECT * FROM inquiries
      WHERE (user_id = ? OR email = ?) AND type IN ('booking', 'planner')
      ORDER BY created_at DESC LIMIT 20`).bind(user.id, user.email).all();
    const requests = (result.results || []).map(row => ({
      reference: row.reference,
      type: row.type,
      status: row.status,
      paymentStatus: row.payment_status,
      trip: row.trip_name || row.trip || row.place || "Trip planning request",
      date: row.date || row.dates,
      notification: ["accepted", "rejected"].includes(row.status)
        ? `The trip team ${row.status} your ${row.type === "booking" ? "booking request" : "trip plan"}.`
        : "",
      reviewedAt: row.reviewed_at
    }));
    return json({ requests });
  }
  if (pathname === "/api/admin/inquiries" && request.method === "GET") {
    if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
    const admin = await currentAdmin(request, env);
    if (admin.response) return admin.response;
    const [result, subscriberResult] = await Promise.all([
      env.DB.prepare("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 500").all(),
      env.DB.prepare("SELECT reference, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 500").all()
    ]);
    const inquiries = (result.results || []).map(publicInquiry);
    const subscribers = (subscriberResult.results || []).map(row => ({
      reference: row.reference,
      type: "newsletter",
      status: "subscribed",
      name: "",
      email: row.email,
      createdAt: row.created_at
    }));
    return json({ inquiries: [...inquiries, ...subscribers] });
  }
  const actionMatch = /^\/api\/admin\/inquiries\/([^/]+)$/.exec(pathname);
  if (actionMatch) {
    if (request.method !== "PATCH") return json({ error: "Use PATCH to update a submitted form." }, 405);
    if (!sameOrigin(request)) return json({ error: "This request could not be verified." }, 403);
    const admin = await currentAdmin(request, env);
    if (admin.response) return admin.response;
    let body;
    try { body = await readBody(request); } catch { return json({ error: "The review action could not be read." }, 400); }
    const status = body?.status;
    if (!["accepted", "rejected"].includes(status)) return json({ error: "Choose accept or reject for this submission." }, 400);
    const reference = decodeURIComponent(actionMatch[1]);
    const reviewedAt = new Date().toISOString();
    await env.DB.prepare("UPDATE inquiries SET status = ?, reviewed_at = ?, reviewed_by = ? WHERE reference = ?")
      .bind(status, reviewedAt, admin.user.email, reference).run();
    await broadcastSubmissionUpdate(env);
    const inquiry = await env.DB.prepare("SELECT reference, type, status, name, email, trip_name, place, interest FROM inquiries WHERE reference = ?")
      .bind(reference).first();
    if (!inquiry) return json({ error: "Submitted form not found." }, 404);
    const delivery = await sendDecisionEmail(env, inquiry, status);
    const notificationMessage = delivery.sent
      ? `Decision saved. Email notification sent to ${inquiry.email}.`
      : delivery.reason === "email_not_configured"
        ? "Decision saved. In-site notification is available; configure Resend to email the submitter."
        : "Decision saved, but the email could not be delivered. The in-site notification is available; check the Resend configuration.";
    return json({ reference, status, reviewedAt, emailSent: delivery.sent, notificationMessage });
  }
  return null;
}
