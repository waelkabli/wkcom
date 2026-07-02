import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type MediaType = 'podcast' | 'video' | 'tv' | 'press' | 'social';

export interface MediaItem {
  slug: string;
  mediaType: MediaType;
  title: string;
  excerpt?: string;
  date: string;
  platform: string;
  mediaUrl: string;
  thumbnail?: string;
  featured: boolean;
  lang: 'ar' | 'en';
  tags?: string[];
}

const MEDIA_DIR = path.join(process.cwd(), 'content', 'media');

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function getMediaSlugs(locale: 'ar' | 'en'): string[] {
  const dir = path.join(MEDIA_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.(mdx|md)$/, ''));
}

export function getMediaBySlug(slug: string, locale: 'ar' | 'en'): MediaItem | null {
  const dir = path.join(MEDIA_DIR, locale);
  const filePath =
    fs.existsSync(path.join(dir, `${slug}.mdx`))
      ? path.join(dir, `${slug}.mdx`)
      : path.join(dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);

  const mediaUrl: string = data.mediaUrl || '';
  let thumbnail: string | undefined = data.thumbnail;
  if (!thumbnail && (data.mediaType === 'video')) {
    const ytId = extractYouTubeId(mediaUrl);
    if (ytId) thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
  }

  return {
    slug,
    mediaType: (data.mediaType as MediaType) || 'video',
    title: data.title || slug,
    excerpt: data.excerpt,
    date: data.date || new Date().toISOString().slice(0, 10),
    platform: data.platform || '',
    mediaUrl,
    thumbnail,
    featured: data.featured === true,
    lang: locale,
    tags: data.tags || [],
  };
}

export function getAllMedia(locale: 'ar' | 'en'): MediaItem[] {
  const slugs = getMediaSlugs(locale);
  return slugs
    .map((slug) => getMediaBySlug(slug, locale))
    .filter((item): item is MediaItem => item !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedMedia(locale: 'ar' | 'en', count = 3): MediaItem[] {
  return getAllMedia(locale)
    .filter((item) => item.featured)
    .slice(0, count);
}

export function getMediaByType(locale: 'ar' | 'en', mediaType: MediaType): MediaItem[] {
  return getAllMedia(locale).filter((item) => item.mediaType === mediaType);
}
