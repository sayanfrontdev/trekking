CREATE TABLE IF NOT EXISTS auth_users (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  password_salt TEXT,
  password_hash TEXT,
  google_sub TEXT UNIQUE,
  apple_sub TEXT UNIQUE,
  avatar_url TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_sessions_expiry ON auth_sessions(expires_at);

CREATE TABLE IF NOT EXISTS auth_oauth_states (
  state TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  nonce TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_oauth_states_expiry ON auth_oauth_states(expires_at);

CREATE TABLE IF NOT EXISTS auth_password_resets (
  token_hash TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_rate_limits (
  rate_key TEXT PRIMARY KEY NOT NULL,
  window_started_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL
);
