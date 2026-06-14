'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Link2, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contacts = [
    { icon: MapPin, label: t('location'), href: null },
    { icon: Link2, label: t('linkedin'), href: 'https://linkedin.com/in/waelkablli' },
  ];

  return (
    <section id="contact" className="section-padding bg-[#2d185c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#ff6585] text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black text-white mb-3 ${isAr ? '' : 'font-heading'}`}>
            {t('title')}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 ${isAr ? '' : ''}`}>
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="space-y-5">
              {contacts.map(({ icon: Icon, label, href }) => (
                <div key={label} className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#ff325d]" />
                  </div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`text-white/80 hover:text-white text-sm pt-2 transition-colors ${isAr ? 'text-right' : ''}`}>
                      {label}
                    </a>
                  ) : (
                    <span className={`text-white/80 text-sm pt-2 ${isAr ? 'text-right' : ''}`}>{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-10">
              <p className={`text-white/40 text-sm mb-4 ${isAr ? 'text-right' : ''}`}>{t('orConnect')}</p>
              <div className={`flex gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                {[
                  { href: 'https://linkedin.com/in/waelkablli', label: 'LinkedIn', icon: 'in' },
                  { href: 'https://x.com/waelkabli', label: 'X', icon: '𝕏' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff325d] flex items-center justify-center text-white/70 hover:text-white font-bold text-sm transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                <CheckCircle size={48} className="text-[#ff325d]" />
                <h3 className={`text-white font-bold text-xl ${isAr ? '' : 'font-heading'}`}>{t('sent')}</h3>
                <p className="text-white/60">{t('sentDesc')}</p>
              </div>
            ) : status === 'error' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                <AlertCircle size={48} className="text-orange-400" />
                <h3 className={`text-white font-bold text-xl ${isAr ? '' : 'font-heading'}`}>
                  {isAr ? 'حدث خطأ' : 'Something went wrong'}
                </h3>
                <p className="text-white/60">
                  {isAr ? 'الرجاء المحاولة مرة أخرى أو التواصل مباشرة عبر LinkedIn.' : 'Please try again or reach out directly via LinkedIn.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
                  <input
                    type="text"
                    placeholder={t('name')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff325d] transition-colors text-sm ${isAr ? 'text-right' : ''}`}
                  />
                  <input
                    type="email"
                    placeholder={t('email')}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff325d] transition-colors text-sm ${isAr ? 'text-right' : ''}`}
                  />
                </div>
                <input
                  type="text"
                  placeholder={t('subject')}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff325d] transition-colors text-sm ${isAr ? 'text-right' : ''}`}
                />
                <textarea
                  placeholder={t('message')}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#ff325d] transition-colors text-sm resize-none ${isAr ? 'text-right' : ''}`}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#ff325d] text-white font-bold hover:bg-[#fe0035] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('sending')}
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('send')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
