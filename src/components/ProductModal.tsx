import React, { useState } from 'react';
import type { Product, Addon, CartItem } from '../types';

interface Props {
  product: Product;
  addons: Addon[];
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export default function ProductModal({ product, addons, onClose, onAddToCart }: Props) {
  const [qty, setQty] = useState(1);
  const [addonQtys, setAddonQtys] = useState<Record<string, number>>({});

  const addonTotal = addons.reduce((s, a) => s + (addonQtys[a.id] || 0) * a.price, 0);
  const total = product.price * qty + addonTotal;

  const changeAddon = (id: string, delta: number) => {
    setAddonQtys(prev => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      quantity: qty,
      addons: Object.entries(addonQtys).map(([addonId, quantity]) => ({ addonId, quantity })),
    });
    onClose();
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        style={{
          background: '#1C1208',
          borderRadius: 24,
          border: '1px solid rgba(240,114,0,0.2)',
          width: '100%', maxWidth: 720,
          maxHeight: '90vh', overflowY: 'auto',
          position: 'relative',
          animation: 'fadeUp 0.3s ease',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            width: 34, height: 34, borderRadius: 17,
            background: 'rgba(240,114,0,0.14)', border: 'none',
            cursor: 'pointer', color: '#F07200',
            fontSize: 16, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
          {/* Photo */}
          <div style={{ flexShrink: 0, width: 280 }}>
            <img
              src={product.image} alt={product.name}
              style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover', borderRadius: '24px 0 0 24px' }}
            />
          </div>

          {/* Details */}
          <div style={{ flex: 1, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: 'Russo One, sans-serif', fontSize: 22, color: '#F2E8D0', marginBottom: 6 }}>
                {product.name}
              </h2>
              <p style={{ fontSize: 13, color: '#A08060', lineHeight: 1.6, marginBottom: 4 }}>{product.composition}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#F07200' }}>{product.weight}</p>
            </div>

            {/* Addons */}
            {addons.length > 0 && (
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#A08060', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  Добавки
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {addons.map(a => {
                    const aq = addonQtys[a.id] || 0;
                    return (
                      <div key={a.id} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: 'rgba(240,114,0,0.06)',
                        border: '1px solid rgba(240,114,0,0.12)',
                        borderRadius: 12, padding: '8px 12px',
                      }}>
                        <img src={a.image} alt={a.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#F2E8D0', marginBottom: 2 }}>{a.name}</p>
                          <p style={{ fontSize: 11, color: '#A08060' }}>{a.weight}</p>
                        </div>
                        {aq === 0 ? (
                          <button
                            onClick={() => changeAddon(a.id, 1)}
                            style={{
                              background: 'rgba(240,114,0,0.12)', border: 'none', borderRadius: 8,
                              color: '#F07200', fontSize: 13, fontWeight: 800,
                              padding: '4px 10px', cursor: 'pointer',
                            }}
                          >
                            +{a.price}₽
                          </button>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button className="qty-btn" onClick={() => changeAddon(a.id, -1)}>−</button>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#F2E8D0', minWidth: 18, textAlign: 'center' }}>{aq}</span>
                            <button className="qty-btn" onClick={() => changeAddon(a.id, 1)}>+</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom row */}
            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(240,114,0,0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Main qty */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#F2E8D0', minWidth: 22, textAlign: 'center' }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: 'Russo One, sans-serif', fontSize: 20, color: '#F2E8D0' }}>{total}₽</span>
              <button className="btn-cta" onClick={handleAdd} style={{ padding: '10px 22px', fontSize: 14 }}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
