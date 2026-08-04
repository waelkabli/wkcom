'use client';

import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  locale: 'ar' | 'en';
}

export default function GiscusComments({ locale }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isAr = locale === 'ar';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO ?? '';
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? '';
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? 'General';
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? '';

    if (!repo || !repoId || !categoryId) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', locale === 'ar' ? 'ar' : 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    ref.current.appendChild(script);
  }, [locale]);

  return (
    <div className={`${isAr ? 'text-right' : ''}`}>
      <h3 className={`text-lg font-bold text-[#2d185c] mb-4 ${isAr ? '' : 'font-heading'}`}>
        {isAr ? 'التعليقات والتفاعل' : 'Comments & Reactions'}
      </h3>
      <div ref={ref} />
    </div>
  );
}
