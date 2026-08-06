import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Package {
  name: { ar: string; en: string };
  price: { ar: string; en: string };
  period: { ar: string; en: string };
  description: { ar: string; en: string };
  includes: Array<{ ar: string; en: string }>;
  featured?: boolean;
}

export interface ServiceData {
  slug: string;
  icon: string;
  title: { ar: string; en: string };
  tagline: { ar: string; en: string };
  heroDesc: { ar: string; en: string };
  stats: Array<{ value: string; label: { ar: string; en: string } }>;
  valueProps: Array<{
    icon: string;
    title: { ar: string; en: string };
    desc: { ar: string; en: string };
  }>;
  whoFor: Array<{ ar: string; en: string }>;
  outcomes: Array<{ ar: string; en: string }>;
  process: Array<{
    step: number;
    title: { ar: string; en: string };
    desc: { ar: string; en: string };
  }>;
  packages: Package[];
  faq: Array<{
    q: { ar: string; en: string };
    a: { ar: string; en: string };
  }>;
}

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');

const SERVICE_ORDER = [
  'executive-consultant',
  'board-advisor',
  'startup-mentor',
  'executive-coach',
  'keynote-speaker',
];

function loadServices(): ServiceData[] {
  const files = fs.readdirSync(SERVICES_DIR).filter((f) => f.endsWith('.md'));

  const services = files.map((file) => {
    const raw = fs.readFileSync(path.join(SERVICES_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return data as ServiceData;
  });

  return services.sort((a, b) => {
    const ai = SERVICE_ORDER.indexOf(a.slug);
    const bi = SERVICE_ORDER.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export const SERVICES: ServiceData[] = loadServices();

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
