import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const { data } = await supabase
    .from('page_views')
    .select('count')
    .eq('slug', slug)
    .single();
  return NextResponse.json({ count: data?.count ?? 0 });
}

export async function POST(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const { data, error } = await supabase.rpc('increment_page_view', { p_slug: slug });
  if (error) return NextResponse.json({ count: 0 }, { status: 500 });
  return NextResponse.json({ count: data });
}
