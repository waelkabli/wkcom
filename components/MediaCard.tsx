'use client';

import { useState } from 'react';
import { Play, Mic, Tv, Newspaper, Share2, ExternalLink, Calendar } from 'lucide-react';
import type { MediaItem } from '@/lib/media';

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

function formatDate(dateStr: string, isAr: boolean): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short', year: 'numeric' });
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  podcast: Mic,
  tv: Tv,
  press: Newspaper,
  social: Share2,
};

const ACTION_LABELS: Record<string, { ar: string; en: string }> = {
  podcast: { ar: 'الاستماع الآن', en: 'Listen Now' },
  video: { ar: 'مشاهدة على يوتيوب', en: 'Watch on YouTube' },
  tv: { ar: 'مشاهدة الآن', en: 'Watch Now' },
  press: { ar: 'قراءة الآن', en: 'Read Now' },
  social: { ar: 'عرض', en: 'View' },
};

function DateBadge({ date, isAr }: { date: string; isAr: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[#2d185c]/40 text-xs ${isAr ? 'flex-row-reverse' : ''}`}>
      <Calendar size={10} />
      {formatDate(date, isAr)}
    </span>
  );
}

export default function MediaCard({ item, isAr }: { item: MediaItem; isAr: boolean }) {
  if (item.mediaType === 'video') {
    return <VideoCard item={item} isAr={isAr} />;
  }
  return <IconCard item={item} isAr={isAr} />;
}

function VideoCard({ item, isAr }: { item: MediaItem; isAr: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ytId = extractYouTubeId(item.mediaUrl);
  const thumbnail = item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '');
  const actionLabel = ACTION_LABELS.video[isAr ? 'ar' : 'en'];
  const href = item.mediaUrl || '#';

  return (
    <div className="group rounded-2xl overflow-hidden border border-[#e8e4f5] bg-white hover:shadow-lg transition-all h-full flex flex-col">
      {/* Thumbnail — clicking outside play button opens external link */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video bg-[#2d185c] overflow-hidden flex-shrink-0 block"
      >
        {playing && ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {thumbnail && (
              <img
                src={thumbnail}
                alt={item.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            )}
            <div className="absolute inset-0 bg-[#2d185c]/40 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (ytId) setPlaying(true);
                }}
                className="w-14 h-14 rounded-full bg-[#ff325d] flex items-center justify-center hover:scale-110 hover:bg-[#fe0035] transition-all shadow-lg shadow-[#ff325d]/40"
              >
                <Play size={20} className="text-white ms-1" fill="white" />
              </button>
            </div>
            {/* Platform badge */}
            <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium`}>
              {item.platform}
            </div>
            {/* Date badge */}
            <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} px-2.5 py-1 rounded-full bg-black/60 text-white/80 text-xs flex items-center gap-1`}>
              <Calendar size={10} />
              {formatDate(item.date, isAr)}
            </div>
          </>
        )}
      </a>

      {/* Info */}
      <div className={`p-4 flex flex-col flex-1 ${isAr ? 'text-right' : ''}`}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-bold text-[#2d185c] text-sm mb-1 leading-snug hover:text-[#ff325d] transition-colors ${isAr ? '' : 'font-heading'}`}
        >
          {item.title}
        </a>
        {item.excerpt && <p className="text-[#2d185c]/60 text-xs leading-relaxed flex-1">{item.excerpt}</p>}
        {item.mediaUrl && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-[#ff325d] text-xs font-medium hover:underline"
          >
            <Play size={11} />
            {actionLabel}
          </a>
        )}
      </div>
    </div>
  );
}

function IconCard({ item, isAr }: { item: MediaItem; isAr: boolean }) {
  const Icon = TYPE_ICONS[item.mediaType] || Newspaper;
  const actionLabel = ACTION_LABELS[item.mediaType]?.[isAr ? 'ar' : 'en'] ?? (isAr ? 'عرض' : 'View');
  const href = item.mediaUrl || undefined;

  const inner = (
    <div className="group rounded-2xl overflow-hidden border border-[#e8e4f5] bg-white hover:shadow-md hover:border-[#ff325d]/30 transition-all h-full flex flex-col">
      {item.thumbnail ? (
        /* Thumbnail banner */
        <div className="relative aspect-video overflow-hidden flex-shrink-0 bg-[#2d185c]">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium`}>
            {item.platform}
          </div>
          <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} px-2.5 py-1 rounded-full bg-black/60 text-white/80 text-xs flex items-center gap-1`}>
            <Calendar size={10} />
            {formatDate(item.date, isAr)}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon size={20} className="text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4 pb-2 flex-shrink-0">
          <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-[#ff325d]/10 flex items-center justify-center group-hover:bg-[#ff325d] transition-colors">
              <Icon size={18} className="text-[#ff325d] group-hover:text-white transition-colors" />
            </div>
            <DateBadge date={item.date} isAr={isAr} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`px-4 pb-4 flex flex-col flex-1 ${item.thumbnail ? 'pt-3' : 'pt-0'} ${isAr ? 'text-right' : ''}`}>
        <div className="text-[#ff325d] text-xs font-semibold mb-1">{item.platform}</div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#2d185c] text-sm leading-snug line-clamp-2 flex-1 hover:text-[#ff325d] transition-colors"
          >
            {item.title}
          </a>
        ) : (
          <div className="font-semibold text-[#2d185c] text-sm leading-snug line-clamp-2 flex-1">{item.title}</div>
        )}
        {item.excerpt && (
          <p className="text-[#2d185c]/60 text-xs leading-relaxed mt-1 line-clamp-2">{item.excerpt}</p>
        )}
        <div className={`flex items-center justify-between mt-3 ${isAr ? 'flex-row-reverse' : ''}`}>
          {item.thumbnail && <DateBadge date={item.date} isAr={isAr} />}
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#ff325d] text-xs font-medium hover:underline"
            >
              {actionLabel}
              <ExternalLink size={10} />
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  ) : (
    <div className="block h-full">{inner}</div>
  );
}
