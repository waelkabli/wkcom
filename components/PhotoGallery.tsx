'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { trackEvent } from './AnalyticsTracker';

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
}

function getGridClass(count: number) {
  if (count === 1) return 'grid-cols-1';
  if (count === 3) return 'grid-cols-2 sm:grid-cols-3';
  return 'grid-cols-2';
}

export default function PhotoGallery({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => {
    setLightboxIndex(index);
    trackEvent('gallery_open', { image_index: String(index) });
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      const next = (i - 1 + images.length) % images.length;
      trackEvent('gallery_navigate', { direction: 'prev', image_index: String(next) });
      return next;
    });
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      const next = (i + 1) % images.length;
      trackEvent('gallery_navigate', { direction: 'next', image_index: String(next) });
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  const gridClass = getGridClass(images.length);

  return (
    <>
      <div className={`grid ${gridClass} gap-2 my-6 rounded-xl overflow-hidden`}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            aria-label={`View photo: ${img.alt}`}
            className={`relative aspect-[4/3] overflow-hidden group cursor-zoom-in${images.length === 3 && i === 2 ? ' col-span-2 sm:col-span-1' : ''}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={28} />
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative mx-16 sm:mx-24 my-16"
            style={{ width: 'calc(100vw - 8rem)', height: 'calc(100vh - 8rem)', maxWidth: '1024px', maxHeight: '80vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Counter + dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/50 text-sm tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </span>
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); open(i); }}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${i === lightboxIndex ? 'bg-white scale-125' : 'bg-white/35 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
