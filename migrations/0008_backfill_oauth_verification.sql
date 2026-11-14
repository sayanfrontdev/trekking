UPDATE auth_users
SET email_verified = 1
WHERE google_sub IS NOT NULL OR apple_sub IS NOT NULL;
