import React, { useEffect, useRef, useState } from 'react';
import type { Product, Category, Banner, Addon, CartItem, DeliveryMode, Page } from '../types';
import BannerSlider from '../components/BannerSlider';
import ProductModal from '../components/ProductModal';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';

interface Props {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  addons: Addon[];
  cart: CartItem[];
  deliveryMode: DeliveryMode;
  onDeliveryChange: (m: DeliveryMode) => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onMenuSectionMount: (top: number) => void;
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  onNav: (p: Page) => void;
  bannersRef: React.RefObject<HTMLDivElement | null>;
}

export default function HomePage({
  products, categories, banners, addons,
  cart, deliveryMode, onDeliveryChange,
  onAddToCart, onQty, onRemove,
  onMenuSectionMount, activeCategory, setActiveCategory,
  onNav, bannersRef,
}: Props) {
  const [modal, setModal] = useState<Product | null>(null);
  const [cartVisible, setCartVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const sortedCats = [...categories].sort((a, b) => a.order - b.order);

  // Report menu section offset to parent (for header transform)
  useEffect(() => {
    if (!menuRef.current) return;
    const top = menuRef.current.offsetTop;
    onMenuSectionMount(top);
  }, []);

  // Cart & category scroll spy
  useEffect(() => {
    const onScroll = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        setCartVisible(rect.top <= 80);
      }
      // Category spy: find which section header is nearest top
      let best = sortedCats[0]?.id || '';
      let bestDist = Infinity;
      for (const cat of sortedCats) {
        const el = sectionRefs.current[cat.id];
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - 90);
        if (dist < bestDist) { bestDist = dist; best = cat.id; }
      }
      setActiveCategory(best);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sortedCats.map(c => c.id).join(',')]);

  // Animate cards in view
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.prod-card').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [products.length, categories.length]);

  // Listen for category click from header
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const el = sectionRefs.current[id];
      if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    };
    window.addEventListener('goCat', handler);
    return () => window.removeEventListener('goCat', handler);
  }, []);

  return (
    <>
      {modal && (
        <ProductModal
          product={modal}
          addons={addons}
          onClose={() => setModal(null)}
          onAddToCart={item => { onAddToCart(item); setModal(null); }}
        />
      )}

      {/* Banners */}
      <div style={{ padding: '84px 24px 0', maxWidth: 1200, margin: '0 auto' }}>
        <div ref={bannersRef}>
          <BannerSlider banners={banners} />
        </div>
      </div>

      {/* Menu section */}
      <div ref={menuRef} style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* Products column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {sortedCats.map(cat => {
              const items = [...products]
                .filter(p => p.categoryId === cat.id)
                .sort((a, b) => a.order - b.order);
              if (!items.length) return null;
              return (
                <section
                  key={cat.id}
                  ref={el => { sectionRefs.current[cat.id] = el; }}
                  style={{ marginBottom: 52 }}
                >
                  <h2 style={{
                    fontFamily: 'Russo One, sans-serif',
                    fontSize: 26, color: '#F2E8D0', marginBottom: 20,
                  }}>
                    {cat.name}
                  </h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 16,
                  }}>
                    {items.map((p, i) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        delay={i * 70}
                        onClick={() => setModal(p)}
                        onAdd={e => {
                          e.stopPropagation();
                          const existing = cart.find(c => c.productId === p.id);
                          if (existing) onQty(existing.id, existing.quantity + 1);
                          else onAddToCart({ productId: p.id, quantity: 1, addons: [] });
                        }}
                        cartItem={cart.find(c => c.productId === p.id)}
                        onQty={onQty}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Cart */}
          <CartSidebar
            cart={cart} products={products}
            deliveryMode={deliveryMode} onDeliveryChange={onDeliveryChange}
            onQty={onQty} onRemove={onRemove}
            visible={cartVisible}
          />
        </div>
      </div>

      <Footer
        onNav={onNav}
        onBanners={() => bannersRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />
    </>
  );
}

/* ---- Product Card ---- */
interface CardProps {
  product: Product;
  delay: number;
  onClick: () => void;
  onAdd: (e: React.MouseEvent) => void;
  cartItem?: CartItem;
  onQty: (id: string, qty: number) => void;
}

function ProductCard({ product, delay, onClick, onAdd, cartItem, onQty }: CardProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="prod-card"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#1C1208',
        border: '1px solid rgba(240,114,0,0.13)',
        borderRadius: 18,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        /* initial hidden state — JS reveals via IntersectionObserver */
        opacity: 0,
        transform: 'translateY(24px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.25s ease`,
        boxShadow: hov ? '0 10px 36px rgba(240,114,0,0.16)' : 'none',
      }}
    >
      {/* Photo */}
      <div style={{ height: 170, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s ease', transform: hov ? 'scale(1.07)' : 'scale(1)' }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 14px 14px', display: 'flex', flexDirection: 'column', flex: 1, gap: 4 }}>
        <p style={{ fontFamily: 'Russo One, sans-serif', fontSize: 15, color: '#F2E8D0', lineHeight: 1.3 }}>{product.name}</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#F07200' }}>{product.weight}</p>
        <p style={{ fontSize: 11, color: '#A08060', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.composition}
        </p>

        {/* Price + Add */}
        <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Russo One, sans-serif', fontSize: 17, color: '#F2E8D0' }}>{product.price}₽</span>

          <div
            style={{
              opacity: hov ? 1 : 0,
              transform: hov ? 'scale(1)' : 'scale(0.82)',
              transition: 'opacity 0.22s ease, transform 0.22s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {cartItem ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <button className="qty-btn" onClick={e => { e.stopPropagation(); onQty(cartItem.id, cartItem.quantity - 1); }}>−</button>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#F2E8D0', minWidth: 16, textAlign: 'center' }}>{cartItem.quantity}</span>
                <button className="qty-btn" onClick={e => { e.stopPropagation(); onQty(cartItem.id, cartItem.quantity + 1); }}>+</button>
              </div>
            ) : (
              <button className="btn-cta" onClick={onAdd} style={{ padding: '7px 14px', fontSize: 13 }}>
                Добавить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
