'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Play, Newspaper, Tv, Mic } from 'lucide-react';

export default function Media() {
  const t = useTranslations('media');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const videos = t.raw('videos') as Array<{
    title: string; description: string; url: string; thumbnail: string; source: string;
  }>;
  const press = t.raw('press') as Array<{
    title: string; publication: string; year: string; type: string;
  }>;

  const pressIcons: Record<string, React.ElementType> = {
    magazine: Newspaper,
    speaking: Mic,
    tv: Tv,
  };

  return (
    <section id="media" className="section-padding bg-[#f8f7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-[#2d185c] mb-3 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
          <p className="text-[#2d185c]/60 text-lg">{t('subtitle')}</p>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} isAr={isAr} />
          ))}
        </div>

        {/* Press */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {press.map((item, i) => {
            const Icon = pressIcons[item.type] || Newspaper;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-5 border border-[#e8e4f5] hover:border-[#ff325d]/30 hover:shadow-md transition-all"
              >
                <div className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#ff325d]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff325d] transition-colors">
                    <Icon size={18} className="text-[#ff325d] group-hover:text-white transition-colors" />
                  </div>
                  <div className={isAr ? 'text-right' : ''}>
                    <div className="font-semibold text-[#2d185c] text-sm leading-snug">{item.title}</div>
                    <div className="text-[#ff325d] text-xs font-medium mt-0.5">{item.publication}</div>
                    <div className="text-[#2d185c]/50 text-xs mt-0.5">{item.year}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, isAr }: {
  video: { title: string; description: string; url: string; thumbnail: string; source: string };
  isAr: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const videoId = video.url.match(/[?&]v=([^&]+)/)?.[1] || '';

  return (
    <div className="group rounded-2xl overflow-hidden border border-[#e8e4f5] bg-white hover:shadow-lg transition-all">
      {/* Thumbnail / Player */}
      <div className="relative aspect-video bg-[#2d185c] overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#2d185c]/40 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                className="w-16 h-16 rounded-full bg-[#ff325d] flex items-center justify-center hover:scale-110 hover:bg-[#fe0035] transition-all shadow-lg shadow-[#ff325d]/40"
              >
                <Play size={24} className="text-white ms-1" fill="white" />
              </button>
            </div>
            {/* Source badge */}
            <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium`}>
              {video.source}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className={`p-5 ${isAr ? 'text-right' : ''}`}>
        <h3 className={`font-bold text-[#2d185c] mb-1 ${isAr ? '' : 'font-heading'}`}>{video.title}</h3>
        <p className="text-[#2d185c]/65 text-sm leading-relaxed">{video.description}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-[#ff325d] text-sm font-medium hover:underline"
        >
          <Play size={13} />
          {isAr ? 'مشاهدة على يوتيوب' : 'Watch on YouTube'}
        </a>
      </div>
    </div>
  );
}
