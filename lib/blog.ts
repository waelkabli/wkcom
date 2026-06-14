import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostType = 'article' | 'micro';

export interface Post {
  slug: string;
  type: PostType;
  title?: string;
  excerpt?: string;
  content: string;
  date: string;
  tags?: string[];
  coverImage?: string;
  readingTime?: number;
  lang: 'ar' | 'en';
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

function estimateReadingTime(content: string): number {
  return Math.max(1, Math.ceil(countWords(content) / 200));
}

export function getPostSlugs(locale: 'ar' | 'en'): string[] {
  const dir = path.join(POSTS_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.(mdx|md)$/, ''));
}

export function getPostBySlug(slug: string, locale: 'ar' | 'en'): Post | null {
  const dir = path.join(POSTS_DIR, locale);
  const filePath =
    fs.existsSync(path.join(dir, `${slug}.mdx`))
      ? path.join(dir, `${slug}.mdx`)
      : path.join(dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    type: (data.type as PostType) || 'article',
    title: data.title,
    excerpt: data.excerpt,
    content,
    date: data.date || new Date().toISOString().slice(0, 10),
    tags: data.tags || [],
    coverImage: data.coverImage,
    readingTime: estimateReadingTime(content),
    lang: locale,
  };
}

export function getAllPosts(locale: 'ar' | 'en'): Post[] {
  const slugs = getPostSlugs(locale);
  return slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(locale: 'ar' | 'en', count = 3): Post[] {
  return getAllPosts(locale).slice(0, count);
}
