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
-- Comments table (custom system, replaces Waline)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug       TEXT        NOT NULL,
  nick       TEXT,
  content    TEXT        NOT NULL,
  approved   BOOLEAN     DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comments_slug_approved_idx ON comments(slug, approved);

-- To approve a comment: flip approved = true in Supabase Table Editor

-- ──────────────────────────────────────────────
-- Reaction event log (for daily digest emails)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reaction_logs (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug       TEXT        NOT NULL,
  emoji      TEXT        NOT NULL,
  action     TEXT        NOT NULL,  -- 'add' or 'remove'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reaction_logs_created_at_idx ON reaction_logs(created_at);

-- ──────────────────────────────────────────────
-- Page view counts
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
  slug       TEXT        PRIMARY KEY,
  count      INTEGER     NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ⚠️  IMPORTANT: Run the block above first (it creates the tables).
-- Supabase injects RLS statements after CREATE TABLE which break dollar-quoted
-- functions if they're in the same query. Paste only the block below into a
-- NEW query and run it separately.

-- ── Run this as a SEPARATE query ───────────────
CREATE OR REPLACE FUNCTION increment_page_view(p_slug TEXT)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO page_views (slug, count)
  VALUES (p_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET count = page_views.count + 1, updated_at = now()
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;
