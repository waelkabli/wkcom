'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface Comment {
  id: string;
  nick: string | null;
  content: string;
  created_at: string;
}

interface Props {
  slug: string;
  locale: 'ar' | 'en';
}

const L = {
  ar: {
    heading: 'التعليقات',
    count: (n: number) => `(${n})`,
    empty: 'لا توجد تعليقات بعد. كن أول من يعلّق!',
    namePlaceholder: 'الاسم (اختياري)',
    messagePlaceholder: 'اكتب تعليقك...',
    leaveComment: 'اترك تعليقاً',
    submit: 'إرسال',
    submitting: 'جاري الإرسال...',
    successTitle: 'شكراً على تعليقك!',
    successBody: 'سيظهر تعليقك بعد المراجعة.',
    anonymous: 'زائر',
    error: 'حدث خطأ. حاول مرة أخرى.',
  },
  en: {
    heading: 'Comments',
    count: (n: number) => `(${n})`,
    empty: 'No comments yet. Be the first!',
    namePlaceholder: 'Name (optional)',
    messagePlaceholder: 'Write a comment…',
    leaveComment: 'Leave a comment',
    submit: 'Submit',
    submitting: 'Submitting…',
    successTitle: 'Thanks for your comment!',
    successBody: 'It will appear after review.',
    anonymous: 'Anonymous',
    error: 'Something went wrong. Please try again.',
  },
};

export default function BlogComments({ slug, locale }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [nick, setNick] = useState('');
  const [content, setContent] = useState('');
  const [trap, setTrap] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = L[locale];
  const isAr = locale === 'ar';

  useEffect(() => {
    fetch(`/api/comments/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(slug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nick, content, trap }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setNick('');
      setContent('');
    } catch {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const initials = (name: string | null) =>
    name?.trim().charAt(0).toUpperCase() ?? '?';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      {/* Heading */}
      <h3
        className={`flex items-center gap-2 text-lg font-bold text-[#2d185c] mb-6 ${
          isAr ? 'flex-row-reverse' : 'font-heading'
        }`}
      >
        <MessageCircle size={20} className="text-[#ff325d] shrink-0" />
        {t.heading}
        {comments.length > 0 && (
          <span className="text-sm font-normal text-[#2d185c]/40">
            {t.count(comments.length)}
          </span>
        )}
      </h3>

      {/* Comment list */}
      {loading ? (
        <div className="space-y-4 mb-8">
          {[0, 1].map((i) => (
            <div key={i} className={`flex gap-3 animate-pulse ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-[#e8e4f5] shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-[#e8e4f5] rounded w-24" />
                <div className="h-4 bg-[#e8e4f5] rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div key={c.id} className={`flex gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-[#412384] text-white flex items-center justify-center text-sm font-bold shrink-0 select-none">
                {initials(c.nick)}
              </div>
              <div
                className={`flex-1 bg-white rounded-xl px-4 py-3 border border-[#e8e4f5] ${
                  isAr ? 'text-right' : ''
                }`}
              >
                <div
                  className={`flex items-center gap-2 mb-1 ${isAr ? 'flex-row-reverse' : ''}`}
                >
                  <span className="font-semibold text-[#2d185c] text-sm">
                    {c.nick || t.anonymous}
                  </span>
                  <span className="text-[#2d185c]/35 text-xs">{formatDate(c.created_at)}</span>
                </div>
                <p className="text-[#2d185c]/75 text-sm leading-relaxed whitespace-pre-wrap">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-[#2d185c]/40 text-sm mb-8 ${isAr ? 'text-right' : ''}`}>
          {t.empty}
        </p>
      )}

      {/* Comment form */}
      <div className="border-t border-[#e8e4f5] pt-6">
        <p
          className={`text-xs font-semibold text-[#2d185c]/50 uppercase tracking-wide mb-4 ${
            isAr ? 'text-right' : ''
          }`}
        >
          {t.leaveComment}
        </p>

        {submitted ? (
          <div
            className={`bg-[#ff325d]/5 border border-[#ff325d]/20 rounded-xl p-4 ${
              isAr ? 'text-right' : ''
            }`}
          >
            <p className="font-semibold text-[#ff325d] text-sm">{t.successTitle}</p>
            <p className="text-[#2d185c]/60 text-sm mt-0.5">{t.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Honeypot — hidden from humans, bots fill it */}
            <input
              type="text"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              name="website"
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder={t.namePlaceholder}
              maxLength={100}
              className={`w-full px-4 py-2.5 rounded-xl border border-[#e8e4f5] bg-white text-[#2d185c] text-sm placeholder:text-[#2d185c]/30 focus:outline-none focus:border-[#ff325d] transition-colors ${
                isAr ? 'text-right' : ''
              }`}
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.messagePlaceholder}
              required
              rows={4}
              maxLength={2000}
              className={`w-full px-4 py-2.5 rounded-xl border border-[#e8e4f5] bg-white text-[#2d185c] text-sm placeholder:text-[#2d185c]/30 focus:outline-none focus:border-[#ff325d] transition-colors resize-none ${
                isAr ? 'text-right' : ''
              }`}
            />

            {error && (
              <p className={`text-[#ff325d] text-xs ${isAr ? 'text-right' : ''}`}>{error}</p>
            )}

            <div className={`flex ${isAr ? 'justify-start' : 'justify-end'}`}>
              <button
                type="submit"
                disabled={!content.trim() || submitting}
                className={`flex items-center gap-2 px-5 py-2.5 bg-[#ff325d] text-white text-sm font-semibold rounded-xl hover:bg-[#e02050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isAr ? 'flex-row-reverse' : ''
                }`}
              >
                <Send size={14} className={isAr ? 'rotate-180' : ''} />
                {submitting ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
