import { Lock, Download } from 'lucide-react';

interface Photo {
  src: string;
  labelEn: string;
  labelAr: string;
  filename: string;
}

const PHOTOS: Photo[] = [
  {
    src: '/images/wael-profile.jpg',
    labelEn: 'Professional Headshot',
    labelAr: 'صورة احترافية',
    filename: 'wael-kabli-headshot.jpg',
  },
  {
    src: '/images/wael-avatar.jpg',
    labelEn: 'Avatar',
    labelAr: 'الصورة الرمزية',
    filename: 'wael-kabli-avatar.jpg',
  },
];

export default function MediaKit({ isAr }: { isAr: boolean }) {
  return (
    <section className="max-w-4xl mx-auto px-4 pt-16 pb-12">
      <div className={`mb-8 ${isAr ? 'text-right' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff325d]/10 text-[#ff325d] text-sm font-semibold mb-4">
          <Lock size={13} />
          {isAr ? 'حزمة الإعلام' : 'Media Kit'}
        </div>
        <h2 className={`text-2xl font-black text-[#2d185c] mb-2 ${isAr ? '' : 'font-heading'}`}>
          {isAr ? 'الصور والملفات الإعلامية' : 'Photos & Press Assets'}
        </h2>
        <p className="text-[#2d185c]/60 text-sm">
          {isAr
            ? 'للاستخدام الصحفي والتحريري فقط'
            : 'For press and editorial use only'}
        </p>
      </div>

      {/* Permission notice */}
      <div className={`flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
        <Lock size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 leading-relaxed">
          <span className="font-semibold">
            {isAr ? 'تنبيه: ' : 'Permission required: '}
          </span>
          {isAr
            ? 'لا يجوز استخدام هذه الصور إلا بإذن خطي صريح من وائل كابلي. '
            : 'These images may only be used with explicit written permission from Wael Kabli. '}
          <a
            href="mailto:waelkabli@gmail.com"
            className="underline hover:text-amber-900 font-medium"
          >
            {isAr ? 'تواصل للحصول على الإذن' : 'Contact to request permission'}
          </a>
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PHOTOS.map((photo) => (
          <div key={photo.src} className="bg-white rounded-2xl border border-[#e8e4f5] overflow-hidden hover:shadow-md transition-all">
            <div className="aspect-square bg-[#f8f7ff] flex items-center justify-center overflow-hidden">
              <img
                src={photo.src}
                alt={isAr ? photo.labelAr : photo.labelEn}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className={`p-4 flex items-center justify-between gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className={isAr ? 'text-right' : ''}>
                <div className="font-semibold text-[#2d185c] text-sm">
                  {isAr ? photo.labelAr : photo.labelEn}
                </div>
                <div className="text-[#2d185c]/40 text-xs mt-0.5">{photo.filename}</div>
              </div>
              <a
                href={photo.src}
                download={photo.filename}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2d185c] text-white text-xs font-medium hover:bg-[#ff325d] transition-colors flex-shrink-0"
              >
                <Download size={12} />
                {isAr ? 'تحميل' : 'Download'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
