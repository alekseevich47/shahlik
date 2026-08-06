import React, { useState } from 'react';
import type { Product, Category, Banner, Addon } from '../types';

interface Props {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  addons: Addon[];
  onSave: (products: Product[], categories: Category[], banners: Banner[], addons: Addon[]) => void;
  onBack: () => void;
}

type Tab = 'products' | 'categories' | 'banners' | 'addons';

export default function AdminPage({ products, categories, banners, addons, onSave, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('products');
  const [lp, setLp] = useState(products);
  const [lc, setLc] = useState(categories);
  const [lb, setLb] = useState(banners);
  const [la, setLa] = useState(addons);
  const [editP, setEditP] = useState<Product | null>(null);
  const [editB, setEditB] = useState<Banner | null>(null);
  const [editA, setEditA] = useState<Addon | null>(null);
  const [flash, setFlash] = useState(false);

  const save = () => {
    onSave(lp, lc, lb, la);
    setFlash(true);
    setTimeout(() => setFlash(false), 1800);
  };

  const move = <T extends { id: string; order: number }>(arr: T[], id: string, dir: -1 | 1): T[] => {
    const s = [...arr].sort((a, b) => a.order - b.order);
    const i = s.findIndex(x => x.id === id);
    const j = i + dir;
    if (j < 0 || j >= s.length) return arr;
    const oa = s[i].order, ob = s[j].order;
    return arr.map(x => x.id === s[i].id ? { ...x, order: ob } : x.id === s[j].id ? { ...x, order: oa } : x);
  };

  const sp = [...lp].sort((a, b) => a.order - b.order);
  const sc = [...lc].sort((a, b) => a.order - b.order);
  const sb = [...lb].sort((a, b) => a.order - b.order);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'products', label: 'Товары' }, { id: 'categories', label: 'Категории' },
    { id: 'banners', label: 'Баннеры' }, { id: 'addons', label: 'Добавки' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0803', padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <BtnBack onClick={onBack} />
          <h1 style={{ fontFamily: 'Russo One, sans-serif', fontSize: 28, color: '#F2E8D0', flex: 1 }}>Админ-панель</h1>
          <button
            className="btn-cta"
            onClick={save}
            style={{ padding: '10px 24px', fontSize: 14, background: flash ? '#22c55e' : '#F07200' }}
          >
            {flash ? '✓ Сохранено' : 'Сохранить'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 20px', borderRadius: 20, fontSize: 13, fontWeight: 700,
              fontFamily: 'Nunito, sans-serif', cursor: 'pointer',
              background: tab === t.id ? '#F07200' : 'rgba(240,114,0,0.08)',
              color: tab === t.id ? '#fff' : '#F07200',
              border: `1.5px solid ${tab === t.id ? '#F07200' : 'rgba(240,114,0,0.25)'}`,
              transition: 'all 0.2s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Products */}
        {tab === 'products' && (
          <div>
            <button className="btn-cta" style={{ padding: '9px 18px', fontSize: 13, marginBottom: 16 }}
              onClick={() => {
                const np: Product = { id: `p${Date.now()}`, categoryId: lc[0]?.id || '', name: 'Новый товар', weight: '', composition: '', price: 300, image: '', order: lp.length };
                setLp([...lp, np]); setEditP(np);
              }}>
              + Добавить товар
            </button>
            {editP && (
              <PForm
                product={editP} cats={lc}
                onSave={p => { setLp(lp.map(x => x.id === p.id ? p : x)); setEditP(null); }}
                onCancel={() => setEditP(null)}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sp.map(p => (
                <Row key={p.id}
                  img={p.image} title={p.name}
                  sub={`${lc.find(c => c.id === p.categoryId)?.name || '—'} · ${p.weight} · ${p.price}₽`}
                  onUp={() => setLp(move(lp, p.id, -1))}
                  onDown={() => setLp(move(lp, p.id, 1))}
                  onEdit={() => setEditP(p)}
                  onDel={() => setLp(lp.filter(x => x.id !== p.id))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {tab === 'categories' && (
          <div>
            <button className="btn-cta" style={{ padding: '9px 18px', fontSize: 13, marginBottom: 16 }}
              onClick={() => setLc([...lc, { id: `c${Date.now()}`, name: 'Новая категория', order: lc.length }])}>
              + Добавить категорию
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sc.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#1C1208', border: '1px solid rgba(240,114,0,0.14)', borderRadius: 14, padding: '10px 16px' }}>
                  <input
                    value={c.name}
                    onChange={e => setLc(lc.map(x => x.id === c.id ? { ...x, name: e.target.value } : x))}
                    style={inputStyle}
                  />
                  <IconBtn onClick={() => setLc(move(lc, c.id, -1))}>↑</IconBtn>
                  <IconBtn onClick={() => setLc(move(lc, c.id, 1))}>↓</IconBtn>
                  <IconBtn red onClick={() => setLc(lc.filter(x => x.id !== c.id))}>✕</IconBtn>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Banners */}
        {tab === 'banners' && (
          <div>
            <button className="btn-cta" style={{ padding: '9px 18px', fontSize: 13, marginBottom: 16 }}
              onClick={() => {
                const nb: Banner = { id: `b${Date.now()}`, title: 'Новый баннер', subtitle: '', image: '', order: lb.length };
                setLb([...lb, nb]); setEditB(nb);
              }}>
              + Добавить баннер
            </button>
            {editB && (
              <BForm banner={editB}
                onSave={b => { setLb(lb.map(x => x.id === b.id ? b : x)); setEditB(null); }}
                onCancel={() => setEditB(null)} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sb.map(b => (
                <Row key={b.id}
                  img={b.image} title={b.title} sub={b.subtitle}
                  onUp={() => setLb(move(lb, b.id, -1))}
                  onDown={() => setLb(move(lb, b.id, 1))}
                  onEdit={() => setEditB(b)}
                  onDel={() => setLb(lb.filter(x => x.id !== b.id))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Addons */}
        {tab === 'addons' && (
          <div>
            <button className="btn-cta" style={{ padding: '9px 18px', fontSize: 13, marginBottom: 16 }}
              onClick={() => {
                const na: Addon = { id: `a${Date.now()}`, name: 'Новая добавка', weight: '', price: 50, image: '' };
                setLa([...la, na]); setEditA(na);
              }}>
              + Добавить добавку
            </button>
            {editA && (
              <AForm addon={editA}
                onSave={a => { setLa(la.map(x => x.id === a.id ? a : x)); setEditA(null); }}
                onCancel={() => setEditA(null)} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {la.map(a => (
                <Row key={a.id}
                  img={a.image} title={a.name}
                  sub={`${a.weight} · ${a.price}₽`}
                  onEdit={() => setEditA(a)}
                  onDel={() => setLa(la.filter(x => x.id !== a.id))}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inline styles for admin inputs */}
      <style>{`
        .ai { background: rgba(240,114,0,0.06); border: 1px solid rgba(240,114,0,0.2); border-radius: 10px; padding: 8px 12px; color: #F2E8D0; font-size: 13px; font-family: Nunito,sans-serif; width: 100%; outline: none; }
        .ai:focus { border-color: #F07200; }
        .al { font-size: 10px; font-weight: 800; color: #705040; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; display: block; }
      `}</style>
    </div>
  );
}

/* ---- Sub-components ---- */

const inputStyle: React.CSSProperties = {
  flex: 1, background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(240,114,0,0.25)',
  color: '#F2E8D0', fontSize: 14, fontWeight: 700,
  fontFamily: 'Nunito, sans-serif', outline: 'none', padding: '2px 0',
};

function IconBtn({ onClick, red, children }: { onClick?: () => void; red?: boolean; children: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(240,114,0,0.2)', background: h ? 'rgba(240,114,0,0.18)' : 'rgba(240,114,0,0.07)', color: red ? '#ef4444' : '#A08060', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {children}
    </button>
  );
}

function Row({ img, title, sub, onUp, onDown, onEdit, onDel }: { img: string; title: string; sub: string; onUp?: () => void; onDown?: () => void; onEdit?: () => void; onDel?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#1C1208', border: '1px solid rgba(240,114,0,0.14)', borderRadius: 14, padding: '10px 14px' }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#2A1C0A' }}>
        {img && <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#F2E8D0', marginBottom: 2 }}>{title}</p>
        <p style={{ fontSize: 11, color: '#A08060' }}>{sub}</p>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {onUp && <IconBtn onClick={onUp}>↑</IconBtn>}
        {onDown && <IconBtn onClick={onDown}>↓</IconBtn>}
        {onEdit && <IconBtn onClick={onEdit}>✏</IconBtn>}
        {onDel && <IconBtn red onClick={onDel}>✕</IconBtn>}
      </div>
    </div>
  );
}

function FormWrap({ title, onSave, onCancel, children }: { title: string; onSave: () => void; onCancel: () => void; children: React.ReactNode }) {
  return (
    <div style={{ background: '#231508', border: '1px solid rgba(240,114,0,0.2)', borderRadius: 18, padding: 20, marginBottom: 16 }}>
      <p style={{ fontFamily: 'Russo One, sans-serif', fontSize: 15, color: '#F2E8D0', marginBottom: 16 }}>{title}</p>
      {children}
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="btn-cta" onClick={onSave} style={{ padding: '9px 20px', fontSize: 13 }}>Сохранить</button>
        <button onClick={onCancel} style={{ padding: '9px 20px', fontSize: 13, fontWeight: 700, fontFamily: 'Nunito, sans-serif', background: 'rgba(240,114,0,0.07)', border: '1px solid rgba(240,114,0,0.18)', borderRadius: 10, color: '#A08060', cursor: 'pointer' }}>Отмена</button>
      </div>
    </div>
  );
}

function G2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>;
}
function FG({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="al">{label}</label>{children}</div>;
}

function PForm({ product, cats, onSave, onCancel }: { product: Product; cats: Category[]; onSave: (p: Product) => void; onCancel: () => void }) {
  const [f, setF] = useState(product);
  const s = (k: keyof Product, v: string | number) => setF(x => ({ ...x, [k]: v }));
  return (
    <FormWrap title="Редактировать товар" onSave={() => onSave(f)} onCancel={onCancel}>
      <G2>
        <FG label="Название"><input className="ai" value={f.name} onChange={e => s('name', e.target.value)} /></FG>
        <FG label="Категория">
          <select className="ai" value={f.categoryId} onChange={e => s('categoryId', e.target.value)} style={{ background: '#1C1208' }}>
            {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </FG>
        <FG label="Вес / объём"><input className="ai" value={f.weight} onChange={e => s('weight', e.target.value)} /></FG>
        <FG label="Цена (₽)"><input className="ai" type="number" value={f.price} onChange={e => s('price', +e.target.value)} /></FG>
        <div style={{ gridColumn: '1 / -1' }}><FG label="Состав"><textarea className="ai" rows={2} value={f.composition} onChange={e => s('composition', e.target.value)} /></FG></div>
        <div style={{ gridColumn: '1 / -1' }}><FG label="URL фото"><input className="ai" value={f.image} onChange={e => s('image', e.target.value)} /></FG></div>
      </G2>
    </FormWrap>
  );
}

function BForm({ banner, onSave, onCancel }: { banner: Banner; onSave: (b: Banner) => void; onCancel: () => void }) {
  const [f, setF] = useState(banner);
  const s = (k: keyof Banner, v: string) => setF(x => ({ ...x, [k]: v }));
  return (
    <FormWrap title="Редактировать баннер" onSave={() => onSave(f)} onCancel={onCancel}>
      <G2>
        <FG label="Заголовок"><input className="ai" value={f.title} onChange={e => s('title', e.target.value)} /></FG>
        <FG label="Подзаголовок"><input className="ai" value={f.subtitle} onChange={e => s('subtitle', e.target.value)} /></FG>
        <div style={{ gridColumn: '1 / -1' }}><FG label="URL фото"><input className="ai" value={f.image} onChange={e => s('image', e.target.value)} /></FG></div>
      </G2>
    </FormWrap>
  );
}

function AForm({ addon, onSave, onCancel }: { addon: Addon; onSave: (a: Addon) => void; onCancel: () => void }) {
  const [f, setF] = useState(addon);
  const s = (k: keyof Addon, v: string | number) => setF(x => ({ ...x, [k]: v }));
  return (
    <FormWrap title="Редактировать добавку" onSave={() => onSave(f)} onCancel={onCancel}>
      <G2>
        <FG label="Название"><input className="ai" value={f.name} onChange={e => s('name', e.target.value)} /></FG>
        <FG label="Вес"><input className="ai" value={f.weight} onChange={e => s('weight', e.target.value)} /></FG>
        <FG label="Цена (₽)"><input className="ai" type="number" value={f.price} onChange={e => s('price', +e.target.value)} /></FG>
        <FG label="URL фото"><input className="ai" value={f.image} onChange={e => s('image', e.target.value)} /></FG>
      </G2>
    </FormWrap>
  );
}

function BtnBack({ onClick }: { onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Nunito, sans-serif', color: h ? '#F07200' : '#A08060', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
      ← На сайт
    </button>
  );
}
