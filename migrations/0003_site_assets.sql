CREATE TABLE IF NOT EXISTS site_assets (
  asset_key TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  data BLOB NOT NULL,
  size_bytes INTEGER NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (asset_key, chunk_index)
);
