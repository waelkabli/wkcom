import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#2d185c] flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="text-[#ff325d] font-black text-8xl font-heading mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-white/60 mb-8 text-lg">The page you are looking for does not exist.</p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff325d] text-white font-semibold hover:bg-[#fe0035] transition-all"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
