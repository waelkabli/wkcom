'use client';

import { useState } from 'react';
import MediaCard from './MediaCard';
import type { MediaItem, MediaType } from '@/lib/media';

type FilterType = MediaType | 'all';

interface Filter {
  id: FilterType;
  labelEn: string;
  labelAr: string;
}

const FILTERS: Filter[] = [
  { id: 'all', labelEn: 'All', labelAr: 'الكل' },
  { id: 'video', labelEn: 'Video', labelAr: 'فيديو' },
  { id: 'podcast', labelEn: 'Podcasts', labelAr: 'بودكاست' },
  { id: 'tv', labelEn: 'TV / News', labelAr: 'تلفزيون / أخبار' },
  { id: 'press', labelEn: 'Press', labelAr: 'صحافة' },
  { id: 'social', labelEn: 'Social', labelAr: 'التواصل الاجتماعي' },
];

export default function MediaGrid({ items, isAr }: { items: MediaItem[]; isAr: boolean }) {
  const [active, setActive] = useState<FilterType>('all');

  const filtered = active === 'all' ? items : items.filter((i) => i.mediaType === active);

  return (
    <div>
      {/* Filter bar */}
      <div className={`flex flex-wrap gap-2 mb-8 ${isAr ? 'justify-end' : ''}`}>
        {FILTERS.map((f) => {
          const count = f.id === 'all' ? items.length : items.filter((i) => i.mediaType === f.id).length;
          if (count === 0 && f.id !== 'all') return null;
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                active === f.id
                  ? 'bg-[#ff325d] text-white border-[#ff325d]'
                  : 'bg-white text-[#2d185c]/70 border-[#e8e4f5] hover:border-[#ff325d]/50 hover:text-[#ff325d]'
              }`}
            >
              {isAr ? f.labelAr : f.labelEn}
              <span className={`ms-1.5 text-xs ${active === f.id ? 'text-white/70' : 'text-[#2d185c]/40'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className={`text-[#2d185c]/50 text-center py-12 ${isAr ? 'text-right' : ''}`}>
          {isAr ? 'لا توجد عناصر.' : 'No items found.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <MediaCard key={item.slug} item={item} isAr={isAr} />
          ))}
        </div>
      )}
    </div>
  );
}
