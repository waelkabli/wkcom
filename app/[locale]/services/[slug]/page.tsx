import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getService, getAllServiceSlugs } from '@/lib/services';
import { getLocale } from 'next-intl/server';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import {
  Building2, Users2, Target, Lightbulb, Mic2,
  TrendingUp, Globe, DollarSign, Shield, Eye, Users,
  Compass, Map, Brain, Mic, Heart, Zap, MessageCircle, Star,
} from 'lucide-react';
import type { Metadata } from 'next';

const ICON_MAP: Record<string, React.ElementType> = {
  building2: Building2, users2: Users2, target: Target, lightbulb: Lightbulb, mic2: Mic2,
  'trending-up': TrendingUp, globe: Globe, 'dollar-sign': DollarSign,
  shield: Shield, eye: Eye, users: Users, compass: Compass, map: Map,
  brain: Brain, mic: Mic, heart: Heart, zap: Zap,
  'message-circle': MessageCircle, star: Star,
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return ['ar', 'en'].flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const isAr = locale === 'ar';
  const title = isAr ? service.title.ar : service.title.en;
  const tagline = isAr ? service.tagline.ar : service.tagline.en;
  return {
    title: `${title} — Wael A. Kabli`,
    description: tagline,
    alternates: {
      canonical: `https://waelkabli.com/${locale}/services/${slug}`,
      languages: { ar: `/ar/services/${slug}`, en: `/en/services/${slug}` },
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isAr = locale === 'ar';
  const Icon = ICON_MAP[service.icon] || Building2;

  const t = (obj: { ar: string; en: string }) => (isAr ? obj.ar : obj.en);

  return (
    <>
      <Navigation />
      <main className={`min-h-screen ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>

        {/* Hero */}
        <section className="bg-[#1a0f38] text-white pt-28 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d185c] via-[#1a0f38] to-[#0d0820]" />
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,#ff325d_0%,transparent_60%)]" />
          <div className="relative max-w-5xl mx-auto">
            <Link
              href={`/${locale}#services`}
              className={`inline-flex items-center gap-2 text-white/50 text-sm hover:text-[#ff325d] transition-colors mb-10 ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft size={14} className={isAr ? 'rotate-180' : ''} />
              {isAr ? 'كل الخدمات' : 'All Services'}
            </Link>

            <div className={`flex items-start gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-16 rounded-2xl bg-[#ff325d] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#ff325d]/20">
                <Icon size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/15 text-[#ff6585] text-xs font-semibold mb-3 border border-[#ff325d]/20">
                  {isAr ? 'وائل كابلي' : 'Wael A. Kabli'}
                </div>
                <h1 className={`text-4xl sm:text-5xl font-black mb-4 leading-tight ${isAr ? '' : 'font-heading'}`}>
                  {t(service.title)}
                </h1>
                <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                  {t(service.tagline)}
                </p>
              </div>
            </div>

            {/* Stats bar */}
            <div className={`mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4`}>
              {service.stats.map((stat) => (
                <div key={stat.value} className={`text-center p-4 rounded-2xl bg-white/5 border border-white/10 ${isAr ? '' : ''}`}>
                  <div className="text-2xl font-black text-[#ff325d] mb-1">{stat.value}</div>
                  <div className="text-white/50 text-xs">{t(stat.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero description + primary CTA */}
        <section className="bg-white py-14 px-4 border-b border-[#e8e4f5]">
          <div className="max-w-5xl mx-auto">
            <div className={`flex flex-col md:flex-row gap-10 items-center ${isAr ? 'md:flex-row-reverse' : ''}`}>
              <p className="text-[#2d185c]/70 text-lg leading-relaxed flex-1">
                {t(service.heroDesc)}
              </p>
              <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-auto">
                <a
                  href={`/${locale}#contact`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ff325d] text-white font-bold text-base hover:bg-[#fe0035] transition-all hover:shadow-lg hover:shadow-[#ff325d]/30 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  {isAr ? 'ابدأ المحادثة' : 'Start a Conversation'}
                </a>
                <a
                  href={`/${locale}#contact`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-[#2d185c] text-[#2d185c] font-semibold text-sm hover:bg-[#2d185c] hover:text-white transition-all whitespace-nowrap"
                >
                  {isAr ? 'نموذج التواصل' : 'Contact Form'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="bg-[#f8f7ff] py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-black text-[#2d185c] ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'ما الذي تحصل عليه' : 'What You Get'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.valueProps.map((vp, i) => {
                const VPIcon = ICON_MAP[vp.icon] || Target;
                return (
                  <div key={i} className={`bg-white rounded-2xl p-6 border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-md transition-all ${isAr ? 'text-right' : ''}`}>
                    <div className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-xl bg-[#ff325d]/10 flex items-center justify-center flex-shrink-0">
                        <VPIcon size={18} className="text-[#ff325d]" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-[#2d185c] mb-1 ${isAr ? '' : 'font-heading'}`}>{t(vp.title)}</h3>
                        <p className="text-[#2d185c]/65 text-sm leading-relaxed">{t(vp.desc)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who It's For + Outcomes */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Who for */}
            <div>
              <h2 className={`text-2xl font-black text-[#2d185c] mb-6 ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'هذا الدور مناسب إذا كنت' : 'This Is Right For You If'}
              </h2>
              <ul className="space-y-3">
                {service.whoFor.map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5 h-5 rounded-full bg-[#ff325d]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-[#ff325d]" />
                    </div>
                    <span className="text-[#2d185c]/75 text-sm leading-relaxed">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div>
              <h2 className={`text-2xl font-black text-[#2d185c] mb-6 ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'ماذا ستحقق' : 'What You\'ll Achieve'}
              </h2>
              <ul className="space-y-3">
                {service.outcomes.map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5 h-5 rounded-full bg-[#412384]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-[#412384]" />
                    </div>
                    <span className="text-[#2d185c]/75 text-sm leading-relaxed">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-[#2d185c] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-black ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'كيف نعمل معًا' : 'How We Work Together'}
              </h2>
              <p className="text-white/55 mt-2 text-sm">
                {isAr ? 'عملية واضحة — لا تخمين' : 'A clear process — no guessing'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className={`relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${isAr ? 'text-right' : ''}`}>
                  <div className="text-4xl font-black text-[#ff325d]/20 mb-3">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className={`font-bold text-white mb-2 text-sm ${isAr ? '' : 'font-heading'}`}>{t(step.title)}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{t(step.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#f8f7ff] py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-black text-[#2d185c] ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'خيارات الارتباط' : 'Engagement Options'}
              </h2>
              <p className="text-[#2d185c]/55 mt-2 text-sm">
                {isAr ? 'اختر ما يناسب وضعك — أو تواصل للتشاور' : 'Choose what fits your situation — or reach out to discuss'}
              </p>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
              {service.packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 border transition-all flex flex-col ${
                    pkg.featured
                      ? 'bg-[#2d185c] border-transparent text-white shadow-xl scale-[1.03]'
                      : 'bg-white border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-md'
                  } ${isAr ? 'text-right' : ''}`}
                >
                  {pkg.featured && (
                    <div className={`absolute -top-3 ${isAr ? 'right-6' : 'left-6'}`}>
                      <span className="bg-[#ff325d] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {isAr ? 'الأكثر شيوعًا' : 'Most Popular'}
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className={`font-bold text-base mb-1 ${isAr ? '' : 'font-heading'} ${pkg.featured ? 'text-white' : 'text-[#2d185c]'}`}>
                      {t(pkg.name)}
                    </div>
                    <p className={`text-sm leading-relaxed ${pkg.featured ? 'text-white/65' : 'text-[#2d185c]/60'}`}>
                      {t(pkg.description)}
                    </p>
                  </div>

                  {service.showPrices !== false && (
                  <div className="mb-5">
                    <span className={`text-3xl font-black ${pkg.featured ? 'text-[#ff325d]' : 'text-[#2d185c]'}`}>
                      {t(pkg.price)}
                    </span>
                    <span className={`text-sm ms-2 ${pkg.featured ? 'text-white/50' : 'text-[#2d185c]/40'}`}>
                      / {t(pkg.period)}
                    </span>
                  </div>
                  )}

                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.includes.map((item, j) => (
                      <li key={j} className={`flex items-start gap-2 text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                        <Check size={13} className={`flex-shrink-0 mt-0.5 ${pkg.featured ? 'text-[#ff325d]' : 'text-[#412384]'}`} />
                        <span className={pkg.featured ? 'text-white/75' : 'text-[#2d185c]/70'}>{t(item)}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/${locale}#contact`}
                    className={`mt-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-all ${
                      pkg.featured
                        ? 'bg-[#ff325d] text-white hover:bg-[#fe0035] hover:shadow-lg hover:shadow-[#ff325d]/30'
                        : 'border-2 border-[#2d185c] text-[#2d185c] hover:bg-[#2d185c] hover:text-white'
                    }`}
                  >
                    {isAr ? 'ابدأ الآن' : 'Get Started'}
                  </a>
                </div>
              ))}
            </div>

            {service.showPrices !== false && (
            <p className={`text-center text-[#2d185c]/40 text-xs mt-8 ${isAr ? '' : ''}`}>
              {isAr
                ? 'الأسعار تُذكر بالريال السعودي. يمكن تعديل النطاقات بناءً على طبيعة المشروع والمدة.'
                : 'Prices in SAR. Scope and duration may adjust the final rate. All engagements start with a no-commitment call.'}
            </p>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-2xl font-black text-[#2d185c] mb-10 ${isAr ? '' : 'font-heading'} text-center`}>
              {isAr ? 'أسئلة شائعة' : 'Common Questions'}
            </h2>
            <div className="space-y-5">
              {service.faq.map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl bg-[#f8f7ff] border border-[#e8e4f5] ${isAr ? 'text-right' : ''}`}>
                  <h3 className={`font-bold text-[#2d185c] mb-2 text-sm ${isAr ? '' : 'font-heading'}`}>
                    {t(item.q)}
                  </h3>
                  <p className="text-[#2d185c]/65 text-sm leading-relaxed">{t(item.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#ff325d] py-16 px-4 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-3xl font-black mb-4 ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              {isAr
                ? 'المحادثة الأولى بدون التزام. أخبرني بتحديك واكتشف ما إذا كنا مناسبَين.'
                : 'The first conversation is commitment-free. Tell me your challenge and let\'s find out if we\'re the right fit.'}
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 justify-center ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href={`/${locale}#contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#ff325d] font-bold text-base hover:bg-white/90 transition-all hover:-translate-y-0.5"
              >
                {isAr ? 'تواصل معي' : 'Contact Me'}
              </a>
              <a
                href={`/${locale}#contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                {isAr ? 'نموذج التواصل' : 'Contact Form'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
