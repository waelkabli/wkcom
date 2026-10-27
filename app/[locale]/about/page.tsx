import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const canonicalUrl = `https://waelkabli.com/${locale}/about`;

  return {
    title: isAr ? 'عن وائل كابلي' : 'About Wael A. Kabli',
    description: isAr
      ? 'وائل كابلي رائد أعمال تقني سعودي ومؤسس كيورا ورائد الصحة الرقمية. 20+ عاماً في التقنية والرعاية الصحية والاستراتيجية.'
      : 'Wael A. Kabli — Saudi serial tech entrepreneur, founder of Cura (KSA\'s first virtual hospital), Misk 2030 Leader, and digital health pioneer with 20+ years in tech, healthcare, and strategy.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: '/ar/about',
        en: '/en/about',
        'x-default': '/ar/about',
      },
    },
    openGraph: {
      title: isAr ? 'عن وائل كابلي' : 'About Wael A. Kabli',
      description: isAr
        ? 'رائد أعمال تقني سعودي ومؤسس كيورا. 20+ عاماً في التقنية والصحة الرقمية.'
        : 'Saudi serial tech entrepreneur, founder of Cura, Misk 2030 Leader, digital health pioneer.',
      url: canonicalUrl,
      type: 'profile',
      images: [{ url: 'https://waelkabli.com/images/wael-profile.jpg', width: 1000, height: 1000, alt: isAr ? 'وائل كابلي' : 'Wael A. Kabli' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'عن وائل كابلي' : 'About Wael A. Kabli',
      images: ['https://waelkabli.com/images/wael-profile.jpg'],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const isAr = locale === 'ar';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wael A. Kabli',
    alternateName: 'وائل كابلي',
    url: 'https://waelkabli.com',
    image: 'https://waelkabli.com/images/wael-profile.jpg',
    description: 'Saudi serial tech entrepreneur, digital health pioneer, and venture builder with 20+ years at the intersection of technology, healthcare, and strategy. Founder & CEO of Cura — KSA\'s first virtual hospital.',
    jobTitle: 'Serial Tech Entrepreneur & Digital Health Pioneer',
    nationality: { '@type': 'Country', name: 'Saudi Arabia' },
    address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
    sameAs: [
      'https://linkedin.com/in/waelkabli',
      'https://twitter.com/waelkabli',
      'https://x.com/waelkabli',
    ],
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Columbia University' },
      { '@type': 'EducationalOrganization', name: 'Stanford University' },
      { '@type': 'EducationalOrganization', name: 'INSEAD' },
      { '@type': 'EducationalOrganization', name: 'ESADE Business School' },
      { '@type': 'EducationalOrganization', name: 'Babson College' },
      { '@type': 'EducationalOrganization', name: 'KFUPM' },
    ],
    knowsAbout: [
      'Digital Health', 'Telehealth', 'AI in Healthcare', 'Entrepreneurship',
      'Venture Building', 'Saudi Vision 2030', 'Digital Transformation',
      'Strategic Consulting', 'Product Management',
    ],
    award: [
      'Forbes Middle East Healthcare Innovation Circle',
      'Misk 2030 Leader',
    ],
  };

  const career = isAr ? [
    { period: '2016 – الحاضر', org: 'كيورا للرعاية الصحية', role: 'المؤسس والرئيس التنفيذي', highlight: '7 ملايين دولار جُمعت • 4 مليون مستخدم', desc: 'بنى المستشفى الافتراضي الأول في المملكة ومنصة الرعاية الصحية عن بُعد الرائدة في المملكة العربية السعودية.' },
    { period: '2012 – 2016', org: 'إكسيد فنتشرز', role: 'الشريك المؤسس والمدير الإداري', highlight: '7 منتجات • عملية خروج واحدة', desc: 'استوديو مشاريع سعودي أطلق 7 منتجات في الذكاء الاصطناعي والبيانات الضخمة والتنقل.' },
    { period: '2005 – 2012', org: 'استشارات مايكروسوفت', role: 'مستشار هندسة المعلومات والتخطيط', highlight: '55+ مشروع مؤسسي', desc: 'قاد أكثر من 55 تحولاً مؤسسياً في قطاعات الرعاية الصحية والحكومة والدفاع وغيرها عبر أوروبا والشرق الأوسط وأفريقيا.' },
  ] : [
    { period: '2016 – Present', org: 'Cura Healthcare', role: 'Founder & CEO', highlight: '$7M Raised • 4M+ Users', desc: 'Built KSA\'s first virtual hospital and #1 telehealth platform. Shaped national telemedicine policy across Saudi Arabia, UAE, and Bahrain.' },
    { period: '2012 – 2016', org: 'Xceed Ventures', role: 'Co-Founder & Managing Partner', highlight: '7 Products • 1 Exit', desc: 'Saudi venture studio launching 7 products in AI, machine learning, big data, and mobility. Achieved 3 market wins and 1 acquisition.' },
    { period: '2005 – 2012', org: 'Microsoft Consulting Services', role: 'IT Architecture & Planning Advisor', highlight: '55+ Enterprise Projects', desc: 'Led 55+ enterprise transformations across healthcare, government, defense, oil & gas, telecom, and banking across EMEA.' },
  ];

  const education = isAr ? [
    'جامعة كولومبيا — تطوير القيادة التنفيذية',
    'جامعة ستانفورد — برنامج الشركات عالية النمو',
    'إنسياد — قيادة الأعمال والاستراتيجية',
    'مدرسة إيساد للأعمال — ريادة الأعمال',
    'كلية بابسون — ريادة الأعمال',
    'جامعة الملك فهد للبترول والمعادن — بكالوريوس',
  ] : [
    'Columbia University — Executive Leadership Development',
    'Stanford University — High-Growth Ventures Program',
    'INSEAD — Business Leadership & Strategy',
    'ESADE Business School — Entrepreneurship',
    'Babson College — Entrepreneurship',
    'KFUPM — Bachelor\'s Degree',
  ];

  const expertise = isAr ? [
    'الصحة الرقمية والطب عن بُعد',
    'الذكاء الاصطناعي وتعلم الآلة',
    'التحول الرقمي للمؤسسات',
    'بناء المشاريع والتوسع',
    'رؤية 2030 والسياسات الصحية',
    'الاستراتيجية والاستشارات',
    'القيادة والتوجيه التنفيذي',
    'هندسة السحابة وإدارة البيانات',
  ] : [
    'Digital Health & Telehealth',
    'AI & Machine Learning',
    'Enterprise Digital Transformation',
    'Venture Building & Scaling',
    'Vision 2030 & Health Policy',
    'Strategy & Advisory',
    'Executive Leadership & Coaching',
    'Cloud Architecture & Big Data',
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navigation />
      <main className={`min-h-screen bg-[#f8f7ff] pt-20 ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>

        {/* Hero */}
        <section className="bg-[#2d185c] py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`flex flex-col sm:flex-row items-center gap-10 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#ff325d]/40 flex-shrink-0">
                <Image src="/images/wael-profile.jpg" alt={isAr ? 'وائل كابلي' : 'Wael A. Kabli'} fill sizes="144px" className="object-cover object-top" priority />
              </div>
              <div className={isAr ? 'text-right' : ''}>
                <h1 className={`text-4xl sm:text-5xl font-black text-white mb-2 ${isAr ? '' : 'font-heading'}`}>
                  {isAr ? 'وائل كابلي' : 'Wael A. Kabli'}
                </h1>
                <p className="text-[#ff6585] text-lg font-semibold mb-4">
                  {isAr ? 'رائد أعمال تقني متسلسل • رائد الصحة الرقمية' : 'Serial Tech Entrepreneur  •  Digital Health Pioneer'}
                </p>
                <p className="text-white/70 text-base leading-relaxed max-w-xl">{t('bio')}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {[
                { value: '20+', label: isAr ? 'سنة خبرة' : 'Years Experience' },
                { value: '$7M', label: isAr ? 'رأس مال جُمع' : 'Capital Raised' },
                { value: '55+', label: isAr ? 'مشروع مُنجز' : 'Projects Delivered' },
                { value: '4M+', label: isAr ? 'مستخدم' : 'Users Served' },
              ].map((s) => (
                <div key={s.label} className="text-center bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl font-black text-[#ff325d] font-heading">{s.value}</div>
                  <div className="text-white/60 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl font-black text-[#2d185c] mb-6 ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'السيرة الذاتية' : 'Biography'}
            </h2>
            <p className="text-[#2d185c]/75 text-lg leading-relaxed mb-4">{t('bio')}</p>
            <p className="text-[#2d185c]/75 text-lg leading-relaxed mb-6">{t('bio2')}</p>
            <blockquote className="border-s-4 border-[#ff325d] ps-5 italic text-[#2d185c]/65 text-lg">
              {t('quote')}
            </blockquote>
          </div>
        </section>

        {/* Career */}
        <section className="bg-[#f8f7ff] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl font-black text-[#2d185c] mb-10 ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'المسيرة المهنية' : 'Career'}
            </h2>
            <div className="space-y-6">
              {career.map((item) => (
                <div key={item.org} className="bg-white rounded-2xl p-6 border border-[#e8e4f5]">
                  <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                    <div>
                      <span className="text-xs font-semibold text-[#ff325d] uppercase tracking-wide">{item.period}</span>
                      <h3 className={`text-xl font-bold text-[#2d185c] ${isAr ? '' : 'font-heading'}`}>{item.org}</h3>
                      <p className="text-[#412384] font-medium text-sm">{item.role}</p>
                    </div>
                    <span className="text-xs bg-[#ff325d]/10 text-[#ff325d] font-bold px-3 py-1.5 rounded-full whitespace-nowrap self-start">{item.highlight}</span>
                  </div>
                  <p className="text-[#2d185c]/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education + Recognition */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-2xl font-black text-[#2d185c] mb-6 ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'التعليم' : 'Education'}
              </h2>
              <ul className="space-y-3">
                {education.map((item) => (
                  <li key={item} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff325d] flex-shrink-0 mt-2" />
                    <span className="text-[#2d185c]/75 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={`text-2xl font-black text-[#2d185c] mb-6 ${isAr ? '' : 'font-heading'}`}>
                {isAr ? 'التقدير والاعتراف' : 'Recognition'}
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: isAr ? 'دائرة ابتكار الرعاية الصحية — فوربس الشرق الأوسط' : 'Forbes Middle East Healthcare Innovation Circle',
                    desc: isAr ? 'رائد مؤسسي معترف به في قطاع الصحة الرقمية في المنطقة.' : 'Recognized as a founding pioneer in the region\'s digital health sector.',
                  },
                  {
                    title: isAr ? 'قائد مسك 2030' : 'Misk 2030 Leader',
                    desc: isAr ? 'ضمن المجموعة المختارة من قادة المملكة لدفع أهداف رؤية 2030.' : 'Selected cohort of Saudi leaders driving Vision 2030 goals.',
                  },
                  {
                    title: isAr ? 'صانع السياسات الوطنية للطب عن بُعد' : 'National Telemedicine Policy Shaper',
                    desc: isAr ? 'أسهم في وضع الأطر التنظيمية للطب عن بُعد في السعودية والإمارات والبحرين.' : 'Contributed to telemedicine regulatory frameworks across KSA, UAE, and Bahrain.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#ff325d]/10 text-[#ff325d] flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-bold">★</span>
                    <div>
                      <div className="font-semibold text-[#2d185c] text-sm">{item.title}</div>
                      <div className="text-[#2d185c]/60 text-sm">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="bg-[#f8f7ff] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl font-black text-[#2d185c] mb-8 ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'مجالات الخبرة' : 'Areas of Expertise'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {expertise.map((item) => (
                <span key={item} className="px-4 py-2 rounded-full bg-white border border-[#e8e4f5] text-[#2d185c] text-sm font-medium hover:border-[#ff325d]/40 hover:text-[#ff325d] transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#2d185c] py-16 px-4 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-3xl font-black mb-4 ${isAr ? '' : 'font-heading'}`}>
              {isAr ? 'هل تريد العمل معاً؟' : 'Want to Work Together?'}
            </h2>
            <p className="text-white/65 mb-8 text-lg">
              {isAr
                ? 'استشارات استراتيجية، توجيه، أو تعاون في الصحة الرقمية ورؤية 2030.'
                : 'Strategic advisory, mentorship, or collaboration on digital health and Vision 2030.'}
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 justify-center ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#ff325d] text-white font-bold hover:bg-[#fe0035] transition-all hover:-translate-y-0.5"
              >
                {isAr ? 'تواصل معي' : 'Get in Touch'}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:border-white/60 hover:bg-white/10 transition-all"
              >
                {isAr ? 'اقرأ مقالاتي' : 'Read My Writing'}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
