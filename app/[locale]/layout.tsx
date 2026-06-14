import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const isAr = locale === 'ar';
  const canonicalUrl = `https://waelkabli.com/${locale}`;

  return {
    title: { default: t('title'), template: `%s | ${t('siteName')}` },
    description: t('description'),
    metadataBase: new URL('https://waelkabli.com'),
    alternates: {
      canonical: canonicalUrl,
      languages: { ar: '/ar', en: '/en' },
    },
    keywords: isAr
      ? ['وائل كابلي', 'رائد أعمال', 'الصحة الرقمية', 'كيورا', 'مسك 2030', 'ريادة الأعمال', 'رؤية 2030', 'متحدث', 'مستشار']
      : ['Wael Kabli', 'serial entrepreneur', 'digital health', 'Cura', 'Misk 2030', 'Saudi startup', 'Vision 2030', 'telehealth', 'venture builder', 'speaker', 'strategic advisor'],
    authors: [{ name: isAr ? 'وائل كابلي' : 'Wael A. Kabli', url: 'https://waelkabli.com' }],
    creator: isAr ? 'وائل كابلي' : 'Wael A. Kabli',
    publisher: isAr ? 'وائل كابلي' : 'Wael A. Kabli',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: t('siteName'),
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_SA',
      type: 'profile',
      firstName: 'Wael',
      lastName: 'Kabli',
      username: 'waelkabli',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@waelkabli',
      site: '@waelkabli',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ar' | 'en')) notFound();

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://font.thmanyah.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-full flex flex-col antialiased ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
