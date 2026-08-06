import React from 'react';
import type { Page } from '../types';
import logoImg from '../imports/_____________.png';

interface Props {
  onNav: (p: Page) => void;
  onBanners: () => void;
}

export default function Footer({ onNav, onBanners }: Props) {
  return (
    <footer style={{
      marginTop: 80,
      padding: '48px 40px',
      background: '#0A0602',
      borderTop: '1px solid rgba(240,114,0,0.14)',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label>Заведение</Label>
          <FLink onClick={() => onNav('about')}>О нас</FLink>
          <FLink onClick={onBanners}>Акции</FLink>
          <FLink onClick={() => {}}>Отзывы</FLink>
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <img src={logoImg} alt="Шашлыковский" style={{ height: 80, objectFit: 'contain', opacity: 0.88 }} />
          <p style={{ fontSize: 11, color: '#705040', textAlign: 'center' }}>
            © {new Date().getFullYear()} Шашлыковский
          </p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <Label>Документы</Label>
          <FLink onClick={() => {}}>Публичная оферта</FLink>
          <FLink onClick={() => {}}>Политика конфиденциальности</FLink>
        </div>
      </div>
    </footer>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 10, fontWeight: 800, color: '#705040', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{children}</p>;
}

function FLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 14, fontWeight: 600, fontFamily: 'Nunito, sans-serif',
        color: hov ? '#F07200' : '#C8A880',
        transition: 'color 0.2s', textAlign: 'left',
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
