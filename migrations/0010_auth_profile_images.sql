CREATE TABLE IF NOT EXISTS auth_profile_images (
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  mime_type TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  data BLOB NOT NULL CHECK (length(data) <= 1048576),
  updated_at TEXT NOT NULL
);
