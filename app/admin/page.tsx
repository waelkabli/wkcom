'use client';

import { useState, useEffect } from 'react';
import { Users, Globe, FileText, TrendingUp, Eye, RefreshCw } from 'lucide-react';

interface Stats {
  total: number;
  today: number;
  byLocale: { locale: string; count: number }[];
  byPage: { page: string; count: number }[];
  byCountry: { country: string; count: number }[];
}

interface Visitor {
  timestamp: string;
  ip: string;
  userAgent: string;
  country: string;
  page: string;
  referrer: string;
  locale: string;
}

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async (adminKey: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/visitors', {
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setStats(data.stats);
      setVisitors(data.visitors);
      setAuthed(true);
    } catch {
      setError('Invalid admin key');
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm border border-[#e8e4f5] shadow-lg">
          <h1 className="font-heading font-black text-2xl text-[#2d185c] mb-2">Admin Access</h1>
          <p className="text-[#2d185c]/60 text-sm mb-6">Visitor Log Dashboard</p>
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load(key)}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e4f5] text-[#2d185c] focus:outline-none focus:border-[#ff325d] mb-3 text-sm"
          />
          {error && <p className="text-[#ff325d] text-sm mb-3">{error}</p>}
          <button
            onClick={() => load(key)}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#ff325d] text-white font-bold hover:bg-[#fe0035] transition-colors"
          >
            {loading ? 'Checking...' : 'Access Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-black text-2xl text-[#2d185c]">Visitor Log</h1>
            <p className="text-[#2d185c]/60 text-sm">waelkabli.com — Analytics Dashboard</p>
          </div>
          <button onClick={() => load(key)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#e8e4f5] text-[#2d185c] text-sm hover:border-[#ff325d]/30 transition-colors">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: 'Total Visits', value: stats.total },
              { icon: Eye, label: 'Today', value: stats.today },
              { icon: Globe, label: 'Locales', value: stats.byLocale.length },
              { icon: FileText, label: 'Pages Tracked', value: stats.byPage.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-[#e8e4f5]">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-[#ff325d]" />
                  <span className="text-[#2d185c]/60 text-xs">{label}</span>
                </div>
                <div className="font-heading font-black text-2xl text-[#2d185c]">{value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* By locale */}
          {stats && (
            <div className="bg-white rounded-2xl p-5 border border-[#e8e4f5]">
              <h3 className="font-bold text-[#2d185c] text-sm mb-4">By Language</h3>
              {stats.byLocale.map(({ locale, count }) => (
                <div key={locale} className="flex items-center justify-between mb-2">
                  <span className="text-[#2d185c]/70 text-sm uppercase font-medium">{locale}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[#f8f7ff] overflow-hidden">
                      <div className="h-full bg-[#ff325d] rounded-full" style={{ width: `${Math.round((count / stats.total) * 100)}%` }} />
                    </div>
                    <span className="text-[#2d185c]/60 text-xs w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* By country */}
          {stats && (
            <div className="bg-white rounded-2xl p-5 border border-[#e8e4f5]">
              <h3 className="font-bold text-[#2d185c] text-sm mb-4">By Country</h3>
              {stats.byCountry.slice(0, 6).map(({ country, count }) => (
                <div key={country} className="flex items-center justify-between mb-2">
                  <span className="text-[#2d185c]/70 text-sm">{country}</span>
                  <span className="text-[#2d185c]/60 text-xs">{count}</span>
                </div>
              ))}
            </div>
          )}

          {/* By page */}
          {stats && (
            <div className="bg-white rounded-2xl p-5 border border-[#e8e4f5]">
              <h3 className="font-bold text-[#2d185c] text-sm mb-4">Top Pages</h3>
              {stats.byPage.slice(0, 6).map(({ page, count }) => (
                <div key={page} className="flex items-center justify-between mb-2">
                  <span className="text-[#2d185c]/70 text-xs truncate max-w-[140px]">{page}</span>
                  <span className="text-[#2d185c]/60 text-xs">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visitor log table */}
        <div className="bg-white rounded-2xl border border-[#e8e4f5] overflow-hidden">
          <div className="p-5 border-b border-[#e8e4f5]">
            <h3 className="font-bold text-[#2d185c] text-sm">Recent Visitors</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e4f5] bg-[#f8f7ff]">
                  {['Time', 'IP', 'Country', 'Page', 'Locale', 'Referrer'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[#2d185c]/50 text-xs font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visitors.slice(0, 50).map((v, i) => (
                  <tr key={i} className="border-b border-[#f8f7ff] hover:bg-[#f8f7ff] transition-colors">
                    <td className="px-4 py-2.5 text-[#2d185c]/60 text-xs whitespace-nowrap">{new Date(v.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-[#2d185c]/70 text-xs font-mono">{v.ip}</td>
                    <td className="px-4 py-2.5 text-[#2d185c]/70 text-xs">{v.country}</td>
                    <td className="px-4 py-2.5 text-[#ff325d] text-xs max-w-[140px] truncate">{v.page}</td>
                    <td className="px-4 py-2.5 text-xs uppercase font-medium text-[#412384]">{v.locale}</td>
                    <td className="px-4 py-2.5 text-[#2d185c]/40 text-xs max-w-[120px] truncate">{v.referrer || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visitors.length === 0 && (
              <div className="py-16 text-center text-[#2d185c]/40 text-sm">No visitor data yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
