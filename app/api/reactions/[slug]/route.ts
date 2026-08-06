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
    .from('reactions')
    .select('emoji, count')
    .eq('slug', slug);

  if (error) return NextResponse.json({}, { status: 500 });

  const counts: Record<string, number> = {};
  for (const row of data ?? []) counts[row.emoji] = row.count;

  return NextResponse.json(counts);
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  let body: { emoji?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const { emoji, action } = body;
  if (!emoji || !['add', 'remove'].includes(action ?? '')) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const ALLOWED = ['👍', '❤️', '🔥', '💡'];
  if (!ALLOWED.includes(emoji)) {
    return NextResponse.json({ error: 'Invalid emoji' }, { status: 400 });
  }

  const delta = action === 'add' ? 1 : -1;

  const { error } = await supabase.rpc('increment_reaction', {
    p_slug: slug,
    p_emoji: emoji,
    p_delta: delta,
  });

  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 });

  // Log event for daily digest (fire-and-forget)
  supabase.from('reaction_logs').insert({ slug, emoji, action }).then(() => {});

  return NextResponse.json({ ok: true });
}
