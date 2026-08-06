'use client';
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: 'POST' })
      .then(r => r.json())
      .then(d => setCount(d.count))
      .catch(() => {});
  }, [slug]);

  if (count === null) return null;

  return (
    <span className="flex items-center gap-1 text-[#2d185c]/50">
      <Eye size={13} />
      {count.toLocaleString()}
    </span>
  );
}
