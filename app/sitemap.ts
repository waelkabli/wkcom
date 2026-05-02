import type { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://waelkabli.com';
  const locales: ('ar' | 'en')[] = ['ar', 'en'];
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: { ar: `${base}/ar`, en: `${base}/en` } },
    },
    {
      url: `${base}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { ar: `${base}/ar/blog`, en: `${base}/en/blog` } },
    },
  ]);

  // Blog post pages
  const postPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({
      url: `${base}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          ar: `${base}/ar/blog/${slug}`,
          en: `${base}/en/blog/${slug}`,
        },
      },
    }))
  );

  return [...staticPages, ...postPages];
}
