import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Wael Kabli — Serial Entrepreneur & Digital Health Pioneer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ locale: string }> };

export default async function OgImage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const name    = isAr ? 'وائل كابلي' : 'Wael A. Kabli';
  const title   = isAr
    ? 'رائد أعمال تقني متسلسل • رائد الصحة الرقمية'
    : 'Serial Tech Entrepreneur  •  Digital Health Pioneer';
  const tagline = isAr
    ? 'رائد أعمال متسلسل | قائد مسك 2030 | مبتكر في الصحة الرقمية'
    : 'Misk 2030 Leader  |  Founder & CEO of Cura  |  Speaker & Advisor';
  const site = 'waelkabli.com';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2d185c 0%, #1a0f38 60%, #3b1070 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,50,93,0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(65,35,132,0.4)',
            display: 'flex',
          }}
        />

        {/* Left content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, zIndex: 10 }}>
          {/* Site badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 50,
              padding: '6px 18px',
              width: 'fit-content',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#ff325d',
                display: 'flex',
              }}
            />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18 }}>{site}</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: isAr ? 68 : 72,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            {name}
          </div>

          {/* Pink divider */}
          <div
            style={{
              width: 80,
              height: 5,
              background: 'linear-gradient(90deg, #ff325d, #ff6585)',
              borderRadius: 3,
              display: 'flex',
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,101,133,0.9)',
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Right: profile photo placeholder / avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 60,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #412384, #ff325d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid rgba(255,50,93,0.5)',
              fontSize: 80,
              color: 'white',
              fontWeight: 900,
            }}
          >
            WK
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
