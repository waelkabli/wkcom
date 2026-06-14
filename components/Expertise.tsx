'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Expertise() {
  const t = useTranslations('expertise');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const items = t.raw('items') as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="expertise" className="section-padding bg-[#2d185c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#ff6585] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-white mb-3 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#ff325d]/40 transition-all duration-300 overflow-hidden"
            >
              {/* Large number */}
              <div className={`text-7xl font-black text-[#ff325d] opacity-20 leading-none mb-2 ${isAr ? 'text-right' : ''} font-heading`}>
                {item.number}
              </div>

              {/* Hex accent */}
              <div className="absolute top-4 right-4 w-8 h-8 hex-clip bg-[#ff325d]/10 group-hover:bg-[#ff325d]/20 transition-colors" />

              <h3 className={`text-white font-bold text-lg mb-3 ${isAr ? 'text-right' : ''} ${isAr ? '' : 'font-heading'}`}>
                {item.title}
              </h3>
              <p className={`text-white/60 text-sm leading-relaxed ${isAr ? 'text-right' : ''}`}>
                {item.description}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff325d] to-[#ff6585] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>

        {/* Market coverage strip */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm tracking-widest uppercase">
            {isAr ? 'أسواق العمل: ' : 'Market Coverage: '}
            <span className="text-white/60">B2C • B2B2C • B2B • B2G</span>
          </p>
        </div>
      </div>
    </section>
  );
}
