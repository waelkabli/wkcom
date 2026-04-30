'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Post } from '@/lib/blog';
import { Calendar, Clock, ArrowRight, FileText, MessageSquare } from 'lucide-react';

export default function BlogList({ posts }: { posts: Post[] }) {
  const locale = useLocale();
  const t = useTranslations('blog');
  const isAr = locale === 'ar';
  const [filter, setFilter] = useState<'all' | 'article' | 'micro'>('all');

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.type === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className={`flex gap-2 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
        {([
          { key: 'all', label: t('filterAll') },
          { key: 'article', label: t('filterArticles') },
          { key: 'micro', label: t('filterMicro') },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === key
                ? 'bg-[#ff325d] text-white shadow-sm'
                : 'bg-white text-[#2d185c] border border-[#e8e4f5] hover:border-[#ff325d]/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#2d185c]/40">{t('noPostsYet')}</div>
      ) : (
        <div className="space-y-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className={`group flex gap-5 bg-white rounded-2xl p-5 border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-lg transition-all ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                post.type === 'article' ? 'bg-[#ff325d]/10' : 'bg-[#412384]/10'
              }`}>
                {post.type === 'article'
                  ? <FileText size={20} className="text-[#ff325d]" />
                  : <MessageSquare size={20} className="text-[#412384]" />}
              </div>

              <div className={`flex-1 min-w-0 ${isAr ? 'text-right' : ''}`}>
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${
                  post.type === 'article' ? 'text-[#ff325d] bg-[#ff325d]/10' : 'text-[#412384] bg-[#412384]/10'
                }`}>
                  {post.type === 'article' ? t('article') : t('micro')}
                </span>
                {post.title && (
                  <h2 className={`font-bold text-[#2d185c] group-hover:text-[#ff325d] transition-colors mb-1 ${isAr ? '' : 'font-heading'}`}>
                    {post.title}
                  </h2>
                )}
                {post.excerpt && (
                  <p className="text-[#2d185c]/60 text-sm line-clamp-2">{post.excerpt}</p>
                )}
                {post.type === 'micro' && !post.title && (
                  <p className="text-[#2d185c]/70 text-sm line-clamp-3">{post.content.slice(0, 200)}</p>
                )}
                <div className={`flex items-center gap-3 mt-2 text-[#2d185c]/40 text-xs ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                  {post.readingTime && (
                    <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime} {t('minuteRead')}</span>
                  )}
                  {post.tags?.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded-full bg-[#f8f7ff] border border-[#e8e4f5]">#{tag}</span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 self-center">
                <ArrowRight size={18} className={`text-[#2d185c]/20 group-hover:text-[#ff325d] transition-colors ${isAr ? 'rotate-180' : ''}`} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
