import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';
import fs from 'fs';
import path from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ locale: string; slug: string }> };

function readImageAsDataUrl(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1).replace('jpg', 'jpeg');
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}

export default async function OgImage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as 'ar' | 'en');

  const isAr = locale === 'ar';
  const title = post?.title ?? (isAr ? 'وائل كابلي' : 'Wael A. Kabli');
  const tags = post?.tags?.slice(0, 2) ?? [];

  const profileSrc = readImageAsDataUrl(
    path.join(process.cwd(), 'public', 'images', 'wael-profile.jpg')
  );

  // If the post has a cover image, use it as the card background with a title overlay
  const coverPath = post?.coverImage
    ? path.join(process.cwd(), 'public', post.coverImage)
    : null;
  const coverSrc =
    coverPath && fs.existsSync(coverPath)
      ? readImageAsDataUrl(coverPath)
      : null;

  const fontSize =
    title.length <= 40 ? 60
    : title.length <= 70 ? 50
    : title.length <= 100 ? 42
    : 36;

  if (coverSrc) {
    // Layout: cover image left (2/3), branded panel right (1/3)
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            fontFamily: 'system-ui, sans-serif',
            background: '#1a0f38',
          }}
        >
          {/* Cover image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt=""
            style={{ width: 800, height: 630, objectFit: 'cover', objectPosition: 'center' }}
          />

          {/* Right branded panel */}
          <div
            style={{
              width: 400,
              height: '100%',
              background: 'linear-gradient(160deg, #2d185c 0%, #1a0f38 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px 36px',
            }}
          >
            {/* Site badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 50, padding: '5px 14px', width: 'fit-content' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff325d', display: 'flex' }} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17 }}>waelkabli.com</span>
            </div>

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#ffffff', lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                {title}
              </div>
              <div style={{ width: 50, height: 4, background: 'linear-gradient(90deg, #ff325d, #ff6585)', borderRadius: 3, display: 'flex' }} />
              {tags.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{ background: 'rgba(255,50,93,0.2)', borderRadius: 50, padding: '3px 12px', color: '#ff8fa3', fontSize: 15, border: '1px solid rgba(255,50,93,0.3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileSrc}
                alt="Wael A. Kabli"
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(255,50,93,0.5)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ color: '#ffffff', fontSize: 20, fontWeight: 700 }}>{isAr ? 'وائل كابلي' : 'Wael A. Kabli'}</span>
                <span style={{ color: 'rgba(255,101,133,0.85)', fontSize: 15 }}>{isAr ? 'رائد أعمال' : 'Entrepreneur'}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Text-only card for posts without a cover image
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2d185c 0%, #1a0f38 60%, #3b1070 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'rgba(255,50,93,0.12)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(65,35,132,0.4)', display: 'flex' }} />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 50, padding: '6px 18px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff325d', display: 'flex' }} />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20 }}>waelkabli.com</span>
          </div>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 10 }}>
              {tags.map((tag) => (
                <span key={tag} style={{ background: 'rgba(255,50,93,0.2)', borderRadius: 50, padding: '4px 14px', color: '#ff8fa3', fontSize: 18, border: '1px solid rgba(255,50,93,0.3)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, zIndex: 10, flex: 1, justifyContent: 'center' }}>
          <div style={{ fontSize, fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.5px', maxWidth: 900 }}>
            {title}
          </div>
          <div style={{ width: 80, height: 5, background: 'linear-gradient(90deg, #ff325d, #ff6585)', borderRadius: 3, display: 'flex' }} />
        </div>

        {/* Bottom: author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileSrc}
            alt="Wael A. Kabli"
            style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(255,50,93,0.5)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>{isAr ? 'وائل كابلي' : 'Wael A. Kabli'}</span>
            <span style={{ color: 'rgba(255,101,133,0.9)', fontSize: 18 }}>{isAr ? 'رائد أعمال ومبتكر في الصحة الرقمية' : 'Entrepreneur & Digital Health Pioneer'}</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
