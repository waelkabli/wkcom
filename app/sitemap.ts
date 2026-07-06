import type { MetadataRoute } from 'next';
import { getPostSlugs, getPostBySlug } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://waelkabli.com';
  const locales: ('ar' | 'en')[] = ['ar', 'en'];
  const siteUpdated = '2025-01-01';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: { ar: `${base}/ar`, en: `${base}/en`, 'x-default': `${base}/en` } },
    },
    {
      url: `${base}/${locale}/blog`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { ar: `${base}/ar/blog`, en: `${base}/en/blog`, 'x-default': `${base}/en/blog` } },
    },
    {
      url: `${base}/${locale}/media`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { ar: `${base}/ar/media`, en: `${base}/en/media`, 'x-default': `${base}/en/media` } },
    },
  ]);

  // Blog post pages — use actual post date as lastModified
  const postPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => {
      const post = getPostBySlug(slug, locale);
      return {
        url: `${base}/${locale}/blog/${slug}`,
        lastModified: post?.date ?? siteUpdated,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            ar: `${base}/ar/blog/${slug}`,
            en: `${base}/en/blog/${slug}`,
            'x-default': `${base}/en/blog/${slug}`,
          },
        },
      };
    })
  );

  return [...staticPages, ...postPages];
}
