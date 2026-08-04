import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const isAr = locale === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a0f38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`flex flex-col md:flex-row items-start justify-between gap-8 ${isAr ? 'md:flex-row-reverse' : ''}`}>
          {/* Brand */}
          <div className={`max-w-xs ${isAr ? 'text-right' : ''}`}>
            <div className={`font-black text-2xl text-[#ff325d] mb-2 ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'وائل كابلي' : 'Wael Kabli'}
            </div>
            <div className="text-white/50 text-sm mb-4">
              {isAr ? 'شبكات الأعمال' : 'Business Networks'}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Quick links */}
          <div className={`flex flex-wrap gap-x-8 gap-y-2 ${isAr ? 'justify-end' : ''}`}>
            {[
              { href: '#about', label: tn('about') },
              { href: '#services', label: tn('services') },
              { href: '#experience', label: tn('experience') },
              { href: `/${locale}/blog`, label: tn('blog') },
              { href: `/${locale}/media`, label: tn('media') },
              { href: '#contact', label: tn('contact') },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/50 hover:text-[#ff325d] text-sm transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
            {[
              { href: 'https://linkedin.com/in/waelkablli', label: 'in', title: 'LinkedIn' },
              { href: 'https://x.com/waelkabli', label: '𝕏', title: 'X / Twitter' },
              { href: 'https://www.youtube.com/waelkabli', title: 'YouTube', label: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              )},
              { href: 'https://www.tiktok.com/@waelkabli', title: 'TikTok', label: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.97a8.27 8.27 0 0 0 4.83 1.54V7.07a4.84 4.84 0 0 1-1.06-.38z"/>
                </svg>
              )},
            ].map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff325d] flex items-center justify-center text-white/60 hover:text-white font-bold text-sm transition-all"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <span>© {year} Wael A. Kabli — {t('rights')}</span>
          <span>{t('madeWith')}</span>
        </div>
      </div>
    </footer>
  );
}
