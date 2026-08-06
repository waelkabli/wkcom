import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const TO_EMAIL = 'contact@waelkabli.com';
const FROM_EMAIL = 'noreply@waelkabli.com';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

type Comment = { id: string; slug: string; nick: string | null; content: string; created_at: string };
type ReactionLog = { slug: string; emoji: string; action: string; created_at: string };

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Riyadh',
  });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildEmail(comments: Comment[], reactions: ReactionLog[]): string {
  const totalComments = comments.length;
  const totalReactions = reactions.filter(r => r.action === 'add').length;

  const commentRows = comments.map(c => `
    <div class="item">
      <div class="item-meta">
        <span class="item-badge comment-badge">Comment</span>
        <span class="item-slug"><a href="https://waelkabli.com/en/blog/${escapeHtml(c.slug)}" style="color:#412384;">/blog/${escapeHtml(c.slug)}</a></span>
        <span class="item-time">${formatTime(c.created_at)}</span>
      </div>
      <div class="item-author">${c.nick ? escapeHtml(c.nick) : 'Anonymous'}</div>
      <div class="item-content">${escapeHtml(c.content.slice(0, 300))}${c.content.length > 300 ? '…' : ''}</div>
    </div>
  `).join('');

  // Group reactions by slug for summary
  const reactionsBySlug = new Map<string, Map<string, number>>();
  for (const r of reactions) {
    if (r.action !== 'add') continue;
    if (!reactionsBySlug.has(r.slug)) reactionsBySlug.set(r.slug, new Map());
    const emojis = reactionsBySlug.get(r.slug)!;
    emojis.set(r.emoji, (emojis.get(r.emoji) ?? 0) + 1);
  }

  const reactionRows = Array.from(reactionsBySlug.entries()).map(([slug, emojis]) => {
    const emojiSummary = Array.from(emojis.entries())
      .map(([e, n]) => `${e} ×${n}`)
      .join('  ');
    return `
      <div class="item">
        <div class="item-meta">
          <span class="item-badge reaction-badge">Reactions</span>
          <span class="item-slug"><a href="https://waelkabli.com/en/blog/${escapeHtml(slug)}" style="color:#412384;">/blog/${escapeHtml(slug)}</a></span>
        </div>
        <div class="item-content">${escapeHtml(emojiSummary)}</div>
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f7ff; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(45,24,92,0.08); }
    .header { background: linear-gradient(135deg, #2d185c 0%, #412384 100%); padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px; }
    .accent { display: inline-block; width: 40px; height: 4px; background: #ff325d; border-radius: 2px; margin-bottom: 12px; }
    .stats { display: flex; gap: 16px; padding: 24px 40px; background: #f8f7ff; border-bottom: 1px solid #e8e4f5; }
    .stat { flex: 1; text-align: center; padding: 16px; background: #fff; border-radius: 12px; border: 1px solid #e8e4f5; }
    .stat-num { font-size: 28px; font-weight: 800; color: #ff325d; }
    .stat-label { font-size: 12px; color: #2d185c80; margin-top: 4px; }
    .section { padding: 24px 40px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #412384; margin: 0 0 16px; }
    .item { margin-bottom: 16px; padding: 16px; background: #f8f7ff; border-radius: 12px; border-left: 3px solid #ff325d; }
    .item-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
    .item-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
    .comment-badge { background: #ff325d20; color: #ff325d; }
    .reaction-badge { background: #41238420; color: #412384; }
    .item-slug { font-size: 12px; color: #412384; }
    .item-time { font-size: 11px; color: #2d185c60; margin-left: auto; }
    .item-author { font-size: 13px; font-weight: 600; color: #2d185c; margin-bottom: 6px; }
    .item-content { font-size: 14px; color: #2d185c; line-height: 1.6; }
    .footer { background: #f8f7ff; padding: 20px 40px; text-align: center; font-size: 12px; color: #2d185c80; border-top: 1px solid #e8e4f5; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="accent"></div>
      <h1>Daily Activity Report</h1>
      <p>waelkabli.com — ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Riyadh' })}</p>
    </div>
    <div class="stats">
      <div class="stat">
        <div class="stat-num">${totalComments}</div>
        <div class="stat-label">New Comments</div>
      </div>
      <div class="stat">
        <div class="stat-num">${totalReactions}</div>
        <div class="stat-label">New Reactions</div>
      </div>
    </div>
    ${totalComments > 0 ? `
    <div class="section">
      <div class="section-title">New Comments</div>
      ${commentRows}
    </div>
    ` : ''}
    ${totalReactions > 0 ? `
    <div class="section" style="${totalComments > 0 ? 'border-top: 1px solid #e8e4f5;' : ''}">
      <div class="section-title">New Reactions</div>
      ${reactionRows}
    </div>
    ` : ''}
    <div class="footer">
      Sent automatically every morning by waelkabli.com
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [commentsResult, reactionsResult] = await Promise.all([
    supabase
      .from('comments')
      .select('id, slug, nick, content, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false }),
    supabase
      .from('reaction_logs')
      .select('slug, emoji, action, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false }),
  ]);

  const comments: Comment[] = commentsResult.data ?? [];
  const reactions: ReactionLog[] = reactionsResult.data ?? [];
  const newReactions = reactions.filter(r => r.action === 'add');

  if (comments.length === 0 && newReactions.length === 0) {
    return NextResponse.json({ sent: false, reason: 'No activity in last 24h' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const subject = `[waelkabli.com] Daily Report — ${comments.length} comment${comments.length !== 1 ? 's' : ''}, ${newReactions.length} reaction${newReactions.length !== 1 ? 's' : ''}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject,
    html: buildEmail(comments, reactions),
  });

  if (error) {
    console.error('Daily report email error:', error);
    return NextResponse.json({ error: 'Failed to send', detail: error }, { status: 500 });
  }

  return NextResponse.json({ sent: true, comments: comments.length, reactions: newReactions.length });
}
