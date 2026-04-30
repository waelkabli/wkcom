'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer,
        locale,
      }),
    }).catch(() => {});
  }, [pathname, locale]);

  return null;
}
