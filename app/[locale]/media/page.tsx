import { getAllMedia, extractYouTubeId } from '@/lib/media';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MediaGrid from '@/components/MediaGrid';
import MediaKit from '@/components/MediaKit';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { MediaItem } from '@/lib/media';

type Props = { params: Promise<{ locale: string }> };

function buildMediaSchema(items: MediaItem[]) {
  const graph: object[] = [];

  for (const item of items) {
    const ytId = extractYouTubeId(item.mediaUrl);

    if (item.mediaType === 'video' || item.mediaType === 'tv') {
      const thumbnailUrl =
        item.thumbnail ||
        (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : undefined);

      const entry: Record<string, unknown> = {
        '@type': 'VideoObject',
        name: item.title,
        description: item.excerpt,
        thumbnailUrl,
        uploadDate: item.date,
        url: item.mediaUrl,
      };
      if (ytId) entry.embedUrl = `https://www.youtube.com/embed/${ytId}`;

      graph.push(entry);
    } else if (item.mediaType === 'podcast') {
      graph.push({
        '@type': 'PodcastEpisode',
        name: item.title,
        description: item.excerpt,
        datePublished: item.date,
        url: item.mediaUrl,
        image: item.thumbnail,
        partOfSeries: {
          '@type': 'PodcastSeries',
          name: item.platform,
        },
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export async function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const canonicalUrl = `https://waelkabli.com/${locale}/media`;

  return {
    title: isAr ? 'الإعلام والصحافة' : 'Media & Press',
    description: isAr
      ? 'مقابلات وبودكاست وظهورات تلفزيونية وتغطيات صحفية لوائل كابلي.'
      : 'Interviews, podcasts, TV appearances, and press coverage featuring Wael Kabli.',
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: '/ar/media', en: '/en/media' },
    },
    openGraph: {
      title: isAr ? 'الإعلام والصحافة — وائل كابلي' : 'Media & Press — Wael Kabli',
      description: isAr
        ? 'مقابلات وبودكاست وظهورات تلفزيونية وتغطيات صحفية لوائل كابلي.'
        : 'Interviews, podcasts, TV appearances, and press coverage featuring Wael Kabli.',
      url: canonicalUrl,
      siteName: isAr ? 'وائل كابلي' : 'Wael Kabli',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [{ url: '/images/wael-profile.jpg', width: 800, height: 800 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'الإعلام والصحافة — وائل كابلي' : 'Media & Press — Wael Kabli',
      images: ['/images/wael-profile.jpg'],
    },
  };
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('mediaPage');
  const items = getAllMedia(locale as 'ar' | 'en');
  const isAr = locale === 'ar';

  const schema = buildMediaSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navigation />
      <main className="min-h-screen bg-[#f8f7ff] pt-20">
        {/* Header */}
        <div className="bg-[#2d185c] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#ff6585] text-sm font-semibold mb-4">
              {t('sectionLabel')}
            </div>
            <h1 className={`text-4xl sm:text-5xl font-black text-white mb-3 ${isAr ? '' : 'font-heading'}`}>
              {t('title')}
            </h1>
            <p className="text-white/60 text-lg">{t('subtitle')}</p>
          </div>
        </div>

        {/* Media grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <MediaGrid items={items} isAr={isAr} />
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4">
          <hr className="border-[#e8e4f5]" />
        </div>

        {/* Media Kit */}
        <MediaKit isAr={isAr} />
      </main>
      <Footer />
    </>
  );
}
