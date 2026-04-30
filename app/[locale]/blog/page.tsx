import { getAllPosts } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import { getLocale, getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

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
