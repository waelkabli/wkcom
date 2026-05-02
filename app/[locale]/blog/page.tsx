import { getAllPosts } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const canonicalUrl = `https://waelkabli.com/${locale}/blog`;

  return {
    title: isAr ? 'المدونة' : 'Blog',
    description: isAr
      ? 'مقالات وأفكار من وائل كابلي عن ريادة الأعمال، الصحة الرقمية، القيادة، والابتكار.'
      : 'Articles and insights from Wael Kabli on entrepreneurship, digital health, leadership, and innovation.',
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: '/ar/blog', en: '/en/blog' },
    },
    openGraph: {
      title: isAr ? 'المدونة — وائل كابلي' : 'Blog — Wael Kabli',
      description: isAr
        ? 'مقالات وأفكار من وائل كابلي عن ريادة الأعمال، الصحة الرقمية، القيادة، والابتكار.'
        : 'Articles and insights from Wael Kabli on entrepreneurship, digital health, leadership, and innovation.',
      url: canonicalUrl,
      siteName: isAr ? 'وائل كابلي' : 'Wael Kabli',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [{ url: '/images/wael-profile.jpg', width: 800, height: 800 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'المدونة — وائل كابلي' : 'Blog — Wael Kabli',
      images: ['/images/wael-profile.jpg'],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const posts = getAllPosts(locale as 'ar' | 'en');
  const isAr = locale === 'ar';

  return (
    <>
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

        <div className="max-w-4xl mx-auto px-4 py-12">
          <BlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
