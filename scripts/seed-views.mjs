/**
 * Seeds the page_views Supabase table with historical data from a GA4 CSV export.
 *
 * Usage:
 *   node scripts/seed-views.mjs /path/to/ga4-export.csv
 *
 * How to get the CSV:
 *   GA4 → Reports → Engagement → Pages and screens
 *   Set date range to "All time", then Download → CSV
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local not found — rely on environment
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local');
  process.exit(1);
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Usage: node scripts/seed-views.mjs <path-to-ga4-export.csv>');
  process.exit(1);
}

const csv = readFileSync(resolve(csvPath), 'utf8');
const lines = csv.split('\n').map(l => l.trim()).filter(Boolean);

// GA4 CSV has a few header/footer rows — find the actual data header
// The data header row contains "Page path" or "Page path and screen class"
let headerIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].toLowerCase().includes('page path')) {
    headerIdx = i;
    break;
  }
}

if (headerIdx === -1) {
  console.error('Could not find "Page path" header row in CSV. Make sure you exported Pages and screens report.');
  process.exit(1);
}

const headers = lines[headerIdx].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
const pathCol = headers.findIndex(h => h.includes('page path'));
// GA4 uses "Views" or "Pageviews" — find whichever is present
const viewsCol = headers.findIndex(h => h === 'views' || h === 'pageviews' || h === 'screen page views');

if (pathCol === -1 || viewsCol === -1) {
  console.error(`Could not find required columns. Found: ${headers.join(', ')}`);
  process.exit(1);
}

// Aggregate views by slug across both locales
const slugViews = new Map();

for (let i = headerIdx + 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line || line.startsWith('#')) continue;

  // Simple CSV parse (handles quoted fields)
  const cols = [];
  let cur = '';
  let inQuote = false;
  for (const ch of line) {
    if (ch === '"') { inQuote = !inQuote; continue; }
    if (ch === ',' && !inQuote) { cols.push(cur); cur = ''; continue; }
    cur += ch;
  }
  cols.push(cur);

  const pagePath = cols[pathCol]?.trim();
  const rawViews = cols[viewsCol]?.trim().replace(/,/g, '');
  const views = parseInt(rawViews, 10);

  if (!pagePath || isNaN(views) || views <= 0) continue;

  // Match /en/blog/slug or /ar/blog/slug
  const match = pagePath.match(/^\/(?:en|ar)\/blog\/([^/?#]+)/);
  if (!match) continue;

  const slug = match[1];
  slugViews.set(slug, (slugViews.get(slug) ?? 0) + views);
}

if (slugViews.size === 0) {
  console.log('No blog post paths found in the CSV. Nothing to seed.');
  process.exit(0);
}

console.log(`Found ${slugViews.size} article slugs. Preview:`);
for (const [slug, count] of [...slugViews.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
  console.log(`  ${slug}: ${count.toLocaleString()} views`);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const rows = Array.from(slugViews.entries()).map(([slug, count]) => ({ slug, count }));

const { error } = await supabase
  .from('page_views')
  .upsert(rows, { onConflict: 'slug' });

if (error) {
  console.error('Supabase upsert failed:', error.message);
  process.exit(1);
}

const total = rows.reduce((s, r) => s + r.count, 0);
console.log(`\nSeeded ${rows.length} slugs (${total.toLocaleString()} total views) into page_views.`);
