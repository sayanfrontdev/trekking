CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY NOT NULL,
  content_json TEXT NOT NULL CHECK (json_valid(content_json)),
  updated_at TEXT NOT NULL
);
