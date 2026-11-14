CREATE TABLE IF NOT EXISTS site_pages (
  page_key TEXT PRIMARY KEY,
  content_html TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_site_pages_updated_at ON site_pages(updated_at DESC);
