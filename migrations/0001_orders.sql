CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_version TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  mp_payment_id TEXT,
  external_reference TEXT,
  created_at TEXT NOT NULL,
  paid_at TEXT,
  delivery_status TEXT NOT NULL DEFAULT 'pending',
  delivered_at TEXT,
  delivery_error TEXT,
  download_token_hash TEXT,
  delivery_expires_at TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_mp_payment_id ON orders(mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
