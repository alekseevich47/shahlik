import React, { useEffect, useRef, useState } from 'react';
import type { DeliveryMode, CartItem, Page } from '../types';
import logoImg from '../imports/_____________.png';

interface Props {
  deliveryMode: DeliveryMode;
  onDeliveryChange: (m: DeliveryMode) => void;
  cart: CartItem[];
  categories: { id: string; name: string; order: number }[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
  menuSectionTop: number;
  onCartOpen: () => void;
  onNav: (p: Page) => void;
}

export default function Header({
  deliveryMode, onDeliveryChange, cart,
  categories, activeCategory, onCategoryClick,
  menuSectionTop, onCartOpen, onNav,
}: Props) {
  const [scrollY, setScrollY] = useState(0);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll active chip into view
  useEffect(() => {
    if (!catRef.current) return;
    const el = catRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    el?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  }, [activeCategory]);

  const glassMode = scrollY > 40;
  const menuMode  = menuSectionTop > 0 && scrollY >= menuSectionTop - 90;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const sortedCats = [...categories].sort((a, b) => a.order - b.order);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        background: glassMode ? 'rgba(13,8,3,0.62)' : 'transparent',
        backdropFilter: glassMode ? 'blur(22px) saturate(170%)' : 'none',
        WebkitBackdropFilter: glassMode ? 'blur(22px) saturate(170%)' : 'none',
        borderBottom: glassMode ? '1px solid rgba(240,114,0,0.18)' : '1px solid transparent',
      }}
    >
      {/* Main bar */}
      <div style={{ display: 'flex', alignItems: 'center', height: 64, padding: '0 20px', gap: 16 }}>

        {/* LEFT */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          {menuMode ? (
            <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <img src={logoImg} alt="Шашлыковский" style={{ height: 42, objectFit: 'contain' }} />
            </button>
          ) : (
            <DeliveryToggle mode={deliveryMode} onChange={onDeliveryChange} />
          )}
        </div>

        {/* CENTER logo */}
        {!menuMode && (
          <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img src={logoImg} alt="Шашлыковский" style={{ height: 50, objectFit: 'contain' }} />
          </button>
        )}

        {/* RIGHT */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
          {!menuMode && (
            <button
              onClick={onCartOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', color: totalItems > 0 ? '#F07200' : '#A08060', transition: 'color 0.2s' }}
            >
              <ShawarmaCartIcon />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -6,
                  background: '#F07200', color: '#fff',
                  width: 18, height: 18, borderRadius: 9,
                  fontSize: 10, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Category strip */}
      {menuMode && (
        <div
          ref={catRef}
          className="cats-strip"
          style={{ padding: '0 20px 10px', borderTop: '1px solid rgba(240,114,0,0.12)' }}
        >
          {sortedCats.map(cat => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                data-active={active}
                onClick={() => onCategoryClick(cat.id)}
                style={{
                  flexShrink: 0, padding: '6px 16px',
                  borderRadius: 20, fontSize: 13, fontWeight: 700,
                  fontFamily: 'Nunito, sans-serif',
                  cursor: 'pointer',
                  transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                  background: active ? '#F07200' : 'rgba(240,114,0,0.08)',
                  color: active ? '#fff' : '#F07200',
                  border: `1.5px solid ${active ? '#F07200' : 'rgba(240,114,0,0.3)'}`,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

function DeliveryToggle({ mode, onChange }: { mode: DeliveryMode; onChange: (m: DeliveryMode) => void }) {
  return (
    <div style={{ display: 'flex', borderRadius: 20, overflow: 'hidden', border: '1.5px solid #F07200' }}>
      {(['pickup', 'delivery'] as DeliveryMode[]).map(m => (
        <button
          key={m}
          onClick={() => onChange(m)}
          style={{
            padding: '6px 12px', fontSize: 12, fontWeight: 800,
            fontFamily: 'Nunito, sans-serif', cursor: 'pointer', border: 'none',
            transition: 'background 0.25s, color 0.25s',
            background: mode === m ? '#F07200' : 'rgba(13,8,3,0.6)',
            color: mode === m ? '#fff' : '#F07200',
          }}
        >
          {m === 'pickup' ? 'Самовывоз' : 'Доставка'}
        </button>
      ))}
    </div>
  );
}

function ShawarmaCartIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      {/* Bag shape */}
      <path d="M7 11h16l-2 13H9L7 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      {/* Handle */}
      <path d="M11 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Shawarma skewer inside */}
      <line x1="12" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="19" x2="18" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
