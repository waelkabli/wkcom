'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Calendar, MapPin } from 'lucide-react';

export default function Speaking() {
  const t = useTranslations('speaking');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const items = t.raw('items') as Array<{ event: string; org: string; year: string }>;

  return (
    <section id="speaking" className="section-padding bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group flex items-start gap-4 p-4 rounded-xl border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:bg-[#f8f7ff] transition-all ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ff325d]/10 flex items-center justify-center group-hover:bg-[#ff325d] transition-colors">
                <Calendar size={16} className="text-[#ff325d] group-hover:text-white transition-colors" />
              </div>
              <div className={`flex-1 min-w-0 ${isAr ? 'text-right' : ''}`}>
                <div className="font-semibold text-[#2d185c] text-sm leading-snug">{item.event}</div>
                <div className="text-[#2d185c]/55 text-xs mt-0.5">{item.org}</div>
              </div>
              <div className="flex-shrink-0 px-2 py-0.5 rounded-full bg-[#2d185c]/8 text-[#412384] text-xs font-semibold">
                {item.year}
              </div>
            </div>
          ))}
        </div>

        {/* Available for speaking */}
        <div className="mt-10 bg-[#2d185c] rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 hex-clip bg-[#ff325d]/15 translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 hex-clip bg-[#412384]/40 -translate-x-8 translate-y-8" />
          <div className="relative z-10">
            <p className={`font-bold text-lg mb-2 ${isAr ? '' : 'font-heading'}`}>
              {isAr
                ? 'متاح للمحاضرات الرئيسية واللجان وإدارة الجلسات'
                : 'Available for Keynotes, Panels & Moderation'}
            </p>
            <p className="text-white/65 text-sm mb-5">
              {isAr
                ? 'المواضيع: الصحة الرقمية • الذكاء الاصطناعي والتكنولوجيا • القيادة • ريادة الأعمال • رؤية 2030'
                : 'Topics: Digital Health • AI & Technology • Leadership • Entrepreneurship • Vision 2030'}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ff325d] text-white font-semibold hover:bg-[#fe0035] transition-colors"
            >
              {isAr ? 'تواصل الآن' : 'Book a Speaking Slot'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
