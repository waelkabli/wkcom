'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Briefcase, Cpu, Rocket, Layers, Users, Mic } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  cpu: Cpu,
  rocket: Rocket,
  layers: Layers,
  users: Users,
  mic: Mic,
};

export default function Roles() {
  const t = useTranslations('roles');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const items = t.raw('items') as Array<{ icon: string; title: string; description: string }>;

  return (
    <section id="roles" className="section-padding bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14`}>
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-[#2d185c] mb-3 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
          <p className="text-[#2d185c]/60 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] || Briefcase;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-6 border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-4 text-5xl font-black text-[#f8f7ff] select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#ff325d]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff325d] transition-colors">
                    <Icon size={22} className="text-[#ff325d] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className={`text-lg font-bold text-[#2d185c] mb-2 ${isAr ? '' : 'font-heading'}`}>
                    {item.title}
                  </h3>
                  <p className="text-[#2d185c]/65 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff325d] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
