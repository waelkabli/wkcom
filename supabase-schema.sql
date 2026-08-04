-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- ──────────────────────────────────────────────
-- Emoji Reactions table
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reactions (
  slug  TEXT    NOT NULL,
  emoji TEXT    NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, emoji)
);

-- Atomic increment/decrement function (prevents race conditions)
CREATE OR REPLACE FUNCTION increment_reaction(p_slug TEXT, p_emoji TEXT, p_delta INTEGER)
RETURNS void AS $$
BEGIN
  INSERT INTO reactions (slug, emoji, count)
  VALUES (p_slug, p_emoji, GREATEST(0, p_delta))
  ON CONFLICT (slug, emoji)
  DO UPDATE SET count = GREATEST(0, reactions.count + p_delta);
END;
$$ LANGUAGE plpgsql;

-- Allow server-side API access (service role bypasses RLS, no policy needed)
-- If you want to use anon key instead, run:
-- ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "anyone can read"   ON reactions FOR SELECT USING (true);
-- CREATE POLICY "anyone can insert" ON reactions FOR INSERT WITH CHECK (true);
-- CREATE POLICY "anyone can update" ON reactions FOR UPDATE USING (true);

-- ──────────────────────────────────────────────
-- Waline comment tables
-- Waline creates these automatically on first run — no manual setup needed.
-- Just connect Waline to this Supabase project via DATABASE_URL (see README).
-- ──────────────────────────────────────────────
