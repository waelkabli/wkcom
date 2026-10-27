import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <main className="min-h-screen bg-[#2d185c] flex items-center justify-center px-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="text-center text-white">
        <div className="text-[#ff325d] font-black text-8xl font-heading mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-white/60 mb-8 text-lg">
          {isAr ? 'الصفحة التي تبحث عنها غير موجودة.' : 'The page you are looking for does not exist.'}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff325d] text-white font-semibold hover:bg-[#fe0035] transition-all"
        >
          {isAr ? 'الذهاب إلى الصفحة الرئيسية' : 'Go to Homepage'}
        </Link>
      </div>
    </main>
  );
}
