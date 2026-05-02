'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const items = t.raw('items') as Array<{
    period: string; company: string; logo?: string; role: string;
    location: string; description: string; highlight: string;
  }>;

  return (
    <section id="experience" className="section-padding bg-white">
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

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className={`absolute top-0 bottom-0 w-0.5 bg-[#e8e4f5] ${isAr ? 'right-[11px] sm:right-auto sm:left-[11px]' : 'left-[11px]'} hidden sm:block`} />

          <div className="space-y-8">
            {items.map((item, i) => (
              <div key={i} className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#ff325d] bg-white items-center justify-center mt-1 timeline-dot relative z-10">
                  <div className="w-2 h-2 rounded-full bg-[#ff325d]" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-[#f8f7ff] rounded-2xl p-6 border border-[#e8e4f5] hover:border-[#ff325d]/20 hover:shadow-md transition-all group">
                  <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                      {/* Company logo */}
                      {item.logo && (
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-[#e8e4f5] flex items-center justify-center overflow-hidden p-1">
                          <img
                            src={item.logo}
                            alt={item.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div className={isAr ? 'text-right' : ''}>
                        <span className="text-xs font-semibold text-[#ff325d] tracking-wide uppercase">{item.period}</span>
                        <h3 className={`text-xl font-bold text-[#2d185c] mt-0.5 ${isAr ? '' : 'font-heading'}`}>{item.company}</h3>
                        <p className="text-[#412384] font-medium text-sm">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1.5 rounded-full bg-[#ff325d] text-white text-xs font-bold">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                  <p className={`text-[#2d185c]/70 text-sm leading-relaxed mb-3 ${isAr ? 'text-right' : ''}`}>{item.description}</p>
                  <div className={`flex items-center gap-1.5 text-[#2d185c]/50 text-xs ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
