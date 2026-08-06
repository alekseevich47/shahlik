import React, { useEffect, useRef, useState } from 'react';
import type { Banner } from '../types';

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const sorted = [...banners].sort((a, b) => a.order - b.order);
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (i: number) => setIdx((i + sorted.length) % sorted.length);

  useEffect(() => {
    timer.current = setInterval(() => setIdx(c => (c + 1) % sorted.length), 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [sorted.length]);

  if (!sorted.length) return null;

  return (
    <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: 300 }}>
      {/* Slides */}
      {sorted.map((b, i) => (
        <div
          key={b.id}
          style={{
            position: 'absolute', inset: 0,
            transition: 'opacity 0.7s ease',
            opacity: i === idx ? 1 : 0,
            pointerEvents: i === idx ? 'auto' : 'none',
          }}
        >
          <img
            src={b.image} alt={b.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg,rgba(13,8,3,0.84) 35%,rgba(13,8,3,0.05) 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px',
          }}>
            <h2 style={{ fontFamily: 'Russo One, sans-serif', fontSize: 34, color: '#F2E8D0', marginBottom: 8, lineHeight: 1.2 }}>
              {b.title}
            </h2>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#F07200' }}>{b.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {sorted.map((_, i) => (
          <button
            key={i} onClick={() => go(i)}
            style={{
              border: 'none', cursor: 'pointer', borderRadius: 4, padding: 0,
              width: i === idx ? 22 : 8, height: 8,
              background: i === idx ? '#F07200' : 'rgba(255,255,255,0.35)',
              transition: 'width 0.35s, background 0.35s',
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      {(['prev', 'next'] as const).map(dir => (
        <button
          key={dir}
          onClick={() => go(idx + (dir === 'next' ? 1 : -1))}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            [dir === 'prev' ? 'left' : 'right']: 12,
            width: 38, height: 38, borderRadius: 19,
            background: 'rgba(13,8,3,0.55)',
            border: '1px solid rgba(240,114,0,0.35)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d={dir === 'prev' ? 'M9 2L4 7l5 5' : 'M5 2l5 5-5 5'}
              stroke="#F07200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
