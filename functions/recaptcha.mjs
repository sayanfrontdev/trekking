export async function verifyRecaptcha(token, secret, request) {
  if (!secret) return { ok: false, error: "reCAPTCHA verification is not configured on the server." };
  if (typeof token !== "string" || !token) return { ok: false, error: "Please complete the I'm not a robot check." };
  const params = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) params.set("remoteip", ip);
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params,
      signal: AbortSignal.timeout(5000)
    });
    const result = await response.json();
    return response.ok && result.success === true
      ? { ok: true }
      : { ok: false, error: "The reCAPTCHA check failed. Please try again." };
  } catch { return { ok: false, error: "reCAPTCHA could not be verified. Please try again." }; }
}
