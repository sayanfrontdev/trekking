import { readCurrentUser } from "./auth.mjs";

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
  if (pathname === "/api/payments/config" && request.method === "GET") {
    return json({ enabled: false, amountInr: null, currency: "INR" });
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
    const result = await env.DB.prepare("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 500").all();
    return json({ inquiries: (result.results || []).map(publicInquiry) });
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
