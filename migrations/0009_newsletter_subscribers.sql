CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  reference TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at
  ON newsletter_subscribers(created_at DESC);
