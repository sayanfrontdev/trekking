# Cloudflare authentication setup

Email/password accounts and sessions are stored in D1 by the Cloudflare Worker. Apply database schema changes with `npm run migrate:d1:seed` (this applies pending D1 migrations) and deploy with `npm run build` followed by `npx wrangler deploy`.

Booking, trip-planner, and contact submissions are stored in the D1 `inquiries` table and shown in the admin page. Admin access is restricted to the verified Google account `sayanmandal72011902@gmail.com`.

## reCAPTCHA checkbox

The public forms use the Google Cloud reCAPTCHA checkbox integration. The site loads `enterprise.js`; the Worker creates an assessment for each token. Add every production hostname used by the site to the key's allowed domains (for example `trekking.trekking-india.workers.dev`). In Google Cloud project `trekking-fc5d3`, enable the reCAPTCHA Enterprise API and create an API key restricted to that API. Add that API key to the `trekking` Worker as secret `RECAPTCHA_API_KEY` (do not use the legacy reCAPTCHA secret for this integration), then deploy:

```powershell
npx wrangler secret put RECAPTCHA_API_KEY --config wrangler.toml
npm run build
npx wrangler deploy --config wrangler.toml
```

The checkbox is required for account login, signup, password reset, trip planning, booking, contact, newsletter, and AI chat submissions. The Cloudflare Worker sends each single-use token to Google's CreateAssessment endpoint and accepts it only when Google reports it valid and its hostname matches the request hostname. Utility forms such as search and cookie preferences do not submit to the server and are not challenged.

## Google sign-in

Google remains the identity provider; the Worker exchanges and verifies Google sign-in, while D1 stores the resulting account and session. Add this exact redirect URI to the Google OAuth web client:

`https://trekking.trekking-india.workers.dev/auth/google/callback`

Then add the client values as Worker secrets. Wrangler prompts for each value; do not commit secrets to the repository:

```powershell
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
```

## Apple sign-in

Configure the Apple Services ID return URL as:

`https://trekking.trekking-india.workers.dev/auth/apple/callback`

Add `APPLE_CLIENT_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, and the complete `.p8` private key as `APPLE_PRIVATE_KEY` with `npx wrangler secret put` for each name.

## Password reset email

Resend sends password-reset email and acceptance/rejection messages for every submitted form. Configure `RESEND_API_KEY` and `EMAIL_FROM` as Worker secrets. Without these, bookirng and trip-planner users still receive the in-site notification while signed in, but email delivery is unavailable; contact form users require email delivery to receive the decision.

## Existing Firebase accounts

The D1 auth tables start empty. Existing Firebase user rows and password hashes were not available to migrate from this workspace. Do not delete the Firebase project or its user data. Existing password accounts need a proper export/import path or a password reset; Google users can sign in and link to a D1 account when the verified email matches.
