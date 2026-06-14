import path from 'path';
import fs from 'fs';

export interface VisitorEntry {
  id?: number;
  timestamp: string;
  ip: string;
  userAgent: string;
  country: string;
  page: string;
  referrer: string;
  locale: string;
}

const DATA_FILE =
  process.env.NODE_ENV === 'production'
    ? '/tmp/visitors.json'
    : path.join(process.cwd(), 'data', 'visitors.json');

function readData(): VisitorEntry[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeData(entries: VisitorEntry[]): void {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
  } catch {
    // Silently fail — visitor log is non-critical
  }
}

export function logVisitor(data: Omit<VisitorEntry, 'id' | 'timestamp'>): void {
  const entries = readData();
  entries.push({ ...data, timestamp: new Date().toISOString() });
  // Keep last 5000 entries
  if (entries.length > 5000) entries.splice(0, entries.length - 5000);
  writeData(entries);
}

export function getVisitors(limit = 200): VisitorEntry[] {
  return readData().slice(-limit).reverse();
}

export interface VisitorStats {
  total: number;
  today: number;
  byLocale: { locale: string; count: number }[];
  byPage: { page: string; count: number }[];
  byCountry: { country: string; count: number }[];
}

export function getVisitorStats(): VisitorStats {
  const entries = readData();
  const today = new Date().toISOString().slice(0, 10);

  const byLocale: Record<string, number> = {};
  const byPage: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  let todayCount = 0;

  for (const e of entries) {
    if (e.timestamp.startsWith(today)) todayCount++;
    byLocale[e.locale] = (byLocale[e.locale] || 0) + 1;
    byPage[e.page] = (byPage[e.page] || 0) + 1;
    byCountry[e.country] = (byCountry[e.country] || 0) + 1;
  }

  return {
    total: entries.length,
    today: todayCount,
    byLocale: Object.entries(byLocale).map(([locale, count]) => ({ locale, count })),
    byPage: Object.entries(byPage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count })),
    byCountry: Object.entries(byCountry)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, count })),
  };
}
