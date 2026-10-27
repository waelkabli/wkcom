#!/usr/bin/env node
/**
 * Validates MDX frontmatter for all posts in content/posts/ar/ and content/posts/en/.
 * Enforces required fields, character limits, and date format.
 * Exits 1 on hard errors; exits 0 with warnings for soft issues.
 */
import { readdirSync, readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const TITLE_MAX = 70;
const SEO_TITLE_MAX = 55;
const EXCERPT_MIN = 80;
const EXCERPT_MAX = 165;

let errors = 0;
let warnings = 0;

function err(label, msg) {
  console.error(`  ❌ ${label}: ${msg}`);
  errors++;
}

function warn(label, msg) {
  console.warn(`  ⚠️  ${label}: ${msg}`);
  warnings++;
}

function checkPost(slug, locale, fm) {
  const label = `${locale}/${slug}`;

  if (!fm.type) { err(label, 'missing field: type'); return; }
  if (!fm.date) { err(label, 'missing field: date'); }
  if (!Array.isArray(fm.tags) || fm.tags.length === 0) {
    err(label, 'missing or empty field: tags');
  }

  if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(fm.date))) {
    err(label, `date must be YYYY-MM-DD, got: ${fm.date}`);
  }

  if (fm.type === 'article') {
    if (!fm.title) { err(label, 'missing field: title'); }
    if (!fm.excerpt) { err(label, 'missing field: excerpt'); }
    if (!fm.format) {
      warn(label, 'missing field: format (text|cover-image|video|photo-essay|mixed)');
    }

    if (fm.title) {
      if (fm.title.length > TITLE_MAX && !fm.seoTitle) {
        warn(label, `title is ${fm.title.length} chars (>${TITLE_MAX}). Add seoTitle ≤${SEO_TITLE_MAX} chars.`);
      }
      if (fm.seoTitle && fm.seoTitle.length > SEO_TITLE_MAX) {
        err(label, `seoTitle is ${fm.seoTitle.length} chars — must be ≤${SEO_TITLE_MAX}.`);
      }
    }

    if (fm.excerpt) {
      const len = fm.excerpt.length;
      if (len < EXCERPT_MIN || len > EXCERPT_MAX) {
        warn(label, `excerpt is ${len} chars — target ${EXCERPT_MIN}–${EXCERPT_MAX} chars.`);
      }
    }
  }
}

for (const locale of ['ar', 'en']) {
  const dir = resolve(root, 'content/posts', locale);
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  } catch {
    err(`content/posts/${locale}`, 'directory not found');
    continue;
  }

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const raw = readFileSync(join(dir, file), 'utf8');
    const { data: fm } = matter(raw);
    checkPost(slug, locale, fm);
  }
}

if (errors > 0) {
  console.error(`\n❌ Frontmatter: ${errors} error(s), ${warnings} warning(s). Fix errors before committing.\n`);
  process.exit(1);
}

if (warnings > 0) {
  console.warn(`\n⚠️  Frontmatter: 0 errors, ${warnings} warning(s). Consider fixing before merging.\n`);
} else {
  console.log('✅ Frontmatter: all posts valid.');
}
