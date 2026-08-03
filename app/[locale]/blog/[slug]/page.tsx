import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import { getLocale, getTranslations } from 'next-intl/server';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import NextImage from 'next/image';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: ('ar' | 'en')[] = ['ar', 'en'];
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as 'ar' | 'en');
  if (!post) return {};

  const isAr = locale === 'ar';
  const canonicalUrl = `https://waelkabli.com/${locale}/blog/${slug}`;

  return {
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: `/ar/blog/${slug}`,
        en: `/en/blog/${slug}`,
        'x-default': `/en/blog/${slug}`,
      },
    },
    authors: [{ name: isAr ? 'وائل كابلي' : 'Wael A. Kabli', url: 'https://waelkabli.com' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: isAr ? 'وائل كابلي' : 'Wael Kabli',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: ['https://waelkabli.com'],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: `https://waelkabli.com${post.coverImage}`, width: 1200, height: 630, alt: post.title ?? '' }]
        : [{ url: 'https://waelkabli.com/images/wael-profile.jpg', width: 400, height: 400, alt: isAr ? 'وائل كابلي' : 'Wael A. Kabli' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@waelkabli',
      images: post.coverImage
        ? [`https://waelkabli.com${post.coverImage}`]
        : ['https://waelkabli.com/images/wael-profile.jpg'],
    },
  };
}

function getYouTubeEmbed(text: string): { id: string; isShort: boolean } | null {
  const trimmed = text.trim();
  const shorts = trimmed.match(/^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return { id: shorts[1], isShort: true };
  const regular = trimmed.match(/^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (regular) return { id: regular[1], isShort: false };
  return null;
}

function stripCoverImageFromContent(content: string, coverImage?: string): string {
  if (!coverImage) return content;
  const escaped = coverImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return content.replace(new RegExp(`!\\[[^\\]]*\\]\\(${escaped}\\)[ \t]*\\r?\\n?`), '').trimStart();
}

const mdComponents: Components = {
  p({ children }) {
    const text = typeof children === 'string' ? children : '';
    const embed = text ? getYouTubeEmbed(text) : null;
    if (embed) {
      if (embed.isShort) {
        return (
          <div className="my-6 mx-auto w-full max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${embed.id}`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="YouTube Short"
            />
          </div>
        );
      }
      return (
        <div className="my-6 aspect-video rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${embed.id}`}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video"
          />
        </div>
      );
    }
    return <p>{children}</p>;
  },
  // Strip the <pre> wrapper if the child is a custom component (e.g. PhotoGallery)
  pre({ children }) {
    const child = Array.isArray(children) ? children[0] : children;
    if (child && typeof child === 'object' && 'type' in child && typeof (child as { type: unknown }).type === 'function') {
      return <>{children}</>;
    }
    return <pre>{children}</pre>;
  },
  code({ className, children }) {
    const lang = className?.replace('language-', '') ?? '';
    if (lang === 'gallery') {
      const lines = String(children).trim().split('\n').filter(Boolean);
      const images = lines.map((line) => {
        const [src, ...altParts] = line.split('|');
        return { src: src.trim(), alt: altParts.join('|').trim() };
      });
      return <PhotoGallery images={images} />;
    }
    return <code className={className}>{children}</code>;
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as 'ar' | 'en');
  if (!post) notFound();

  const t = await getTranslations('blog');
  const isAr = locale === 'ar';
  const cleanContent = stripCoverImageFromContent(post.content, post.coverImage);

  // JSON-LD for blog post (Article schema)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      '@type': 'Person',
      name: 'Wael A. Kabli',
      url: 'https://waelkabli.com',
      sameAs: ['https://linkedin.com/in/waelkabli'],
    },
    publisher: {
      '@type': 'Person',
      name: 'Wael A. Kabli',
      url: 'https://waelkabli.com',
    },
    url: `https://waelkabli.com/${locale}/blog/${slug}`,
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    image: post.coverImage
      ? `https://waelkabli.com${post.coverImage}`
      : 'https://waelkabli.com/images/wael-profile.jpg',
    keywords: post.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://waelkabli.com/${locale}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation />
      <main className="min-h-screen bg-[#f8f7ff] pt-20">
        {/* Back link */}
        <div className="max-w-3xl mx-auto px-4 pt-8">
          <Link
            href={`/${locale}/blog`}
            className={`inline-flex items-center gap-2 text-[#ff325d] text-sm font-medium hover:underline ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft size={14} className={isAr ? 'rotate-180' : ''} />
            {t('backToBlog')}
          </Link>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="rounded-2xl overflow-hidden aspect-video relative">
              <NextImage src={post.coverImage} alt={post.title ?? ''} fill sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
            </div>
          </div>
        )}

        {/* Article */}
        <article className={`max-w-3xl mx-auto px-4 py-8 ${isAr ? 'text-right' : ''}`}>
          {/* Type + date + reading time */}
          <div className={`flex items-center gap-3 mb-4 text-sm ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              post.type === 'article' ? 'bg-[#ff325d]/10 text-[#ff325d]' : 'bg-[#412384]/10 text-[#412384]'
            }`}>
              {post.type === 'article' ? t('article') : t('micro')}
            </span>
            <span className="flex items-center gap-1 text-[#2d185c]/50">
              <Calendar size={13} />
              {t('publishedOn')} {post.date}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1 text-[#2d185c]/50">
                <Clock size={13} />
                {post.readingTime} {t('minuteRead')}
              </span>
            )}
          </div>

          {post.title && (
            <h1 className={`text-3xl sm:text-4xl font-black text-[#2d185c] mb-5 leading-tight ${isAr ? '' : 'font-heading'}`}>
              {post.title}
            </h1>
          )}

          {post.excerpt && (
            <p className="text-[#2d185c]/65 text-lg leading-relaxed mb-8 border-s-4 border-[#ff325d] ps-4 italic">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className={`flex flex-wrap gap-2 mb-10 ${isAr ? 'flex-row-reverse' : ''}`}>
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#e8e4f5] text-[#412384] text-xs font-medium">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown components={mdComponents}>{cleanContent}</ReactMarkdown>
          </div>
        </article>

        {/* Author card */}
        <div className="max-w-3xl mx-auto px-4 pb-16">
          <div className={`flex items-center gap-4 p-5 rounded-2xl bg-[#2d185c] text-white ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#412384] border-2 border-[#ff325d]/40 flex-shrink-0 relative">
              <NextImage src="/images/wael-profile.jpg" alt="Wael" fill sizes="56px" className="object-cover" />
            </div>
            <div className={isAr ? 'text-right' : ''}>
              <div className="font-bold">{isAr ? 'وائل كابلي' : 'Wael A. Kabli'}</div>
              <div className="text-white/60 text-sm">{isAr ? 'رائد أعمال تقني • مستشار • رائد الصحة الرقمية' : 'Serial Tech Entrepreneur • Advisor • Digital Health Pioneer'}</div>
              <a href={`/${locale}#contact`} className="text-[#ff325d] text-xs mt-1 inline-block hover:underline">
                {isAr ? 'تواصل معه' : 'Get in touch'}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
