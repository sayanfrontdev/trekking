CREATE TABLE IF NOT EXISTS inquiries (
  reference TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'planner', 'contact')),
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'accepted', 'rejected')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid',
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  trip TEXT NOT NULL DEFAULT '',
  trip_name TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  guests TEXT NOT NULL DEFAULT '',
  place TEXT NOT NULL DEFAULT '',
  style TEXT NOT NULL DEFAULT '',
  dates TEXT NOT NULL DEFAULT '',
  people TEXT NOT NULL DEFAULT '',
  interest TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  reviewed_at TEXT,
  reviewed_by TEXT
);
CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_email_type ON inquiries(email, type);
