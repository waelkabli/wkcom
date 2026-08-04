'use client';

import { useEffect, useState } from 'react';

const EMOJIS = ['👍', '❤️', '🔥', '💡'] as const;
type Emoji = (typeof EMOJIS)[number];

interface Props {
  slug: string;
  locale: 'ar' | 'en';
}

export default function ReactionBar({ slug, locale }: Props) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<Emoji | null>(null);
  const [busy, setBusy] = useState(false);
  const storageKey = `wk_reaction_${slug}`;
  const isAr = locale === 'ar';

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Emoji | null;
    if (stored && (EMOJIS as readonly string[]).includes(stored)) setSelected(stored);

    fetch(`/api/reactions/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(setCounts)
      .catch(() => {});
  }, [slug, storageKey]);

  const post = (emoji: Emoji, action: 'add' | 'remove') =>
    fetch(`/api/reactions/${encodeURIComponent(slug)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji, action }),
    });

  const handleClick = async (emoji: Emoji) => {
    if (busy) return;
    setBusy(true);
    const prev = selected;

    try {
      if (prev === emoji) {
        await post(emoji, 'remove');
        setCounts((c) => ({ ...c, [emoji]: Math.max(0, (c[emoji] ?? 1) - 1) }));
        setSelected(null);
        localStorage.removeItem(storageKey);
      } else {
        if (prev) {
          await post(prev, 'remove');
          setCounts((c) => ({ ...c, [prev]: Math.max(0, (c[prev] ?? 1) - 1) }));
        }
        await post(emoji, 'add');
        setCounts((c) => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }));
        setSelected(emoji);
        localStorage.setItem(storageKey, emoji);
      }
    } catch {
      setSelected(prev);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <span className="text-sm text-[#2d185c]/55 font-medium shrink-0">
        {isAr ? 'ردّ فعلك:' : 'React:'}
      </span>
      {EMOJIS.map((emoji) => {
        const active = selected === emoji;
        const count = counts[emoji] ?? 0;
        return (
          <button
            key={emoji}
            onClick={() => handleClick(emoji)}
            disabled={busy}
            aria-label={`React with ${emoji}`}
            aria-pressed={active}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
              'transition-all duration-150 select-none focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-[#ff325d]/50',
              active
                ? 'bg-[#ff325d] border-[#ff325d] text-white shadow-sm scale-105'
                : 'bg-white border-[#e8e4f5] text-[#2d185c] hover:border-[#ff325d] hover:bg-[#ff325d]/5',
              busy ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            <span>{emoji}</span>
            {count > 0 && (
              <span className={active ? 'text-white/90' : 'text-[#2d185c]/45 tabular-nums'}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
