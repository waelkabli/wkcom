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
              { href: 'https://linkedin.com/in/waelkablli', label: 'in' },
              { href: 'https://x.com/waelkabli', label: '𝕏' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
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
