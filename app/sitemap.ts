import type { MetadataRoute } from 'next';
import { getPostSlugs, getPostBySlug } from '@/lib/blog';
import { getAllServiceSlugs } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://waelkabli.com';
  const locales: ('ar' | 'en')[] = ['ar', 'en'];
  const siteUpdated = '2026-10-27';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: { ar: `${base}/ar`, en: `${base}/en`, 'x-default': `${base}/ar` } },
    },
    {
      url: `${base}/${locale}/blog`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { ar: `${base}/ar/blog`, en: `${base}/en/blog`, 'x-default': `${base}/ar/blog` } },
    },
    {
      url: `${base}/${locale}/media`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { ar: `${base}/ar/media`, en: `${base}/en/media`, 'x-default': `${base}/ar/media` } },
    },
    {
      url: `${base}/${locale}/about`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { ar: `${base}/ar/about`, en: `${base}/en/about`, 'x-default': `${base}/ar/about` } },
    },
  ]);

  // Service pages
  const servicePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllServiceSlugs().map((slug) => ({
      url: `${base}/${locale}/services/${slug}`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${base}/ar/services/${slug}`,
          en: `${base}/en/services/${slug}`,
          'x-default': `${base}/ar/services/${slug}`,
        },
      },
    }))
  );

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
            'x-default': `${base}/ar/blog/${slug}`,
          },
        },
      };
    })
  );

  return [...staticPages, ...servicePages, ...postPages];
}
