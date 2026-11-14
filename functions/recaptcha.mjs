const RECAPTCHA_SITE_KEY = "6Lc2YiAuAAAAAPuWTAV2cNIWnLJoKAiFP2heoayo";
const RECAPTCHA_PROJECT_ID = "trekking-fc5d3";

export async function verifyRecaptcha(token, apiKey, request) {
  if (!apiKey) return { ok: false, error: "reCAPTCHA backend verification is not configured. Add the Google API key in Cloudflare." };
  if (typeof token !== "string" || !token) return { ok: false, error: "Please complete the I'm not a robot check." };
  try {
    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${encodeURIComponent(apiKey)}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: {
        token,
        siteKey: RECAPTCHA_SITE_KEY,
        userAgent: request.headers.get("User-Agent") || "",
        userIpAddress: request.headers.get("CF-Connecting-IP") || ""
      } }),
      signal: AbortSignal.timeout(5000)
    });
    const assessment = await response.json();
    const properties = assessment.tokenProperties;
    const expectedHost = new URL(request.url).hostname.toLowerCase();
    const tokenHost = typeof properties?.hostname === "string" ? properties.hostname.toLowerCase() : "";
    if (!response.ok || properties?.valid !== true) {
      console.error("reCAPTCHA assessment rejected", response.status, properties?.invalidReason || "invalid_token");
      return { ok: false, error: "Google could not verify this reCAPTCHA response. Please check it again and retry." };
    }
    if (tokenHost !== expectedHost) {
      console.error("reCAPTCHA hostname mismatch", tokenHost || "missing_hostname", expectedHost);
      return { ok: false, error: "This reCAPTCHA is registered for a different website hostname." };
    }
    return { ok: true };
  } catch (error) {
    console.error("reCAPTCHA assessment request failed", error.name || "Error");
    return { ok: false, error: "Google reCAPTCHA verification is temporarily unavailable. Please retry." };
  }
}
