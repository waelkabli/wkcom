'use client';

import { useEffect, useRef } from 'react';

interface Props {
  locale: 'ar' | 'en';
  slug: string;
}

export default function BlogComments({ locale, slug }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAr = locale === 'ar';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const serverURL = process.env.NEXT_PUBLIC_WALINE_SERVER_URL;
    if (!serverURL) {
      el.innerHTML =
        '<p style="color:#2d185c;opacity:.4;font-size:.875rem">Comments unavailable.</p>';
      return;
    }

    // Inject Waline CSS once
    const cssId = 'waline-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = '/waline.css';
      document.head.appendChild(link);
    }

    let instance: { destroy: () => void } | null | undefined;

    import('@waline/client').then(({ init }) => {
      if (!containerRef.current) return;
      instance = init({
        el: containerRef.current,
        serverURL,
        path: `/${slug}`,
        lang: locale === 'ar' ? 'ar' : 'en',
        comment: true,
        pageview: false,
        reaction: false,
        login: 'disable',
        meta: ['nick', 'mail'],
        requiredMeta: [],
        dark: false,
      });
    });

    return () => {
      instance?.destroy();
      if (el) el.innerHTML = '';
    };
  }, [locale, slug]);

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      <h3 className={`text-lg font-bold text-[#2d185c] mb-4 ${isAr ? '' : 'font-heading'}`}>
        {isAr ? 'التعليقات' : 'Comments'}
      </h3>
      <div ref={containerRef} className="waline-wrapper" />
    </div>
  );
}
