import React from 'react';
import type { CartItem, Product, DeliveryMode } from '../types';

interface Props {
  cart: CartItem[];
  products: Product[];
  deliveryMode: DeliveryMode;
  onDeliveryChange: (m: DeliveryMode) => void;
  onQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function CartSidebar({ cart, products, deliveryMode, onDeliveryChange, onQty, onRemove, visible }: Props) {
  const itemsTotal = cart.reduce((s, item) => {
    const p = products.find(x => x.id === item.productId);
    return s + (p ? p.price * item.quantity : 0);
  }, 0);

  const FREE_DELIVERY_AT = 800;
  const deliveryCost = deliveryMode === 'delivery' && itemsTotal < FREE_DELIVERY_AT ? 149 : 0;
  const grandTotal = itemsTotal + deliveryCost;
  const progress = Math.min(100, (itemsTotal / FREE_DELIVERY_AT) * 100);

  return (
    <div style={{
      width: 300, flexShrink: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(32px)',
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    }}>
      <div style={{
        position: 'sticky', top: 80,
        background: '#1C1208',
        border: '1px solid rgba(240,114,0,0.18)',
        borderRadius: 20, padding: 20,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <h3 style={{ fontFamily: 'Russo One, sans-serif', fontSize: 18, color: '#F2E8D0' }}>Ваш заказ</h3>

        {/* Delivery toggle */}
        <div style={{ display: 'flex', borderRadius: 20, overflow: 'hidden', border: '1.5px solid #F07200' }}>
          {(['delivery', 'pickup'] as DeliveryMode[]).map(m => (
            <button key={m} onClick={() => onDeliveryChange(m)} style={{
              flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 800,
              fontFamily: 'Nunito, sans-serif', cursor: 'pointer', border: 'none',
              background: deliveryMode === m ? '#F07200' : 'rgba(13,8,3,0.5)',
              color: deliveryMode === m ? '#fff' : '#F07200',
              transition: 'background 0.25s, color 0.25s',
            }}>
              {m === 'delivery' ? 'Доставка' : 'Самовывоз'}
            </button>
          ))}
        </div>

        {cart.length === 0 ? (
          <p style={{ fontSize: 13, color: '#A08060', textAlign: 'center', padding: '20px 0' }}>Корзина пуста</p>
        ) : (
          <>
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cart.map(item => {
                const p = products.find(x => x.id === item.productId);
                if (!p) return null;
                return (
                  <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <img src={p.image} alt={p.name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#F2E8D0', lineHeight: 1.3, marginBottom: 4 }}>{p.name}</p>
                      <p style={{ fontSize: 13, fontWeight: 800, color: '#F07200' }}>{p.price}₽</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A08060', fontSize: 13, lineHeight: 1 }}>✕</button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <button className="qty-btn" style={{ width: 24, height: 24 }} onClick={() => onQty(item.id, item.quantity - 1)}>−</button>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#F2E8D0', minWidth: 16, textAlign: 'center' }}>{item.quantity}</span>
                        <button className="qty-btn" style={{ width: 24, height: 24 }} onClick={() => onQty(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress to free delivery */}
            {deliveryMode === 'delivery' && itemsTotal < FREE_DELIVERY_AT && (
              <div style={{ background: 'rgba(240,114,0,0.07)', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#A08060', marginBottom: 6 }}>
                  <span>До бесплатной доставки</span>
                  <span style={{ color: '#F07200' }}>{FREE_DELIVERY_AT - itemsTotal}₽</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'rgba(240,114,0,0.15)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: '#F07200', borderRadius: 3, transition: 'width 0.4s' }} />
                </div>
              </div>
            )}

            {/* Totals */}
            <div style={{ borderTop: '1px solid rgba(240,114,0,0.14)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Row label="Товары" value={`${itemsTotal}₽`} />
              {deliveryMode === 'delivery' && (
                <Row
                  label="Доставка"
                  value={itemsTotal >= FREE_DELIVERY_AT ? 'Бесплатно' : `${deliveryCost}₽`}
                  green={itemsTotal >= FREE_DELIVERY_AT}
                />
              )}
            </div>

            <button className="btn-cta" style={{ width: '100%', padding: '12px 0', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
              <span>К оформлению</span>
              <span>{grandTotal}₽</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#A08060' }}>
      <span>{label}</span>
      <span style={{ color: green ? '#4ade80' : undefined }}>{value}</span>
    </div>
  );
}
