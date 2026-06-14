'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Building2, Users2, Target, Lightbulb, Mic2 } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  building2: Building2,
  users2: Users2,
  target: Target,
  lightbulb: Lightbulb,
  mic2: Mic2,
};

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const items = t.raw('items') as Array<{
    icon: string; title: string; description: string; tags: string[];
  }>;

  return (
    <section id="services" className="section-padding bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-[#2d185c] mb-3 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
          <p className="text-[#2d185c]/60 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] || Building2;
            const featured = i === 0;
            return (
              <div
                key={i}
                className={`group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  featured
                    ? 'bg-[#2d185c] border-transparent text-white'
                    : 'bg-white border-[#e8e4f5] hover:border-[#ff325d]/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${featured ? 'bg-[#ff325d]' : 'bg-[#ff325d]/10 group-hover:bg-[#ff325d]'} transition-colors`}>
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className={`font-bold text-lg mb-2 ${isAr ? '' : 'font-heading'} ${featured ? 'text-white' : 'text-[#2d185c]'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${featured ? 'text-white/75' : 'text-[#2d185c]/65'}`}>
                  {item.description}
                </p>

                <div className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : ''}`}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        featured
                          ? 'bg-white/15 text-white/80'
                          : 'bg-[#f8f7ff] text-[#412384] border border-[#e8e4f5]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ff325d] text-white font-bold text-lg hover:bg-[#fe0035] transition-all hover:shadow-lg hover:shadow-[#ff325d]/30 hover:-translate-y-0.5"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
