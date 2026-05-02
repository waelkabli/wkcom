'use client';

import { useTranslations, useLocale } from 'next-intl';
import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  const t = useTranslations('education');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const items = t.raw('items') as Array<{
    school: string; logo?: string; fullName?: string; program: string; year: string; type: string;
  }>;

  const foundation = items.filter((i) => i.type === 'foundation');
  const executive = items.filter((i) => i.type === 'executive');

  return (
    <section id="education" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-[#2d185c] mb-2 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
          <p className="text-[#2d185c]/60 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Foundation */}
          <div>
            <div className={`flex items-center gap-2 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <GraduationCap size={20} className="text-[#ff325d]" />
              <h3 className={`font-bold text-[#2d185c] text-sm uppercase tracking-wide ${isAr ? '' : 'font-heading'}`}>
                {t('foundation')}
              </h3>
            </div>
            {foundation.map((item, i) => (
              <div
                key={i}
                className="bg-[#2d185c] rounded-2xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 hex-clip bg-[#ff325d]/20 translate-x-6 -translate-y-6" />
                <div className={`relative z-10 ${isAr ? 'text-right' : ''}`}>
                  {/* Logo */}
                  {item.logo && (
                    <div className={`mb-3 ${isAr ? 'flex justify-end' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden p-1.5">
                        <img src={item.logo} alt={item.school} className="w-full h-full object-contain" />
                      </div>
                    </div>
                  )}
                  <div className="text-[#ff325d] font-black text-3xl font-heading mb-1">{item.year}</div>
                  <div className="font-bold text-xl mb-1">{item.school}</div>
                  {item.fullName && <div className="text-white/60 text-xs mb-3">{item.fullName}</div>}
                  <div className="text-white/80 text-sm">{item.program}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Executive Education */}
          <div className="lg:col-span-2">
            <div className={`flex items-center gap-2 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Award size={20} className="text-[#ff325d]" />
              <h3 className={`font-bold text-[#2d185c] text-sm uppercase tracking-wide ${isAr ? '' : 'font-heading'}`}>
                {t('executive')}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {executive.map((item, i) => (
                <div
                  key={i}
                  className="group bg-[#f8f7ff] rounded-2xl p-5 border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-md transition-all"
                >
                  <div className={`flex items-start justify-between gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 flex-1 min-w-0 ${isAr ? 'flex-row-reverse' : ''}`}>
                      {/* Logo */}
                      {item.logo && (
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-[#e8e4f5] flex items-center justify-center overflow-hidden p-1">
                          <img src={item.logo} alt={item.school} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div className={`min-w-0 ${isAr ? 'text-right' : ''}`}>
                        <div className={`font-bold text-[#2d185c] mb-1 ${isAr ? '' : 'font-heading'}`}>{item.school}</div>
                        <div className="text-[#2d185c]/65 text-sm leading-relaxed">{item.program}</div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#ff325d] text-white text-xs font-bold">
                      {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
