# Cloudflare authentication setup

Email/password accounts and sessions are stored in D1 by the Cloudflare Worker. Apply database schema changes with `npm run migrate:d1:seed` (this applies pending D1 migrations) and deploy with `npm run build` followed by `npx wrangler deploy`.

Booking, trip-planner, and contact submissions are stored in the D1 `inquiries` table and shown in the admin page. Admin access is restricted to the verified Google account `sayanmandal72011902@gmail.com`.

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

Resend sends password-reset email and acceptance/rejection messages for every submitted form. Configure `RESEND_API_KEY` and `EMAIL_FROM` as Worker secrets. Without these, booking and trip-planner users still receive the in-site notification while signed in, but email delivery is unavailable; contact form users require email delivery to receive the decision.

## Existing Firebase accounts

The D1 auth tables start empty. Existing Firebase user rows and password hashes were not available to migrate from this workspace. Do not delete the Firebase project or its user data. Existing password accounts need a proper export/import path or a password reset; Google users can sign in and link to a D1 account when the verified email matches.
