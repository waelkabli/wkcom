'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowDown, Download } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const roles: string[] = t.raw('roles') as string[];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex, roles]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#2d185c]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute hex-clip bg-white"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              top: `${[10, 60, 20, 70, 30, 80][i]}%`,
              left: `${[5, 80, 50, 20, 70, 40][i]}%`,
              opacity: 0.3 + i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text content */}
          <div className={`flex-1 text-white ${isAr ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 text-sm text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#ff325d] animate-pulse-slow" />
              {t('greeting')}
            </div>

            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-none ${isAr ? '' : 'font-heading'}`}>
              {t('name')}
            </h1>

            <div className="h-14 flex items-center mb-6">
              <span className={`text-2xl sm:text-3xl font-bold text-[#ff6585] ${isAr ? '' : 'font-heading'}`}>
                {displayed}
                <span className="inline-block w-0.5 h-7 bg-[#ff325d] ms-1 animate-pulse" />
              </span>
            </div>

            <p className="text-white/70 text-lg leading-relaxed max-w-xl mb-8">
              {t('tagline')}
            </p>

            <div className={`flex flex-wrap gap-4 ${isAr ? 'justify-end sm:justify-start' : ''}`}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff325d] text-white font-semibold hover:bg-[#fe0035] transition-all hover:shadow-lg hover:shadow-[#ff325d]/30 hover:-translate-y-0.5"
              >
                {t('cta')}
              </a>
              <a
                href="/cv/WaelKabli-ExecCV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:border-white/60 hover:bg-white/10 transition-all"
              >
                <Download size={16} />
                {t('ctaSecondary')}
              </a>
              <a
                href="/cv/WaelKabli-CV.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                <Download size={14} />
                {t('ctaTertiary')}
              </a>
              <a
                href="/cv/Wael-Portifolio-02.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#ff325d]/40 text-[#ff6585] text-sm hover:border-[#ff325d]/70 hover:text-white hover:bg-[#ff325d]/10 transition-all"
              >
                <Download size={14} />
                {t('ctaPortfolio')}
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-[#ff325d]/30 animate-pulse-slow" />
              <div className="absolute inset-4 rounded-full border border-white/10" />
              {/* Hex accent */}
              <div className="absolute -top-4 -right-4 w-12 h-12 hex-clip bg-[#ff325d]" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 hex-clip bg-[#ff6585]" />
              {/* Image container */}
              <div className="absolute inset-6 rounded-full overflow-hidden bg-[#412384] border-4 border-[#ff325d]/40">
                <img
                  src="/images/wael-profile.jpg"
                  alt="Wael A. Kabli"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs animate-bounce">
          <span>{t('scrollHint')}</span>
          <ArrowDown size={14} />
        </div>
      </div>

      {/* Stats strip */}
      <StatsStrip />
    </section>
  );
}

function StatsStrip() {
  const t = useTranslations('stats');
  const stats = [
    { value: '20+', label: t('years') },
    { value: '$7M', label: t('capital') },
    { value: '55+', label: t('projects') },
    { value: '4M+', label: t('users') },
  ];

  return (
    <div className="absolute bottom-0 inset-x-0 bg-[#ff325d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
          {stats.map((s) => (
            <div key={s.label} className="py-4 px-4 text-center">
              <div className="text-white font-black text-2xl sm:text-3xl font-heading">{s.value}</div>
              <div className="text-white/80 text-xs sm:text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
