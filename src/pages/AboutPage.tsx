import React from 'react';
import type { Page } from '../types';
import logoImg from '../imports/_____________.png';
import Footer from '../components/Footer';

export default function AboutPage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0D0803' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px 40px' }}>
        <button
          onClick={() => onNav('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#A08060', fontFamily: 'Nunito, sans-serif', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Назад в меню
        </button>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src={logoImg} alt="Шашлыковский" style={{ height: 110, objectFit: 'contain', marginBottom: 16 }} />
          <h1 style={{ fontFamily: 'Russo One, sans-serif', fontSize: 36, color: '#F2E8D0' }}>О нас</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AboutCard title="Наша история">
            Шашлыковский открылся в 2024 году с одной простой идеей — готовить честную уличную еду на живом огне. Мы не ищем сложных рецептов: берём качественное мясо, свежие овощи и хороший огонь. Результат говорит сам за себя.
          </AboutCard>
          <AboutCard title="Кто мы">
            Команда единомышленников, влюблённых в гриль-культуру и уличную кухню. Наш шеф прошёл путь от маленькой точки на рынке до полноценного заведения — не потеряв ни грамма вкуса.
          </AboutCard>
          <AboutCard title="Принципы">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Только свежее мясо — никаких заморозок', 'Готовим при заказе — ждём, но оно того стоит', 'Честная цена — без скрытых наценок', 'Всегда горячее — даже при доставке'].map(t => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F07200', marginTop: 2, flexShrink: 0 }}>●</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </AboutCard>
          <AboutCard title="Где нас найти">
            <p>г. Москва, ул. Примерная, д. 12</p>
            <p style={{ color: '#A08060', marginTop: 4 }}>Ежедневно с 10:00 до 23:00</p>
            <p style={{ color: '#F07200', marginTop: 8, fontWeight: 800 }}>+7 (999) 123-45-67</p>
          </AboutCard>
        </div>
      </div>
      <Footer onNav={onNav} onBanners={() => onNav('home')} />
    </div>
  );
}

function AboutCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#1C1208', border: '1px solid rgba(240,114,0,0.15)', borderRadius: 20, padding: 24 }}>
      <h2 style={{ fontFamily: 'Russo One, sans-serif', fontSize: 20, color: '#F07200', marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: '#C8A880' }}>{children}</div>
    </div>
  );
}
