CREATE TABLE IF NOT EXISTS community_travel_photos (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  caption TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  data BLOB NOT NULL CHECK (length(data) <= 1048576),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT NOT NULL,
  reviewed_at TEXT,
  reviewed_by TEXT
);

CREATE INDEX IF NOT EXISTS community_travel_photos_status_created
  ON community_travel_photos(status, created_at DESC);
CREATE INDEX IF NOT EXISTS community_travel_photos_user_created
  ON community_travel_photos(user_id, created_at DESC);
