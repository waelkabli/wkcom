'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MapPin, CheckCircle2, Quote } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row gap-16 items-center ${isAr ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left: visual card */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Main card */}
              <div className="relative bg-[#2d185c] rounded-2xl p-8 text-white overflow-hidden">
                {/* Hex decorations */}
                <div className="absolute top-0 right-0 w-24 h-24 hex-clip bg-[#ff325d]/20 translate-x-8 -translate-y-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 hex-clip bg-[#ff6585]/20 -translate-x-6 translate-y-6" />

                <div className={`relative z-10 ${isAr ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#412384] border-2 border-[#ff325d]/40">
                      <img src="/images/wael-profile.jpg" alt="Wael" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{isAr ? 'وائل كابلي' : 'Wael Kabli'}</div>
                      <div className="text-[#ff6585] text-sm">{isAr ? 'مؤسس ورئيس تنفيذي' : 'Founder & CEO'}</div>
                    </div>
                  </div>

                  <blockquote className="relative">
                    <Quote size={20} className="text-[#ff325d] mb-2 opacity-60" />
                    <p className="text-white/85 text-sm leading-relaxed italic">{t('quote')}</p>
                  </blockquote>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-white/60 text-sm">
                    <MapPin size={14} className="text-[#ff325d]" />
                    <span>{t('location')}</span>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff325d]/20 text-[#ff6585] text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff325d] animate-pulse" />
                    {t('available')}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-xl px-4 py-2 border border-[#e8e4f5]">
                <div className="text-[#ff325d] font-black text-xl font-heading">20+</div>
                <div className="text-[#2d185c]/60 text-xs">{isAr ? 'سنة خبرة' : 'Years Exp.'}</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-xl px-4 py-2 border border-[#e8e4f5]">
                <div className="text-[#ff325d] font-black text-xl font-heading">4M+</div>
                <div className="text-[#2d185c]/60 text-xs">{isAr ? 'مستخدم' : 'Users Served'}</div>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className={`flex-1 ${isAr ? 'text-right' : ''}`}>
            <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
              {t('sectionLabel')}
            </div>
            <h2 className={`text-4xl sm:text-5xl font-black text-[#2d185c] mb-6 leading-tight ${isAr ? '' : 'font-heading'}`}>
              {t('title')}
            </h2>
            <p className="text-[#2d185c]/70 text-lg leading-relaxed mb-4">{t('bio')}</p>
            <p className="text-[#2d185c]/70 text-lg leading-relaxed mb-8">{t('bio2')}</p>

            {/* Key tags */}
            <div className={`flex flex-wrap gap-2 mb-8 ${isAr ? 'justify-end sm:justify-start' : ''}`}>
              {[
                isAr ? 'استشارات' : 'Consulting',
                isAr ? 'صحة رقمية' : 'Digital Health',
                isAr ? 'ذكاء اصطناعي' : 'AI & Cloud',
                isAr ? 'ريادة الأعمال' : 'Entrepreneurship',
                isAr ? 'رؤية 2030' : 'Vision 2030',
                isAr ? 'بناء مشاريع' : 'Venture Building',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#f8f7ff] text-[#2d185c] text-sm font-medium border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:text-[#ff325d] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              {[
                isAr ? 'مؤسس ورئيس تنفيذي لكيورا — المستشفى الافتراضي الأول في السعودية' : 'Founder & CEO of Cura — KSA\'s #1 Virtual Hospital',
                isAr ? 'قائد مسك 2030 • تعليم تنفيذي من كولومبيا وستانفورد وإنسياد' : 'Misk 2030 Leader • Columbia, Stanford, INSEAD',
                isAr ? 'دائرة الابتكار الصحي — فوربس الشرق الأوسط' : 'Forbes Middle East Healthcare Innovation Circle',
              ].map((item) => (
                <div key={item} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 size={18} className="text-[#ff325d] flex-shrink-0 mt-0.5" />
                  <span className="text-[#2d185c]/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
