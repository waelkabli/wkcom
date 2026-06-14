import Link from 'next/link';
import { getLatestPosts, type Post } from '@/lib/blog';
import { Calendar, Clock, ArrowRight, FileText, MessageSquare } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function BlogPreview() {
  const locale = (await getLocale()) as 'ar' | 'en';
  const t = await getTranslations('blog');
  const posts = getLatestPosts(locale, 3);
  const isAr = locale === 'ar';

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-[#2d185c] mb-3 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
          <p className="text-[#2d185c]/60 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 text-[#2d185c]/40">{t('noPostsYet')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} t={t} isAr={isAr} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#2d185c] text-[#2d185c] font-semibold hover:bg-[#2d185c] hover:text-white transition-all"
          >
            {t('viewAll')}
            <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostCard({
  post, locale, t, isAr,
}: {
  post: Post;
  locale: string;
  t: Awaited<ReturnType<typeof getTranslations>>;
  isAr: boolean;
}) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block bg-[#f8f7ff] rounded-2xl overflow-hidden border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Cover or placeholder */}
      {post.coverImage ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-[#2d185c] to-[#412384] flex items-center justify-center">
          {post.type === 'micro' ? (
            <MessageSquare size={32} className="text-[#ff6585] opacity-60" />
          ) : (
            <FileText size={32} className="text-[#ff6585] opacity-60" />
          )}
        </div>
      )}

      <div className={`p-5 ${isAr ? 'text-right' : ''}`}>
        {/* Type badge */}
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${
          post.type === 'micro'
            ? 'bg-[#412384]/10 text-[#412384]'
            : 'bg-[#ff325d]/10 text-[#ff325d]'
        }`}>
          {post.type === 'micro' ? t('micro') : t('article')}
        </span>

        {post.title && (
          <h3 className={`font-bold text-[#2d185c] mb-2 line-clamp-2 group-hover:text-[#ff325d] transition-colors ${isAr ? '' : 'font-heading'}`}>
            {post.title}
          </h3>
        )}
        {post.excerpt && (
          <p className="text-[#2d185c]/65 text-sm leading-relaxed line-clamp-3 mb-3">{post.excerpt}</p>
        )}
        {post.type === 'micro' && !post.title && (
          <p className="text-[#2d185c]/80 text-sm leading-relaxed line-clamp-4 mb-3">
            {post.content.slice(0, 160)}...
          </p>
        )}

        <div className={`flex items-center gap-3 text-[#2d185c]/40 text-xs ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {post.date}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime} {t('minuteRead')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
