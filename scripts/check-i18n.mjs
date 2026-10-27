#!/usr/bin/env node
/**
 * Checks that messages/en.json and messages/ar.json have identical key sets.
 * Exits 1 if any keys are missing from either file.
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return typeof v === 'object' && v !== null && !Array.isArray(v)
      ? flattenKeys(v, key)
      : [key];
  });
}

const en = JSON.parse(readFileSync(resolve(root, 'messages/en.json'), 'utf8'));
const ar = JSON.parse(readFileSync(resolve(root, 'messages/ar.json'), 'utf8'));

const enKeys = new Set(flattenKeys(en));
const arKeys = new Set(flattenKeys(ar));

const missingFromAr = [...enKeys].filter((k) => !arKeys.has(k));
const missingFromEn = [...arKeys].filter((k) => !enKeys.has(k));

let hasErrors = false;

if (missingFromAr.length) {
  console.error(`\n❌ i18n: ${missingFromAr.length} key(s) in en.json missing from ar.json:`);
  missingFromAr.forEach((k) => console.error(`   ${k}`));
  hasErrors = true;
}

if (missingFromEn.length) {
  console.error(`\n❌ i18n: ${missingFromEn.length} key(s) in ar.json missing from en.json:`);
  missingFromEn.forEach((k) => console.error(`   ${k}`));
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n💡 Add the missing keys to the appropriate messages file before committing.\n');
  process.exit(1);
}

console.log(`✅ i18n: ${enKeys.size} keys in sync (AR ↔ EN).`);
