import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('comments')
    .select('id, nick, content, created_at')
    .eq('slug', slug)
    .eq('approved', true)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  let body: { nick?: string; content?: string; trap?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  // Honeypot: bots fill this, humans don't
  if (body.trap) return NextResponse.json({ ok: true });

  const content = body.content?.trim() ?? '';
  if (content.length < 2 || content.length > 2000) {
    return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
  }

  const nick = body.nick?.trim().slice(0, 100) || null;

  const { error } = await supabase
    .from('comments')
    .insert({ slug, nick, content });

  if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 });

  return NextResponse.json({ ok: true });
}
