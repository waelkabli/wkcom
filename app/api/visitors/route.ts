import { NextRequest, NextResponse } from 'next/server';
import { logVisitor, getVisitors, getVisitorStats } from '@/lib/visitor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    logVisitor({
      ip,
      userAgent: req.headers.get('user-agent') || 'unknown',
      country: req.headers.get('x-vercel-ip-country') || 'unknown',
      page: body.page || '/',
      referrer: body.referrer || '',
      locale: body.locale || 'en',
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  if (adminKey !== (process.env.ADMIN_KEY || 'wael-admin-2025')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const stats = getVisitorStats();
  const visitors = getVisitors(500);
  return NextResponse.json({ stats, visitors });
}
