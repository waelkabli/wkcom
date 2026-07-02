'use client';

import { useState } from 'react';
import { Play, Mic, Tv, Newspaper, Share2, ExternalLink } from 'lucide-react';
import type { MediaItem } from '@/lib/media';

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
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

  const inner = (
    <div className="group rounded-2xl overflow-hidden border border-[#e8e4f5] bg-white hover:shadow-lg transition-all h-full flex flex-col">
      <div className="relative aspect-video bg-[#2d185c] overflow-hidden flex-shrink-0">
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
                onClick={() => ytId && setPlaying(true)}
                className="w-14 h-14 rounded-full bg-[#ff325d] flex items-center justify-center hover:scale-110 hover:bg-[#fe0035] transition-all shadow-lg shadow-[#ff325d]/40"
              >
                <Play size={20} className="text-white ms-1" fill="white" />
              </button>
            </div>
            <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium`}>
              {item.platform}
            </div>
          </>
        )}
      </div>
      <div className={`p-4 flex flex-col flex-1 ${isAr ? 'text-right' : ''}`}>
        <h3 className={`font-bold text-[#2d185c] text-sm mb-1 leading-snug ${isAr ? '' : 'font-heading'}`}>{item.title}</h3>
        {item.excerpt && <p className="text-[#2d185c]/60 text-xs leading-relaxed flex-1">{item.excerpt}</p>}
        {item.mediaUrl && (
          <a
            href={item.mediaUrl}
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

  return inner;
}

function IconCard({ item, isAr }: { item: MediaItem; isAr: boolean }) {
  const Icon = TYPE_ICONS[item.mediaType] || Newspaper;
  const actionLabel = ACTION_LABELS[item.mediaType]?.[isAr ? 'ar' : 'en'] ?? (isAr ? 'عرض' : 'View');

  const content = (
    <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
      <div className="w-10 h-10 rounded-xl bg-[#ff325d]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff325d] transition-colors">
        <Icon size={18} className="text-[#ff325d] group-hover:text-white transition-colors" />
      </div>
      <div className={`flex-1 min-w-0 ${isAr ? 'text-right' : ''}`}>
        <div className="text-[#ff325d] text-xs font-semibold mb-0.5">{item.platform}</div>
        <div className="font-semibold text-[#2d185c] text-sm leading-snug line-clamp-2">{item.title}</div>
        {item.excerpt && (
          <p className="text-[#2d185c]/60 text-xs leading-relaxed mt-1 line-clamp-2">{item.excerpt}</p>
        )}
        {item.date && (
          <div className="text-[#2d185c]/40 text-xs mt-1">{new Date(item.date).getFullYear()}</div>
        )}
        {item.mediaUrl && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-[#ff325d] text-xs font-medium group-hover:underline">
              {actionLabel}
              <ExternalLink size={10} />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const className = "group bg-white rounded-2xl p-4 border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-md transition-all block";

  return item.mediaUrl ? (
    <a href={item.mediaUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
