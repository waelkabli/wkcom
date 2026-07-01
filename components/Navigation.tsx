'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isAr = locale === 'ar';
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLocale = () => {
    const next = isAr ? 'en' : 'ar';
    const withoutLocale = pathname.replace(/^\/(ar|en)/, '') || '/';
    router.push(`/${next}${withoutLocale}`);
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#experience', label: t('experience') },
    { href: '#expertise', label: t('expertise') },
    { href: '#media', label: t('media') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8e4f5]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 10 L85 24 L110 38 L110 66 L110 94 L85 108 L60 122 L35 108 L10 94 L10 66 L10 38 L35 24 Z" fill="#ff325d" opacity="0.15"/>
              <polygon points="60,15 80,26 80,48 60,59 40,48 40,26" fill="#ff325d"/>
              <polygon points="90,50 105,59 105,77 90,86 75,77 75,59" fill="#2d185c"/>
              <polygon points="30,50 45,59 45,77 30,86 15,77 15,59" fill="#2d185c" opacity="0.7"/>
              <polygon points="60,79 73,86 73,100 60,107 47,100 47,86" fill="#ff6585"/>
              <line x1="60" y1="59" x2="75" y2="59" stroke="#ff325d" strokeWidth="3"/>
              <line x1="45" y1="59" x2="60" y2="59" stroke="#ff325d" strokeWidth="3"/>
              <line x1="60" y1="59" x2="60" y2="79" stroke="#ff325d" strokeWidth="3"/>
            </svg>
            <span className={`font-bold text-lg group-hover:text-[#ff325d] transition-colors ${(scrolled || !isHome) ? 'text-[#2d185c]' : 'text-white'} ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'وائل كابلي' : 'Wael Kabli'}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium hover:text-[#ff325d] transition-colors ${(scrolled || !isHome) ? 'text-[#2d185c]/70' : 'text-white/90'}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium hover:border-[#ff325d] hover:text-[#ff325d] transition-all ${(scrolled || !isHome) ? 'border-[#2d185c]/20 text-[#2d185c]' : 'border-white/50 text-white'}`}
            >
              <span className="text-base">{isAr ? '🇺🇸' : '🇸🇦'}</span>
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-[#ff325d] text-white text-sm font-semibold hover:bg-[#fe0035] transition-colors shadow-sm"
            >
              {t('hireMe')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleLocale} className={`text-sm font-medium px-2 py-1 border rounded-full transition-colors ${(scrolled || !isHome) ? 'text-[#2d185c] border-[#2d185c]/20' : 'text-white border-white/50'}`}>
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button onClick={() => setOpen(!open)} className={`p-2 transition-colors ${(scrolled || !isHome) ? 'text-[#2d185c]' : 'text-white'}`}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#e8e4f5] shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-[#2d185c] font-medium hover:bg-[#f8f7ff] hover:text-[#ff325d] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center py-2.5 px-4 rounded-full bg-[#ff325d] text-white font-semibold hover:bg-[#fe0035] transition-colors"
              >
                {t('hireMe')}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
