import React, { useCallback, useEffect, useRef, useState } from 'react'
import logoImg from './imports/_____________.png'

/* ─────────────── TYPES ─────────────── */
type DeliveryMode = 'delivery' | 'pickup'
type Page = 'home' | 'admin' | 'about'

interface Category { id: string; name: string; order: number }
interface Addon    { id: string; name: string; weight: string; price: number; image: string }
interface Product  { id: string; categoryId: string; name: string; weight: string; composition: string; price: number; image: string; order: number }
interface Banner   { id: string; title: string; subtitle: string; image: string; order: number }
interface CartItem { id: string; productId: string; quantity: number; addons: { addonId: string; quantity: number }[] }

/* ─────────────── SEED DATA ─────────────── */
const CATS0: Category[] = [
  { id:'lavash',   name:'В лаваше',     order:0 },
  { id:'combo',    name:'Комбо',         order:1 },
  { id:'fries',    name:'Картофель фри', order:2 },
  { id:'grill',    name:'Гриль',         order:3 },
  { id:'shawarma', name:'Шаурма',        order:4 },
  { id:'pizza',    name:'Пицца',         order:5 },
  { id:'drinks',   name:'Напитки',       order:6 },
  { id:'sauces',   name:'Соусы',         order:7 },
]
const ADDONS0: Addon[] = [
  { id:'a1', name:'Доп. мясо',    weight:'100г', price:120, image:'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=120&h=120&fit=crop' },
  { id:'a2', name:'Сыр',          weight:'30г',  price:60,  image:'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=120&h=120&fit=crop' },
  { id:'a3', name:'Чесночный соус',weight:'50г', price:50,  image:'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=120&h=120&fit=crop' },
  { id:'a4', name:'Острый соус',  weight:'50г',  price:50,  image:'https://images.unsplash.com/photo-1607198179219-5b7f8c4ee07c?w=120&h=120&fit=crop' },
  { id:'a5', name:'Огурцы мар.',  weight:'40г',  price:30,  image:'https://images.unsplash.com/photo-1589621316382-008455b857cd?w=120&h=120&fit=crop' },
]
const PRODS0: Product[] = [
  { id:'p1',  categoryId:'lavash',   name:'Лаваш с курицей',       weight:'350г', composition:'Лаваш, курица гриль, помидоры, огурцы, лук, чесночный соус',         price:290, image:'https://images.unsplash.com/photo-1599487488310-f66323f71dc8?w=600&h=450&fit=crop', order:0 },
  { id:'p2',  categoryId:'lavash',   name:'Лаваш с говядиной',     weight:'380г', composition:'Лаваш, говядина гриль, перец болгарский, помидоры, соус ткемали',     price:340, image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop', order:1 },
  { id:'p3',  categoryId:'lavash',   name:'Лаваш овощной',         weight:'300г', composition:'Лаваш, баклажан, перец, помидоры, кабачок, острый соус',              price:220, image:'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&h=450&fit=crop', order:2 },
  { id:'p4',  categoryId:'combo',    name:'Комбо Стандарт',        weight:'750г', composition:'Шаурма + картофель фри + напиток 0.5л',                               price:520, image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop', order:0 },
  { id:'p5',  categoryId:'combo',    name:'Комбо Семейный',        weight:'1400г',composition:'2 шаурмы + картофель большой + 2 напитка + 2 соуса',                   price:980, image:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=450&fit=crop', order:1 },
  { id:'p6',  categoryId:'fries',    name:'Картофель фри малый',   weight:'150г', composition:'Картофель, масло, соль, специи',                                       price:130, image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=450&fit=crop', order:0 },
  { id:'p7',  categoryId:'fries',    name:'Картофель фри большой', weight:'280г', composition:'Картофель, масло, соль, специи',                                       price:190, image:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=450&fit=crop', order:1 },
  { id:'p8',  categoryId:'fries',    name:'По-деревенски',         weight:'250г', composition:'Картофель, масло, розмарин, чеснок, паприка',                          price:180, image:'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&h=450&fit=crop', order:2 },
  { id:'p9',  categoryId:'grill',    name:'Шашлык свиной',         weight:'300г', composition:'Свинина, лук, специи, маринад',                                        price:480, image:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop', order:0 },
  { id:'p10', categoryId:'grill',    name:'Шашлык куриный',        weight:'280г', composition:'Куриное бедро, лимон, чеснок, зелень, специи',                         price:380, image:'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=450&fit=crop', order:1 },
  { id:'p11', categoryId:'grill',    name:'Люля-кебаб',            weight:'300г', composition:'Говяжий фарш, лук репчатый, кинза, специи',                            price:430, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop', order:2 },
  { id:'p12', categoryId:'shawarma', name:'Шаурма классическая',   weight:'400г', composition:'Лаваш, курица гриль, капуста, помидоры, огурцы, чесночный соус',       price:320, image:'https://images.unsplash.com/photo-1599487488310-f66323f71dc8?w=600&h=450&fit=crop', order:0 },
  { id:'p13', categoryId:'shawarma', name:'Шаурма острая',         weight:'380г', composition:'Лаваш, курица, халапеньо, красный лук, острый соус',                   price:340, image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop', order:1 },
  { id:'p14', categoryId:'shawarma', name:'Шаурма XXL',            weight:'600г', composition:'Двойная порция мяса, лаваш, все овощи, два соуса',                     price:460, image:'https://images.unsplash.com/photo-1583835746434-cf1534674b41?w=600&h=450&fit=crop', order:2 },
  { id:'p15', categoryId:'pizza',    name:'Маргарита',             weight:'420г', composition:'Томатный соус, моцарелла, базилик, оливковое масло',                   price:490, image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=450&fit=crop', order:0 },
  { id:'p16', categoryId:'pizza',    name:'Четыре сезона',         weight:'480г', composition:'Томатный соус, моцарелла, пепперони, грибы, оливки',                   price:590, image:'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=450&fit=crop', order:1 },
  { id:'p17', categoryId:'pizza',    name:'Пицца Мясная',          weight:'520г', composition:'Томатный соус, говядина, курица, бекон, моцарелла',                    price:650, image:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=450&fit=crop', order:2 },
  { id:'p18', categoryId:'drinks',   name:'Coca-Cola 0.5л',        weight:'500мл',composition:'Газированный напиток',                                                  price:150, image:'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=450&fit=crop', order:0 },
  { id:'p19', categoryId:'drinks',   name:'Лимонад домашний',      weight:'300мл',composition:'Лимон, мята, сахар, газ. вода',                                         price:120, image:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=450&fit=crop', order:1 },
  { id:'p20', categoryId:'sauces',   name:'Соус чесночный',        weight:'50г',  composition:'Йогурт, чеснок, укроп, специи',                                        price:50,  image:'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&h=450&fit=crop', order:0 },
  { id:'p21', categoryId:'sauces',   name:'Соус острый',           weight:'50г',  composition:'Перец чили, чеснок, томат, уксус',                                     price:50,  image:'https://images.unsplash.com/photo-1607198179219-5b7f8c4ee07c?w=600&h=450&fit=crop', order:1 },
  { id:'p22', categoryId:'sauces',   name:'Ткемали',               weight:'50г',  composition:'Сливы, чеснок, кинза, хмели-сунели',                                   price:60,  image:'https://images.unsplash.com/photo-1559181567-c3190958d3ab?w=600&h=450&fit=crop', order:2 },
]
const BANNERS0: Banner[] = [
  { id:'b1', title:'Шаурма — огонь!',   subtitle:'Сочная, свежая, с пылу с жару каждый день',  image:'https://images.unsplash.com/photo-1599487488310-f66323f71dc8?w=900&h=380&fit=crop', order:0 },
  { id:'b2', title:'Комбо выгоднее',    subtitle:'Шаурма + картофель + напиток — экономь 120₽', image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=380&fit=crop', order:1 },
  { id:'b3', title:'Пицца навынос',     subtitle:'Горячая пицца за 30 минут или бесплатно',     image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&h=380&fit=crop', order:2 },
  { id:'b4', title:'Шашлык с мангала',  subtitle:'Мясо на живом огне — рецепт шеф-повара',      image:'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&h=380&fit=crop', order:3 },
]

/* ─────────────── DESIGN TOKENS ─────────────── */
const C = {
  bg:      '#0D0803',
  surface: '#1C1208',
  surface2:'#231508',
  orange:  '#F07200',
  text:    '#F2E8D0',
  muted:   '#A08060',
  border:  'rgba(240,114,0,0.18)',
}

/* ─────────────── HELPERS ─────────────── */
let _uid = 1
const uid = () => `ci${_uid++}`

const sort = <T extends {order:number}>(a:T[]) => [...a].sort((x,y)=>x.order-y.order)

const moveItem = <T extends {id:string;order:number}>(arr:T[], id:string, dir:-1|1): T[] => {
  const s = sort(arr)
  const i = s.findIndex(x=>x.id===id), j=i+dir
  if(j<0||j>=s.length) return arr
  const oa=s[i].order, ob=s[j].order
  return arr.map(x=>x.id===s[i].id?{...x,order:ob}:x.id===s[j].id?{...x,order:oa}:x)
}

/* ═══════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════ */
export default function App() {
  const [page, setPage]           = useState<Page>('home')
  const [dm,   setDm]             = useState<DeliveryMode>('delivery')
  const [cart, setCart]           = useState<CartItem[]>([])
  const [activeCat, setActiveCat] = useState(CATS0[0].id)
  const [menuTop, setMenuTop]     = useState(0)

  const [prods,   setProds]   = useState<Product[]>(PRODS0)
  const [cats,    setCats]    = useState<Category[]>(CATS0)
  const [banners, setBanners] = useState<Banner[]>(BANNERS0)
  const [addons,  setAddons]  = useState<Addon[]>(ADDONS0)

  const bannersRef = useRef<HTMLDivElement|null>(null)

  const addToCart = useCallback((item: Omit<CartItem,'id'>) => {
    setCart(prev => {
      if(!item.addons.length) {
        const ex = prev.find(c=>c.productId===item.productId&&!c.addons.length)
        if(ex) return prev.map(c=>c.id===ex.id?{...c,quantity:c.quantity+item.quantity}:c)
      }
      return [...prev, {...item, id:uid()}]
    })
  },[])

  const setQty = useCallback((id:string, qty:number) =>
    setCart(prev => qty<=0 ? prev.filter(c=>c.id!==id) : prev.map(c=>c.id===id?{...c,quantity:qty}:c))
  ,[])

  const rmCart = useCallback((id:string) => setCart(prev=>prev.filter(c=>c.id!==id)),[])

  const handleCatClick = (id:string) => {
    setActiveCat(id)
    window.dispatchEvent(new CustomEvent('goCat',{detail:id}))
  }

  if(page==='admin') return (
    <AdminPage
      prods={prods} cats={cats} banners={banners} addons={addons}
      onSave={(p,c,b,a)=>{setProds(p);setCats(c);setBanners(b);setAddons(a)}}
      onBack={()=>setPage('home')}
    />
  )

  if(page==='about') return <AboutPage onNav={setPage} />

  return (
    <div style={{background:C.bg, minHeight:'100vh'}}>
      <SiteHeader
        dm={dm} onDm={setDm} cart={cart} cats={cats}
        activeCat={activeCat} onCat={handleCatClick}
        menuTop={menuTop}
        onScrollToMenu={()=>window.scrollTo({top:menuTop-70,behavior:'smooth'})}
        onNav={setPage}
      />

      <HomePage
        prods={prods} cats={cats} banners={banners} addons={addons}
        cart={cart} dm={dm} onDm={setDm}
        onAdd={addToCart} onQty={setQty} onRm={rmCart}
        onMenuMount={setMenuTop}
        activeCat={activeCat} setActiveCat={setActiveCat}
        onNav={setPage} bannersRef={bannersRef}
      />

      <button
        onClick={()=>setPage('admin')}
        style={{position:'fixed',bottom:14,right:14,zIndex:90,padding:'6px 14px',borderRadius:16,border:`1px solid ${C.border}`,background:'rgba(240,114,0,0.1)',color:C.muted,fontSize:12,fontWeight:700,fontFamily:'Nunito,sans-serif',cursor:'pointer'}}
      >Админ</button>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SITE HEADER
═══════════════════════════════════════════ */
function SiteHeader({dm,onDm,cart,cats,activeCat,onCat,menuTop,onScrollToMenu,onNav}:{
  dm:DeliveryMode; onDm:(m:DeliveryMode)=>void; cart:CartItem[]; cats:Category[]
  activeCat:string; onCat:(id:string)=>void; menuTop:number
  onScrollToMenu:()=>void; onNav:(p:Page)=>void
}) {
  const [scrollY, setScrollY] = useState(0)
  const catRef = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    const h=()=>setScrollY(window.scrollY)
    window.addEventListener('scroll',h,{passive:true})
    return ()=>window.removeEventListener('scroll',h)
  },[])

  useEffect(()=>{
    const el = catRef.current?.querySelector('[data-active="true"]') as HTMLElement|null
    el?.scrollIntoView({inline:'center',behavior:'smooth',block:'nearest'})
  },[activeCat])

  const glass   = scrollY > 50
  const menuMode= menuTop > 0 && scrollY >= menuTop - 90
  const total   = cart.reduce((s,i)=>s+i.quantity,0)

  return (
    <header style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,
      background: glass ? 'rgba(13,8,3,0.6)' : 'transparent',
      backdropFilter: glass ? 'blur(20px) saturate(160%)' : 'none',
      WebkitBackdropFilter: glass ? 'blur(20px) saturate(160%)' : 'none',
      borderBottom: glass ? `1px solid ${C.border}` : '1px solid transparent',
      transition:'background .4s,border-color .4s,backdrop-filter .4s',
    }}>
      {/* Main row */}
      <div style={{display:'flex',alignItems:'center',height:62,padding:'0 18px',gap:10}}>
        {/* LEFT */}
        <div style={{flex:1,display:'flex',alignItems:'center'}}>
          {menuMode
            ? <button onClick={()=>onNav('home')} style={logoBtn}><img src={logoImg} alt="logo" style={{height:40,objectFit:'contain'}}/></button>
            : <DeliveryToggle dm={dm} onDm={onDm}/>
          }
        </div>
        {/* CENTER */}
        {!menuMode && (
          <button onClick={()=>onNav('home')} style={logoBtn}>
            <img src={logoImg} alt="Шашлыковский" style={{height:48,objectFit:'contain'}}/>
          </button>
        )}
        {/* RIGHT */}
        <div style={{flex:1,display:'flex',justifyContent:'flex-end'}}>
          {!menuMode && (
            <button onClick={onScrollToMenu} style={{...logoBtn,position:'relative',color:total?C.orange:C.muted}}>
              <CartIcon/>
              {total>0 && <span style={{position:'absolute',top:-3,right:-5,background:C.orange,color:'#fff',width:17,height:17,borderRadius:9,fontSize:9,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center'}}>{total}</span>}
            </button>
          )}
        </div>
      </div>

      {/* Category strip */}
      {menuMode && (
        <div ref={catRef} style={{display:'flex',gap:7,overflowX:'auto',padding:'0 18px 10px',scrollbarWidth:'none',borderTop:`1px solid rgba(240,114,0,0.1)`}}>
          {sort(cats).map(c=>{
            const active=c.id===activeCat
            return (
              <button key={c.id} data-active={active} onClick={()=>onCat(c.id)} style={{flexShrink:0,padding:'5px 14px',borderRadius:18,fontSize:12,fontWeight:700,fontFamily:'Nunito,sans-serif',cursor:'pointer',transition:'all .2s',background:active?C.orange:'rgba(240,114,0,0.08)',color:active?'#fff':C.orange,border:`1.5px solid ${active?C.orange:'rgba(240,114,0,0.28)'}`}}>
                {c.name}
              </button>
            )
          })}
        </div>
      )}
    </header>
  )
}

const logoBtn: React.CSSProperties = {background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center'}

function DeliveryToggle({dm,onDm}:{dm:DeliveryMode;onDm:(m:DeliveryMode)=>void}) {
  return (
    <div style={{display:'flex',borderRadius:18,overflow:'hidden',border:`1.5px solid ${C.orange}`}}>
      {(['pickup','delivery'] as DeliveryMode[]).map(m=>(
        <button key={m} onClick={()=>onDm(m)} style={{padding:'5px 11px',fontSize:11,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer',border:'none',transition:'all .2s',background:dm===m?C.orange:'rgba(13,8,3,0.55)',color:dm===m?'#fff':C.orange}}>
          {m==='pickup'?'Самовывоз':'Доставка'}
        </button>
      ))}
    </div>
  )
}

function CartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 7h2.5l2.5 11h11l2-8H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11.5" cy="21.5" r="1.5" fill="currentColor"/>
      <circle cx="19.5" cy="21.5" r="1.5" fill="currentColor"/>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
function HomePage({prods,cats,banners,addons,cart,dm,onDm,onAdd,onQty,onRm,onMenuMount,activeCat,setActiveCat,onNav,bannersRef}:{
  prods:Product[]; cats:Category[]; banners:Banner[]; addons:Addon[]
  cart:CartItem[]; dm:DeliveryMode; onDm:(m:DeliveryMode)=>void
  onAdd:(i:Omit<CartItem,'id'>)=>void; onQty:(id:string,q:number)=>void; onRm:(id:string)=>void
  onMenuMount:(t:number)=>void; activeCat:string; setActiveCat:(id:string)=>void
  onNav:(p:Page)=>void; bannersRef:React.RefObject<HTMLDivElement|null>
}) {
  const [modal, setModal] = useState<Product|null>(null)
  const [cartVis, setCartVis] = useState(false)
  const menuRef  = useRef<HTMLDivElement|null>(null)
  const secRefs  = useRef<Record<string,HTMLElement|null>>({})

  useEffect(()=>{
    if(!menuRef.current) return
    onMenuMount(menuRef.current.offsetTop)
  },[])

  useEffect(()=>{
    const onScroll=()=>{
      if(menuRef.current) setCartVis(menuRef.current.getBoundingClientRect().top<=80)
      // scroll spy
      const sorted = sort(cats)
      let best=sorted[0]?.id||'', bestD=Infinity
      sorted.forEach(c=>{
        const el=secRefs.current[c.id]; if(!el) return
        const d=Math.abs(el.getBoundingClientRect().top-95)
        if(d<bestD){bestD=d;best=c.id}
      })
      setActiveCat(best)
    }
    window.addEventListener('scroll',onScroll,{passive:true})
    onScroll()
    return ()=>window.removeEventListener('scroll',onScroll)
  },[cats])

  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target as HTMLElement
          el.style.opacity='1'; el.style.transform='translateY(0)'
        }
      })
    },{threshold:0.08})
    document.querySelectorAll('.pcard').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[prods.length,cats.length])

  useEffect(()=>{
    const h=(e:Event)=>{
      const id=(e as CustomEvent<string>).detail
      const el=secRefs.current[id]; if(!el) return
      window.scrollTo({top:el.offsetTop-100,behavior:'smooth'})
    }
    window.addEventListener('goCat',h)
    return ()=>window.removeEventListener('goCat',h)
  },[])

  return (
    <>
      {modal && <ProductModal product={modal} addons={addons} onClose={()=>setModal(null)} onAdd={item=>{onAdd(item);setModal(null)}}/>}

      {/* Banners */}
      <div style={{padding:'70px 16px 0',maxWidth:1100,margin:'0 auto'}}>
        <div ref={bannersRef}><Banners banners={banners}/></div>
      </div>

      {/* Menu + Cart */}
      <div ref={menuRef} style={{maxWidth:1100,margin:'28px auto 0',padding:'0 16px'}}>
        <div style={{display:'flex',gap:20,alignItems:'flex-start'}}>
          {/* Products */}
          <div style={{flex:1,minWidth:0}}>
            {sort(cats).map(cat=>{
              const items=sort(prods.filter(p=>p.categoryId===cat.id))
              if(!items.length) return null
              return (
                <section key={cat.id} ref={el=>{secRefs.current[cat.id]=el}} style={{marginBottom:48}}>
                  <h2 style={{fontFamily:'Russo One,sans-serif',fontSize:24,color:C.text,marginBottom:18}}>{cat.name}</h2>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14}}>
                    {items.map((p,i)=>(
                      <PCard key={p.id} p={p} delay={i*60}
                        cartItem={cart.find(c=>c.productId===p.id)}
                        onClick={()=>setModal(p)}
                        onAdd={e=>{e.stopPropagation(); const ex=cart.find(c=>c.productId===p.id&&!c.addons.length); ex?onQty(ex.id,ex.quantity+1):onAdd({productId:p.id,quantity:1,addons:[]})}}
                        onQty={onQty}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* Cart sidebar */}
          <CartPanel cart={cart} prods={prods} dm={dm} onDm={onDm} onQty={onQty} onRm={onRm} visible={cartVis}/>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter onNav={onNav} onBanners={()=>bannersRef.current?.scrollIntoView({behavior:'smooth'})}/>
    </>
  )
}

/* ─────────────── BANNERS ─────────────── */
function Banners({banners}:{banners:Banner[]}) {
  const s=sort(banners)
  const [idx,setIdx]=useState(0)
  useEffect(()=>{
    const t=setInterval(()=>setIdx(c=>(c+1)%s.length),5000)
    return ()=>clearInterval(t)
  },[s.length])
  if(!s.length) return null
  const go=(i:number)=>setIdx((i+s.length)%s.length)
  return (
    <div style={{position:'relative',borderRadius:18,overflow:'hidden',height:280,background:'#1C1208'}}>
      {s.map((b,i)=>(
        <div key={b.id} style={{position:'absolute',inset:0,transition:'opacity .65s',opacity:i===idx?1:0,pointerEvents:i===idx?'auto':'none'}}>
          <img src={b.image} alt={b.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(13,8,3,.85) 38%,rgba(13,8,3,.05) 100%)',display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 44px'}}>
            <h2 style={{fontFamily:'Russo One,sans-serif',fontSize:30,color:C.text,marginBottom:6,lineHeight:1.2}}>{b.title}</h2>
            <p style={{fontSize:15,fontWeight:700,color:C.orange}}>{b.subtitle}</p>
          </div>
        </div>
      ))}
      {/* dots */}
      <div style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)',display:'flex',gap:5}}>
        {s.map((_,i)=><button key={i} onClick={()=>go(i)} style={{border:'none',cursor:'pointer',borderRadius:4,padding:0,width:i===idx?20:7,height:7,background:i===idx?C.orange:'rgba(255,255,255,.35)',transition:'all .3s'}}/>)}
      </div>
      {/* arrows */}
      {(['prev','next'] as const).map(dir=>(
        <button key={dir} onClick={()=>go(idx+(dir==='next'?1:-1))} style={{position:'absolute',top:'50%',transform:'translateY(-50%)',[dir==='prev'?'left':'right']:10,width:36,height:36,borderRadius:18,background:'rgba(13,8,3,.55)',border:`1px solid rgba(240,114,0,.35)`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d={dir==='prev'?'M8 1.5L3.5 6 8 10.5':'M4 1.5L8.5 6 4 10.5'} stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      ))}
    </div>
  )
}

/* ─────────────── PRODUCT CARD ─────────────── */
function PCard({p,delay,cartItem,onClick,onAdd,onQty}:{
  p:Product; delay:number; cartItem?:CartItem
  onClick:()=>void; onAdd:(e:React.MouseEvent)=>void; onQty:(id:string,q:number)=>void
}) {
  const [hov,setHov]=useState(false)
  return (
    <div
      className="pcard" onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:C.surface, border:`1px solid rgba(240,114,0,0.12)`, borderRadius:16,
        overflow:'hidden', cursor:'pointer', display:'flex', flexDirection:'column',
        opacity:0, transform:'translateY(22px)',
        transition:`opacity .45s ease ${delay}ms, transform .45s ease ${delay}ms, box-shadow .25s`,
        boxShadow:hov?'0 8px 32px rgba(240,114,0,0.15)':'none',
      }}
    >
      <div style={{height:160,overflow:'hidden',flexShrink:0}}>
        <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .4s',transform:hov?'scale(1.07)':'scale(1)'}}/>
      </div>
      <div style={{padding:'12px 12px 12px',display:'flex',flexDirection:'column',flex:1,gap:3}}>
        <p style={{fontFamily:'Russo One,sans-serif',fontSize:14,color:C.text,lineHeight:1.3}}>{p.name}</p>
        <p style={{fontSize:11,fontWeight:700,color:C.orange}}>{p.weight}</p>
        <p style={{fontSize:11,color:C.muted,lineHeight:1.5,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{p.composition}</p>
        <div style={{marginTop:'auto',paddingTop:8,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontFamily:'Russo One,sans-serif',fontSize:16,color:C.text}}>{p.price}₽</span>
          <div style={{opacity:hov?1:0,transform:hov?'scale(1)':'scale(.8)',transition:'opacity .2s,transform .2s'}} onClick={e=>e.stopPropagation()}>
            {cartItem
              ? <QtyRow qty={cartItem.quantity} onMinus={()=>onQty(cartItem.id,cartItem.quantity-1)} onPlus={()=>onQty(cartItem.id,cartItem.quantity+1)}/>
              : <button onClick={onAdd} style={{background:C.orange,color:'#fff',border:'none',borderRadius:9,padding:'6px 13px',fontSize:12,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer'}}>Добавить</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── QTY ROW ─────────────── */
function QtyRow({qty,onMinus,onPlus}:{qty:number;onMinus:()=>void;onPlus:()=>void}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:5}}>
      <QBtn onClick={onMinus}>−</QBtn>
      <span style={{fontSize:13,fontWeight:700,color:C.text,minWidth:16,textAlign:'center'}}>{qty}</span>
      <QBtn onClick={onPlus}>+</QBtn>
    </div>
  )
}
function QBtn({onClick,children}:{onClick:()=>void;children:React.ReactNode}) {
  return <button onClick={onClick} style={{width:28,height:28,borderRadius:7,border:`1px solid rgba(240,114,0,.45)`,background:'rgba(240,114,0,.1)',color:C.orange,fontSize:16,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{children}</button>
}

/* ─────────────── PRODUCT MODAL ─────────────── */
function ProductModal({product,addons,onClose,onAdd}:{product:Product;addons:Addon[];onClose:()=>void;onAdd:(i:Omit<CartItem,'id'>)=>void}) {
  const [qty,setQty]=useState(1)
  const [aqty,setAqty]=useState<Record<string,number>>({})

  const addonTotal=addons.reduce((s,a)=>s+(aqty[a.id]||0)*a.price,0)
  const total=product.price*qty+addonTotal

  const chAddon=(id:string,d:number)=>setAqty(prev=>{
    const n=Math.max(0,(prev[id]||0)+d)
    if(n===0){const{[id]:_,...r}=prev; return r}
    return {...prev,[id]:n}
  })

  return (
    <div onClick={e=>{if(e.target===e.currentTarget)onClose()}} style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,.78)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',display:'flex',alignItems:'center',justifyContent:'center',padding:14}}>
      <div style={{background:C.surface,borderRadius:22,border:`1px solid ${C.border}`,width:'100%',maxWidth:700,maxHeight:'90vh',overflowY:'auto',position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute',top:12,right:12,zIndex:10,width:32,height:32,borderRadius:16,background:'rgba(240,114,0,.14)',border:'none',cursor:'pointer',color:C.orange,fontSize:15,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>

        <div style={{display:'flex',flexDirection:'row',minHeight:280}}>
          {/* Photo */}
          <div style={{flexShrink:0,width:260}}>
            <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'22px 0 0 22px',minHeight:260}}/>
          </div>
          {/* Info */}
          <div style={{flex:1,padding:'22px 20px 18px',display:'flex',flexDirection:'column',gap:10}}>
            <div>
              <h2 style={{fontFamily:'Russo One,sans-serif',fontSize:20,color:C.text,marginBottom:5}}>{product.name}</h2>
              <p style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:3}}>{product.composition}</p>
              <p style={{fontSize:12,fontWeight:700,color:C.orange}}>{product.weight}</p>
            </div>
            {/* Addons */}
            {addons.length>0 && (
              <div>
                <p style={{fontSize:10,fontWeight:800,color:C.muted,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:7}}>Добавки</p>
                <div style={{display:'flex',flexDirection:'column',gap:7}}>
                  {addons.map(a=>{
                    const aq=aqty[a.id]||0
                    return (
                      <div key={a.id} style={{display:'flex',alignItems:'center',gap:9,background:'rgba(240,114,0,.06)',border:'1px solid rgba(240,114,0,.12)',borderRadius:11,padding:'7px 10px'}}>
                        <img src={a.image} alt={a.name} style={{width:40,height:40,borderRadius:8,objectFit:'cover',flexShrink:0}}/>
                        <div style={{flex:1,minWidth:0}}>
                          <p style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:1}}>{a.name}</p>
                          <p style={{fontSize:10,color:C.muted}}>{a.weight}</p>
                        </div>
                        {aq===0
                          ? <button onClick={()=>chAddon(a.id,1)} style={{background:'rgba(240,114,0,.12)',border:'none',borderRadius:7,color:C.orange,fontSize:12,fontWeight:800,padding:'3px 9px',cursor:'pointer'}}>+{a.price}₽</button>
                          : <QtyRow qty={aq} onMinus={()=>chAddon(a.id,-1)} onPlus={()=>chAddon(a.id,1)}/>
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {/* Bottom */}
            <div style={{marginTop:'auto',paddingTop:14,borderTop:'1px solid rgba(240,114,0,.14)',display:'flex',alignItems:'center',gap:10}}>
              <QtyRow qty={qty} onMinus={()=>setQty(q=>Math.max(1,q-1))} onPlus={()=>setQty(q=>q+1)}/>
              <div style={{flex:1}}/>
              <span style={{fontFamily:'Russo One,sans-serif',fontSize:18,color:C.text}}>{total}₽</span>
              <button onClick={()=>onAdd({productId:product.id,quantity:qty,addons:Object.entries(aqty).map(([addonId,quantity])=>({addonId,quantity}))})} style={{background:C.orange,color:'#fff',border:'none',borderRadius:10,padding:'9px 20px',fontSize:13,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer'}}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── CART PANEL ─────────────── */
function CartPanel({cart,prods,dm,onDm,onQty,onRm,visible}:{cart:CartItem[];prods:Product[];dm:DeliveryMode;onDm:(m:DeliveryMode)=>void;onQty:(id:string,q:number)=>void;onRm:(id:string)=>void;visible:boolean}) {
  const itemsTotal=cart.reduce((s,i)=>{const p=prods.find(x=>x.id===i.productId); return s+(p?p.price*i.quantity:0)},0)
  const FREE=800, delivery=dm==='delivery'&&itemsTotal<FREE?149:0
  const progress=Math.min(100,(itemsTotal/FREE)*100)

  return (
    <div style={{width:290,flexShrink:0,opacity:visible?1:0,transform:visible?'translateX(0)':'translateX(28px)',pointerEvents:visible?'auto':'none',transition:'opacity .4s,transform .4s'}}>
      <div style={{position:'sticky',top:76,background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,padding:18,maxHeight:'calc(100vh - 96px)',overflowY:'auto',display:'flex',flexDirection:'column',gap:14}}>
        <h3 style={{fontFamily:'Russo One,sans-serif',fontSize:17,color:C.text}}>Ваш заказ</h3>

        {/* Delivery toggle */}
        <div style={{display:'flex',borderRadius:18,overflow:'hidden',border:`1.5px solid ${C.orange}`}}>
          {(['delivery','pickup'] as DeliveryMode[]).map(m=>(
            <button key={m} onClick={()=>onDm(m)} style={{flex:1,padding:'6px 0',fontSize:11,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer',border:'none',background:dm===m?C.orange:'rgba(13,8,3,.5)',color:dm===m?'#fff':C.orange,transition:'all .2s'}}>
              {m==='delivery'?'Доставка':'Самовывоз'}
            </button>
          ))}
        </div>

        {cart.length===0
          ? <p style={{fontSize:13,color:C.muted,textAlign:'center',padding:'16px 0'}}>Корзина пуста</p>
          : <>
            {/* Items */}
            <div style={{display:'flex',flexDirection:'column',gap:11}}>
              {cart.map(item=>{
                const p=prods.find(x=>x.id===item.productId); if(!p) return null
                return (
                  <div key={item.id} style={{display:'flex',gap:9,alignItems:'flex-start'}}>
                    <img src={p.image} alt={p.name} style={{width:48,height:48,borderRadius:9,objectFit:'cover',flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:12,fontWeight:700,color:C.text,lineHeight:1.3,marginBottom:3}}>{p.name}</p>
                      <p style={{fontSize:12,fontWeight:800,color:C.orange}}>{p.price}₽</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:3}}>
                      <button onClick={()=>onRm(item.id)} style={{background:'none',border:'none',cursor:'pointer',color:C.muted,fontSize:12}}>✕</button>
                      <QtyRow qty={item.quantity} onMinus={()=>onQty(item.id,item.quantity-1)} onPlus={()=>onQty(item.id,item.quantity+1)}/>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Progress */}
            {dm==='delivery'&&itemsTotal<FREE&&(
              <div style={{background:'rgba(240,114,0,.07)',borderRadius:10,padding:'9px 11px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.muted,marginBottom:5}}>
                  <span>До бесплатной доставки</span><span style={{color:C.orange}}>{FREE-itemsTotal}₽</span>
                </div>
                <div style={{height:4,borderRadius:2,background:'rgba(240,114,0,.15)'}}>
                  <div style={{height:'100%',width:`${progress}%`,background:C.orange,borderRadius:2,transition:'width .4s'}}/>
                </div>
              </div>
            )}

            {/* Totals */}
            <div style={{borderTop:'1px solid rgba(240,114,0,.12)',paddingTop:10,display:'flex',flexDirection:'column',gap:5}}>
              <TRow label="Товары" val={`${itemsTotal}₽`}/>
              {dm==='delivery'&&<TRow label="Доставка" val={itemsTotal>=FREE?'Бесплатно':`${delivery}₽`} green={itemsTotal>=FREE}/>}
            </div>

            <button style={{background:C.orange,color:'#fff',border:'none',borderRadius:11,padding:'11px 0',fontSize:14,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',paddingLeft:18,paddingRight:18}}>
              <span>К оформлению</span><span>{itemsTotal+delivery}₽</span>
            </button>
          </>
        }
      </div>
    </div>
  )
}
function TRow({label,val,green}:{label:string;val:string;green?:boolean}) {
  return <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:C.muted}}><span>{label}</span><span style={{color:green?'#4ade80':undefined}}>{val}</span></div>
}

/* ─────────────── FOOTER ─────────────── */
function SiteFooter({onNav,onBanners}:{onNav:(p:Page)=>void;onBanners:()=>void}) {
  return (
    <footer style={{marginTop:70,padding:'44px 20px',background:'#0A0602',borderTop:'1px solid rgba(240,114,0,.12)'}}>
      <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:32,alignItems:'start'}}>
        <div style={{display:'flex',flexDirection:'column',gap:11}}>
          <FLabel>Заведение</FLabel>
          <FLink onClick={()=>onNav('about')}>О нас</FLink>
          <FLink onClick={onBanners}>Акции</FLink>
          <FLink onClick={()=>{}}>Отзывы</FLink>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          <img src={logoImg} alt="Шашлыковский" style={{height:72,objectFit:'contain',opacity:.88}}/>
          <p style={{fontSize:10,color:'#604030',textAlign:'center'}}>© {new Date().getFullYear()} Шашлыковский</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:11,alignItems:'flex-end'}}>
          <FLabel>Документы</FLabel>
          <FLink onClick={()=>{}}>Публичная оферта</FLink>
          <FLink onClick={()=>{}}>Политика конфиденциальности</FLink>
        </div>
      </div>
    </footer>
  )
}
function FLabel({children}:{children:React.ReactNode}) {
  return <p style={{fontSize:9,fontWeight:800,color:'#604030',textTransform:'uppercase',letterSpacing:'.1em'}}>{children}</p>
}
function FLink({onClick,children}:{onClick:()=>void;children:React.ReactNode}) {
  const [h,setH]=useState(false)
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'Nunito,sans-serif',color:h?C.orange:'#C8A880',transition:'color .2s',textAlign:'left',padding:0}}>{children}</button>
}

/* ═══════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════ */
function AboutPage({onNav}:{onNav:(p:Page)=>void}) {
  return (
    <div style={{background:C.bg,minHeight:'100vh'}}>
      <div style={{maxWidth:680,margin:'0 auto',padding:'90px 20px 40px'}}>
        <button onClick={()=>onNav('home')} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,fontWeight:700,color:C.muted,fontFamily:'Nunito,sans-serif',marginBottom:28,display:'flex',alignItems:'center',gap:6}}>← Назад в меню</button>
        <div style={{textAlign:'center',marginBottom:36}}>
          <img src={logoImg} alt="logo" style={{height:100,objectFit:'contain',marginBottom:14}}/>
          <h1 style={{fontFamily:'Russo One,sans-serif',fontSize:32,color:C.text}}>О нас</h1>
        </div>
        {[
          {t:'Наша история',c:'Шашлыковский открылся в 2024 году с одной простой идеей — готовить честную уличную еду на живом огне. Мы берём качественное мясо, свежие овощи и хороший огонь. Результат говорит сам за себя.'},
          {t:'Принципы',c:['Только свежее мясо — без заморозок','Готовим при заказе — ждём, но оно того стоит','Честная цена — без скрытых наценок','Всегда горячее — даже при доставке']},
          {t:'Контакты',c:'г. Москва, ул. Примерная, д. 12\nЕжедневно 10:00 – 23:00\n+7 (999) 123-45-67'},
        ].map(({t,c})=>(
          <div key={t} style={{background:C.surface,border:`1px solid rgba(240,114,0,.14)`,borderRadius:18,padding:22,marginBottom:14}}>
            <h2 style={{fontFamily:'Russo One,sans-serif',fontSize:18,color:C.orange,marginBottom:10}}>{t}</h2>
            {Array.isArray(c)
              ? <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:7}}>{c.map(x=><li key={x} style={{fontSize:13,color:'#C8A880',display:'flex',gap:9}}><span style={{color:C.orange,marginTop:1}}>●</span>{x}</li>)}</ul>
              : <p style={{fontSize:13,color:'#C8A880',lineHeight:1.75,whiteSpace:'pre-line'}}>{c}</p>
            }
          </div>
        ))}
      </div>
      <SiteFooter onNav={onNav} onBanners={()=>onNav('home')}/>
    </div>
  )
}

/* ═══════════════════════════════════════════
   ADMIN PAGE
═══════════════════════════════════════════ */
function AdminPage({prods,cats,banners,addons,onSave,onBack}:{
  prods:Product[];cats:Category[];banners:Banner[];addons:Addon[]
  onSave:(p:Product[],c:Category[],b:Banner[],a:Addon[])=>void
  onBack:()=>void
}) {
  const [tab,setTab]=useState<'products'|'categories'|'banners'|'addons'>('products')
  const [lp,setLp]=useState(prods)
  const [lc,setLc]=useState(cats)
  const [lb,setLb]=useState(banners)
  const [la,setLa]=useState(addons)
  const [editP,setEditP]=useState<Product|null>(null)
  const [editB,setEditB]=useState<Banner|null>(null)
  const [editA,setEditA]=useState<Addon|null>(null)
  const [flash,setFlash]=useState(false)

  const save=()=>{onSave(lp,lc,lb,la);setFlash(true);setTimeout(()=>setFlash(false),1800)}

  const TABS=[{id:'products',l:'Товары'},{id:'categories',l:'Категории'},{id:'banners',l:'Баннеры'},{id:'addons',l:'Добавки'}] as const

  return (
    <div style={{background:C.bg,minHeight:'100vh',padding:'76px 18px 50px'}}>
      <div style={{maxWidth:860,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:26}}>
          <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,fontWeight:700,color:C.muted,fontFamily:'Nunito,sans-serif'}}>← На сайт</button>
          <h1 style={{fontFamily:'Russo One,sans-serif',fontSize:26,color:C.text,flex:1}}>Админ-панель</h1>
          <button onClick={save} style={{background:flash?'#22c55e':C.orange,color:'#fff',border:'none',borderRadius:11,padding:'9px 22px',fontSize:13,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer',transition:'background .3s'}}>
            {flash?'✓ Сохранено':'Сохранить'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:7,marginBottom:20,flexWrap:'wrap'}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'7px 18px',borderRadius:18,fontSize:12,fontWeight:700,fontFamily:'Nunito,sans-serif',cursor:'pointer',background:tab===t.id?C.orange:'rgba(240,114,0,.08)',color:tab===t.id?'#fff':C.orange,border:`1.5px solid ${tab===t.id?C.orange:'rgba(240,114,0,.25)'}`,transition:'all .2s'}}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Products */}
        {tab==='products'&&<>
          <Abtn onClick={()=>{const n:Product={id:`p${Date.now()}`,categoryId:lc[0]?.id||'',name:'Новый товар',weight:'',composition:'',price:300,image:'',order:lp.length};setLp([...lp,n]);setEditP(n)}}>+ Добавить товар</Abtn>
          {editP&&<PForm p={editP} cats={lc} onSave={p=>{setLp(lp.map(x=>x.id===p.id?p:x));setEditP(null)}} onCancel={()=>setEditP(null)}/>}
          {sort(lp).map(p=>(
            <ARow key={p.id} img={p.image} title={p.name} sub={`${lc.find(c=>c.id===p.categoryId)?.name||'—'} · ${p.weight} · ${p.price}₽`}
              onUp={()=>setLp(moveItem(lp,p.id,-1))} onDown={()=>setLp(moveItem(lp,p.id,1))}
              onEdit={()=>setEditP(p)} onDel={()=>setLp(lp.filter(x=>x.id!==p.id))}/>
          ))}
        </>}

        {/* Categories */}
        {tab==='categories'&&<>
          <Abtn onClick={()=>setLc([...lc,{id:`c${Date.now()}`,name:'Новая категория',order:lc.length}])}>+ Добавить категорию</Abtn>
          {sort(lc).map(c=>(
            <div key={c.id} style={{display:'flex',alignItems:'center',gap:10,background:C.surface,border:`1px solid rgba(240,114,0,.13)`,borderRadius:13,padding:'9px 14px',marginBottom:7}}>
              <input value={c.name} onChange={e=>setLc(lc.map(x=>x.id===c.id?{...x,name:e.target.value}:x))} style={{flex:1,background:'transparent',border:'none',borderBottom:'1px solid rgba(240,114,0,.22)',color:C.text,fontSize:13,fontWeight:700,fontFamily:'Nunito,sans-serif',outline:'none',padding:'2px 0'}}/>
              <AIco onClick={()=>setLc(moveItem(lc,c.id,-1))}>↑</AIco>
              <AIco onClick={()=>setLc(moveItem(lc,c.id,1))}>↓</AIco>
              <AIco red onClick={()=>setLc(lc.filter(x=>x.id!==c.id))}>✕</AIco>
            </div>
          ))}
        </>}

        {/* Banners */}
        {tab==='banners'&&<>
          <Abtn onClick={()=>{const n:Banner={id:`b${Date.now()}`,title:'Новый баннер',subtitle:'',image:'',order:lb.length};setLb([...lb,n]);setEditB(n)}}>+ Добавить баннер</Abtn>
          {editB&&<BForm b={editB} onSave={b=>{setLb(lb.map(x=>x.id===b.id?b:x));setEditB(null)}} onCancel={()=>setEditB(null)}/>}
          {sort(lb).map(b=>(
            <ARow key={b.id} img={b.image} title={b.title} sub={b.subtitle}
              onUp={()=>setLb(moveItem(lb,b.id,-1))} onDown={()=>setLb(moveItem(lb,b.id,1))}
              onEdit={()=>setEditB(b)} onDel={()=>setLb(lb.filter(x=>x.id!==b.id))}/>
          ))}
        </>}

        {/* Addons */}
        {tab==='addons'&&<>
          <Abtn onClick={()=>{const n:Addon={id:`a${Date.now()}`,name:'Новая добавка',weight:'',price:50,image:''};setLa([...la,n]);setEditA(n)}}>+ Добавить добавку</Abtn>
          {editA&&<AForm a={editA} onSave={a=>{setLa(la.map(x=>x.id===a.id?a:x));setEditA(null)}} onCancel={()=>setEditA(null)}/>}
          {la.map(a=>(
            <ARow key={a.id} img={a.image} title={a.name} sub={`${a.weight} · ${a.price}₽`}
              onEdit={()=>setEditA(a)} onDel={()=>setLa(la.filter(x=>x.id!==a.id))}/>
          ))}
        </>}
      </div>

      <style>{`
        .ai{background:rgba(240,114,0,.06);border:1px solid rgba(240,114,0,.2);border-radius:9px;padding:7px 11px;color:#F2E8D0;font-size:13px;font-family:Nunito,sans-serif;width:100%;outline:none;box-sizing:border-box}
        .ai:focus{border-color:#F07200}
        .al{font-size:9px;font-weight:800;color:#705040;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;display:block}
        textarea.ai{resize:vertical}
        select.ai{background:#1C1208}
      `}</style>
    </div>
  )
}

/* Admin sub-components */
function Abtn({onClick,children}:{onClick:()=>void;children:React.ReactNode}) {
  return <button onClick={onClick} style={{background:C.orange,color:'#fff',border:'none',borderRadius:10,padding:'8px 16px',fontSize:12,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer',marginBottom:13}}>{children}</button>
}
function AIco({onClick,red,children}:{onClick?:()=>void;red?:boolean;children:React.ReactNode}) {
  return <button onClick={onClick} style={{width:28,height:28,borderRadius:7,border:'1px solid rgba(240,114,0,.2)',background:'rgba(240,114,0,.07)',color:red?'#ef4444':C.muted,cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{children}</button>
}
function ARow({img,title,sub,onUp,onDown,onEdit,onDel}:{img:string;title:string;sub:string;onUp?:()=>void;onDown?:()=>void;onEdit?:()=>void;onDel?:()=>void}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,background:C.surface,border:`1px solid rgba(240,114,0,.13)`,borderRadius:13,padding:'9px 13px',marginBottom:7}}>
      <div style={{width:44,height:44,borderRadius:9,overflow:'hidden',flexShrink:0,background:C.surface2}}>{img&&<img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>}</div>
      <div style={{flex:1,minWidth:0}}><p style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:2}}>{title}</p><p style={{fontSize:11,color:C.muted}}>{sub}</p></div>
      <div style={{display:'flex',gap:5}}>
        {onUp&&<AIco onClick={onUp}>↑</AIco>}
        {onDown&&<AIco onClick={onDown}>↓</AIco>}
        {onEdit&&<AIco onClick={onEdit}>✏</AIco>}
        {onDel&&<AIco red onClick={onDel}>✕</AIco>}
      </div>
    </div>
  )
}
function FWrap({title,onSave,onCancel,children}:{title:string;onSave:()=>void;onCancel:()=>void;children:React.ReactNode}) {
  return (
    <div style={{background:C.surface2,border:`1px solid rgba(240,114,0,.2)`,borderRadius:16,padding:18,marginBottom:14}}>
      <p style={{fontFamily:'Russo One,sans-serif',fontSize:14,color:C.text,marginBottom:14}}>{title}</p>
      {children}
      <div style={{display:'flex',gap:9,marginTop:14}}>
        <button onClick={onSave} style={{background:C.orange,color:'#fff',border:'none',borderRadius:9,padding:'8px 18px',fontSize:12,fontWeight:800,fontFamily:'Nunito,sans-serif',cursor:'pointer'}}>Сохранить</button>
        <button onClick={onCancel} style={{background:'rgba(240,114,0,.07)',border:`1px solid rgba(240,114,0,.18)`,borderRadius:9,padding:'8px 18px',fontSize:12,fontWeight:700,fontFamily:'Nunito,sans-serif',color:C.muted,cursor:'pointer'}}>Отмена</button>
      </div>
    </div>
  )
}
function G2({children}:{children:React.ReactNode}){return <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>{children}</div>}
function FG({label,children}:{label:string;children:React.ReactNode}){return <div><label className="al">{label}</label>{children}</div>}

function PForm({p,cats,onSave,onCancel}:{p:Product;cats:Category[];onSave:(p:Product)=>void;onCancel:()=>void}) {
  const [f,setF]=useState(p)
  const s=(k:keyof Product,v:string|number)=>setF(x=>({...x,[k]:v}))
  return (
    <FWrap title="Редактировать товар" onSave={()=>onSave(f)} onCancel={onCancel}>
      <G2>
        <FG label="Название"><input className="ai" value={f.name} onChange={e=>s('name',e.target.value)}/></FG>
        <FG label="Категория"><select className="ai" value={f.categoryId} onChange={e=>s('categoryId',e.target.value)}>{cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></FG>
        <FG label="Вес"><input className="ai" value={f.weight} onChange={e=>s('weight',e.target.value)}/></FG>
        <FG label="Цена ₽"><input className="ai" type="number" value={f.price} onChange={e=>s('price',+e.target.value)}/></FG>
        <div style={{gridColumn:'1/-1'}}><FG label="Состав"><textarea className="ai" rows={2} value={f.composition} onChange={e=>s('composition',e.target.value)}/></FG></div>
        <div style={{gridColumn:'1/-1'}}><FG label="URL фото"><input className="ai" value={f.image} onChange={e=>s('image',e.target.value)}/></FG></div>
      </G2>
    </FWrap>
  )
}
function BForm({b,onSave,onCancel}:{b:Banner;onSave:(b:Banner)=>void;onCancel:()=>void}) {
  const [f,setF]=useState(b)
  const s=(k:keyof Banner,v:string)=>setF(x=>({...x,[k]:v}))
  return (
    <FWrap title="Редактировать баннер" onSave={()=>onSave(f)} onCancel={onCancel}>
      <G2>
        <FG label="Заголовок"><input className="ai" value={f.title} onChange={e=>s('title',e.target.value)}/></FG>
        <FG label="Подзаголовок"><input className="ai" value={f.subtitle} onChange={e=>s('subtitle',e.target.value)}/></FG>
        <div style={{gridColumn:'1/-1'}}><FG label="URL фото"><input className="ai" value={f.image} onChange={e=>s('image',e.target.value)}/></FG></div>
      </G2>
    </FWrap>
  )
}
function AForm({a,onSave,onCancel}:{a:Addon;onSave:(a:Addon)=>void;onCancel:()=>void}) {
  const [f,setF]=useState(a)
  const s=(k:keyof Addon,v:string|number)=>setF(x=>({...x,[k]:v}))
  return (
    <FWrap title="Редактировать добавку" onSave={()=>onSave(f)} onCancel={onCancel}>
      <G2>
        <FG label="Название"><input className="ai" value={f.name} onChange={e=>s('name',e.target.value)}/></FG>
        <FG label="Вес"><input className="ai" value={f.weight} onChange={e=>s('weight',e.target.value)}/></FG>
        <FG label="Цена ₽"><input className="ai" type="number" value={f.price} onChange={e=>s('price',+e.target.value)}/></FG>
        <FG label="URL фото"><input className="ai" value={f.image} onChange={e=>s('image',e.target.value)}/></FG>
      </G2>
    </FWrap>
  )
}
