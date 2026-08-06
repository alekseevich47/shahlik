import type { Category, Product, Banner, Addon } from './types';

export const defaultCategories: Category[] = [
  { id: 'lavash',   name: 'В лаваше',       order: 0 },
  { id: 'combo',    name: 'Комбо',           order: 1 },
  { id: 'fries',    name: 'Картофель фри',   order: 2 },
  { id: 'grill',    name: 'Гриль',           order: 3 },
  { id: 'shawarma', name: 'Шаурма',          order: 4 },
  { id: 'pizza',    name: 'Пицца',           order: 5 },
  { id: 'drinks',   name: 'Напитки',         order: 6 },
  { id: 'sauces',   name: 'Соусы',           order: 7 },
];

export const defaultAddons: Addon[] = [
  { id: 'a1', name: 'Доп. мясо',           weight: '100г', price: 120, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=120&h=120&fit=crop&auto=format' },
  { id: 'a2', name: 'Сыр',                 weight: '30г',  price: 60,  image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=120&h=120&fit=crop&auto=format' },
  { id: 'a3', name: 'Соус чесночный',      weight: '50г',  price: 50,  image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=120&h=120&fit=crop&auto=format' },
  { id: 'a4', name: 'Соус острый',         weight: '50г',  price: 50,  image: 'https://images.unsplash.com/photo-1607198179219-5b7f8c4ee07c?w=120&h=120&fit=crop&auto=format' },
  { id: 'a5', name: 'Маринованные огурцы', weight: '40г',  price: 30,  image: 'https://images.unsplash.com/photo-1589621316382-008455b857cd?w=120&h=120&fit=crop&auto=format' },
  { id: 'a6', name: 'Картофель фри',       weight: '150г', price: 130, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&h=120&fit=crop&auto=format' },
];

export const defaultProducts: Product[] = [
  // В лаваше
  { id: 'p1',  categoryId: 'lavash',   name: 'Лаваш с курицей',      weight: '350г', composition: 'Лаваш, курица гриль, помидоры, огурцы, лук, соус чесночный, зелень',             price: 290, image: 'https://images.unsplash.com/photo-1599487488310-f66323f71dc8?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p2',  categoryId: 'lavash',   name: 'Лаваш с говядиной',    weight: '380г', composition: 'Лаваш, говядина гриль, перец болгарский, помидоры, зелень, соус ткемали',         price: 340, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p3',  categoryId: 'lavash',   name: 'Лаваш овощной',        weight: '300г', composition: 'Лаваш, баклажан, перец, помидоры, кабачок, зелень, соус острый',                  price: 220, image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Комбо
  { id: 'p4',  categoryId: 'combo',    name: 'Комбо Стандарт',       weight: '750г', composition: 'Шаурма классическая + картофель фри + напиток 0.5л на выбор',                     price: 520, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p5',  categoryId: 'combo',    name: 'Комбо Семейный',       weight: '1400г',composition: '2 шаурмы + картофель фри большой + 2 напитка + 2 соуса',                           price: 980, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p6',  categoryId: 'combo',    name: 'Комбо Пицца+',         weight: '900г', composition: 'Пицца Маргарита + 2 картофеля фри малых + 2 соуса чесночных',                     price: 720, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Картофель фри
  { id: 'p7',  categoryId: 'fries',    name: 'Картофель фри малый',  weight: '150г', composition: 'Картофель, масло растительное, соль, специи',                                      price: 130, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p8',  categoryId: 'fries',    name: 'Картофель фри большой',weight: '280г', composition: 'Картофель, масло растительное, соль, специи',                                      price: 190, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p9',  categoryId: 'fries',    name: 'По-деревенски',        weight: '250г', composition: 'Картофель, масло, розмарин, чеснок, паприка, соль',                                price: 180, image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Гриль
  { id: 'p10', categoryId: 'grill',    name: 'Шашлык свиной',        weight: '300г', composition: 'Свинина, лук, специи для шашлыка, маринад',                                        price: 480, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p11', categoryId: 'grill',    name: 'Шашлык куриный',       weight: '280г', composition: 'Куриное бедро, лимон, чеснок, зелень, специи',                                     price: 380, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p12', categoryId: 'grill',    name: 'Люля-кебаб',           weight: '300г', composition: 'Говяжий фарш, лук репчатый, зелень, кинза, специи',                                price: 430, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Шаурма
  { id: 'p13', categoryId: 'shawarma', name: 'Шаурма классическая',  weight: '400г', composition: 'Лаваш, курица гриль, капуста, помидоры, огурцы, соус чесночный',                   price: 320, image: 'https://images.unsplash.com/photo-1599487488310-f66323f71dc8?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p14', categoryId: 'shawarma', name: 'Шаурма острая',        weight: '380г', composition: 'Лаваш, курица, халапеньо, лук красный, помидоры, соус острый',                     price: 340, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p15', categoryId: 'shawarma', name: 'Шаурма XXL',           weight: '600г', composition: 'Двойная порция мяса, лаваш, все овощи, два соуса на выбор',                        price: 460, image: 'https://images.unsplash.com/photo-1583835746434-cf1534674b41?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Пицца
  { id: 'p16', categoryId: 'pizza',    name: 'Маргарита',            weight: '420г', composition: 'Томатный соус, моцарелла, свежий базилик, оливковое масло',                        price: 490, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p17', categoryId: 'pizza',    name: 'Четыре сезона',        weight: '480г', composition: 'Томатный соус, моцарелла, пепперони, грибы, оливки, перец',                        price: 590, image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p18', categoryId: 'pizza',    name: 'Мясная',               weight: '520г', composition: 'Томатный соус, говядина, курица, бекон, моцарелла, лук',                           price: 650, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Напитки
  { id: 'p19', categoryId: 'drinks',   name: 'Coca-Cola 0.5л',       weight: '500мл',composition: 'Газированный напиток',                                                              price: 150, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p20', categoryId: 'drinks',   name: 'Лимонад домашний',     weight: '300мл',composition: 'Лимон, мята, сахар, газированная вода',                                             price: 120, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p21', categoryId: 'drinks',   name: 'Вода 0.5л',            weight: '500мл',composition: 'Минеральная негазированная вода',                                                    price: 60,  image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=450&fit=crop&auto=format', order: 2 },
  // Соусы
  { id: 'p22', categoryId: 'sauces',   name: 'Соус чесночный',       weight: '50г',  composition: 'Йогурт, чеснок, укроп, специи',                                                    price: 50,  image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&h=450&fit=crop&auto=format', order: 0 },
  { id: 'p23', categoryId: 'sauces',   name: 'Соус острый',          weight: '50г',  composition: 'Перец чили, чеснок, томат, уксус, специи',                                         price: 50,  image: 'https://images.unsplash.com/photo-1607198179219-5b7f8c4ee07c?w=600&h=450&fit=crop&auto=format', order: 1 },
  { id: 'p24', categoryId: 'sauces',   name: 'Ткемали',              weight: '50г',  composition: 'Сливы, чеснок, кинза, хмели-сунели, уксус',                                        price: 60,  image: 'https://images.unsplash.com/photo-1559181567-c3190958d3ab?w=600&h=450&fit=crop&auto=format', order: 2 },
];

export const defaultBanners: Banner[] = [
  { id: 'b1', title: 'Шаурма — огонь!',      subtitle: 'Сочная, с пылу с жару — каждый день свежая',          image: 'https://images.unsplash.com/photo-1599487488310-f66323f71dc8?w=900&h=400&fit=crop&auto=format', order: 0 },
  { id: 'b2', title: 'Комбо выгоднее',        subtitle: 'Шаурма + картофель + напиток — экономь 120₽',         image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=400&fit=crop&auto=format', order: 1 },
  { id: 'b3', title: 'Пицца навынос',         subtitle: 'Горячая пицца за 30 минут или бесплатно',             image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&h=400&fit=crop&auto=format', order: 2 },
  { id: 'b4', title: 'Шашлык с мангала',      subtitle: 'Мясо на живом огне по рецепту шеф-повара',            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&h=400&fit=crop&auto=format', order: 3 },
];
