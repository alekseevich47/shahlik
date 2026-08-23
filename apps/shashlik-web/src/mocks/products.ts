import type { CategoryId, KnownCategoryId } from "@/entities/category/model"
import type {
  Product,
  ProductBadge,
  ProductNutrition,
  ProductSize,
  ProductTag,
  ProductVariant,
} from "@/entities/product/model"

const MEAT_VARIANTS: ProductVariant[] = [
  { id: "chicken", label: "Курица", icon: "chicken", priceDelta: 0 },
  { id: "pork", label: "Свинина", icon: "pork", priceDelta: 20 },
]

const SHAWARMA_SIZES: ProductSize[] = [
  { id: "l", label: "L", price: 340 },
  { id: "xl", label: "XL", price: 390 },
]

const STOCK = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
  pizzaAlt: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
  shashlik: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
  combo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop",
  sides: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop",
  drinks: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800&h=600&fit=crop",
  sauce: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&h=600&fit=crop",
}

type Spec = {
  slug: string
  name: string
  emoji?: string
  tagline?: string
  composition: string
  image: string
  badge?: ProductBadge
  tags?: ProductTag[]
  nutrition?: ProductNutrition
  overall: number
  votes: number
  criteria: [number, number, number]
  articles?: [string, string, string, string]
}

const NUTRITION_BY_CATEGORY: Record<KnownCategoryId, ProductNutrition> = {
  shawarma: { kcal: 246, fat: 12, protein: 14, carbs: 22 },
  shashlik: { kcal: 198, fat: 11, protein: 23, carbs: 3 },
  pizza: { kcal: 266, fat: 10, protein: 11, carbs: 33 },
  combo: { kcal: 228, fat: 11, protein: 13, carbs: 24 },
  sides: { kcal: 176, fat: 8, protein: 4, carbs: 23 },
  drinks: { kcal: 42, fat: 0, protein: 0, carbs: 10.6 },
  sauces: { kcal: 182, fat: 16, protein: 1.5, carbs: 8 },
}

let orderSeq = 0

function shawarma(spec: Spec): Product {
  const a = spec.articles
  return product({
    ...spec,
    categoryId: "shawarma",
    variants: MEAT_VARIANTS,
    sizes: a
      ? [
          { ...SHAWARMA_SIZES[0], article: a[0] },
          { ...SHAWARMA_SIZES[1], article: a[1] },
        ]
      : SHAWARMA_SIZES,
    tagline:
      spec.tagline ??
      "Сочное мясо, свежие овощи и фирменные соусы в хрустящем лаваше с ароматом специй",
  })
}

function product(
  spec: Spec & {
    categoryId: CategoryId
    variants: ProductVariant[]
    sizes: ProductSize[]
    tagline: string
  },
): Product {
  const [taste, composition, service] = spec.criteria
  const order = orderSeq++
  return {
    id: `p-${spec.slug}`,
    slug: spec.slug,
    categoryId: spec.categoryId,
    name: spec.name,
    emoji: spec.emoji,
    tagline: spec.tagline,
    composition: spec.composition,
    image: spec.image,
    images: [spec.image],
    imageFilenames: [],
    badge: spec.badge,
    nutrition:
      spec.nutrition ?? NUTRITION_BY_CATEGORY[spec.categoryId as KnownCategoryId],
    tags: spec.tags ?? [],
    variants: spec.variants,
    sizes: spec.sizes,
    rating: {
      overall: spec.overall,
      votes: spec.votes,
      criteria: [
        { id: "taste", label: "Вкусно?", hint: "Оцените вкус блюда", value: taste },
        {
          id: "composition",
          label: "Состав",
          hint: "Оцените качество ингредиентов",
          value: composition,
        },
        { id: "service", label: "Сервис", hint: "Оцените подачу и сервис", value: service },
      ],
    },
    order,
    active: true,
    createdAt: "2024-05-12",
    updatedAt: "2024-05-24",
    stats: {
      views: 640 + order * 97,
      addedToCart: 120 + order * 31,
      orders: 60 + order * 19,
      revenue: (60 + order * 19) * 348,
    },
  }
}

export const products: Product[] = [
  shawarma({
    slug: "arabskaya",
    name: "Арабская",
    emoji: "🔥",
    badge: "hit",
    tags: ["classic"],
    image: "/products/shawarma-arabskaya.jpg",
    composition:
      "мясо, армянский лаваш, свежий огурец, помидор, лук маринованный, гранат, соус арабский",
    overall: 8.5,
    votes: 124,
    criteria: [4, 4.5, 3.5],
    articles: ["51578", "51538", "51518", "51528"],
  }),
  shawarma({
    slug: "syrnaya",
    name: "Сырная",
    emoji: "🧀",
    tags: ["cheese"],
    image: "/products/shawarma-syrnaya.jpg",
    composition:
      "мясо, армянский лаваш, свежий огурец, помидор, лук маринованный, сыр моцарелла, соус сырный",
    overall: 9,
    votes: 98,
    criteria: [4.5, 4.5, 4.5],
    articles: ["51618", "51608", "51698", "51628"],
  }),
  shawarma({
    slug: "pikantnaya",
    name: "Пикантная",
    emoji: "🌶",
    tags: ["spicy"],
    image: "/products/shawarma-pikantnaya.jpg",
    composition:
      "мясо, армянский лаваш, свежий огурец, помидор, лук маринованный, перец халапеньо, острый соус",
    overall: 9.2,
    votes: 87,
    criteria: [4.5, 4.5, 4.75],
    articles: ["51718", "51678", "51658", "51638"],
  }),
  shawarma({
    slug: "klassicheskaya",
    name: "Классическая",
    tags: ["classic"],
    image: "/products/shawarma-klassicheskaya.jpg",
    composition:
      "мясо, армянский лаваш, свежий огурец, свежий помидор, лук маринованный, соус классический, соус чесночный",
    overall: 8.5,
    votes: 210,
    criteria: [4, 4.5, 3.5],
    articles: ["51478", "51438", "51468", "51428"],
  }),
  shawarma({
    slug: "barbekyu",
    name: "Барбекю",
    emoji: "🍖",
    tags: ["bbq"],
    image: "/products/shawarma-barbekyu.jpg",
    composition:
      "мясо, армянский лаваш, свежий огурец, помидор, лук маринованный, соус барбекю",
    overall: 8.8,
    votes: 76,
    criteria: [4.5, 4, 4.5],
    articles: ["51148", "51147", "51158", "51157"],
  }),
  shawarma({
    slug: "kavkazskaya",
    name: "Кавказская",
    tags: ["spicy", "classic"],
    image: "/products/shawarma-kavkazskaya.jpg",
    composition:
      "мясо, армянский лаваш, маринованный огурец, помидор, лук маринованный, соус кавказский",
    overall: 8.6,
    votes: 64,
    criteria: [4.5, 4, 4],
    articles: ["51588", "51598", "51498", "51568"],
  }),
  shawarma({
    slug: "gavayskaya",
    name: "Гавайская",
    emoji: "🍍",
    tags: ["sweet"],
    image: "/products/shawarma-gavayskaya.jpg",
    composition: "мясо, армянский лаваш, ананасы, сыр моцарелла, соус классический",
    overall: 8.1,
    votes: 41,
    criteria: [4, 4, 4],
    articles: ["51128", "51127", "51178", "51177"],
  }),
  shawarma({
    slug: "derevenskaya",
    name: "Деревенская",
    tags: ["classic"],
    image: "/products/shawarma-derevenskaya.jpg",
    composition:
      "мясо, армянский лаваш, картофель по-деревенски, свежий огурец, помидор, соус классический",
    overall: 8.4,
    votes: 55,
    criteria: [4, 4.5, 4],
  }),
  shawarma({
    slug: "italyanskaya",
    name: "Итальянская острая",
    emoji: "🌶",
    tags: ["spicy", "cheese"],
    image: "/products/shawarma-italyanskaya.jpg",
    composition:
      "мясо, армянский лаваш, вяленые томаты, сыр моцарелла, свежий огурец, острый соус",
    overall: 8.9,
    votes: 62,
    criteria: [4.5, 4.5, 4],
  }),
  shawarma({
    slug: "meganaggets",
    name: "Меганаггетс",
    badge: "new",
    tags: ["classic"],
    image: "/products/shawarma-meganaggets.jpg",
    composition: "куриные наггетсы, армянский лаваш, свежий огурец, помидор, соус классический",
    overall: 8.7,
    votes: 38,
    criteria: [4.5, 4, 4.5],
  }),
  shawarma({
    slug: "frensis-bekon",
    name: "Френсис бекон",
    tags: ["bbq"],
    image: "/products/shawarma-frensis-bekon.jpg",
    composition: "мясо, бекон, армянский лаваш, свежий огурец, помидор, соус барбекю",
    overall: 9.1,
    votes: 73,
    criteria: [4.5, 4.5, 4.5],
  }),
  shawarma({
    slug: "chesnochnaya",
    name: "Чесночная",
    tags: ["classic"],
    image: "/products/shawarma-chesnochnaya.jpg",
    composition:
      "мясо, армянский лаваш, свежий огурец, помидор, лук маринованный, соус чесночный",
    overall: 8.3,
    votes: 49,
    criteria: [4, 4, 4.5],
  }),

  product({
    slug: "shashlik-v-lavashe",
    name: "Шашлык в лаваше",
    emoji: "🔥",
    badge: "hit",
    categoryId: "shashlik",
    tags: ["bbq"],
    image: "/products/shashlik-lavash-kur.jpg",
    tagline: "Мясо с мангала, завёрнутое в тонкий лаваш с овощами и соусом",
    composition: "шашлык с мангала, лаваш, свежие овощи, соус классический",
    variants: [
      { id: "chicken", label: "Курица", icon: "chicken", priceDelta: 0 },
      { id: "pork", label: "Свинина", icon: "pork", priceDelta: 20 },
    ],
    sizes: [{ id: "portion", label: "порция", price: 340, article: "21133" }],
    overall: 9.3,
    votes: 156,
    criteria: [4.75, 4.5, 4.5],
  }),
  product({
    slug: "shashlik-sheya",
    name: "Шашлык свиная шея",
    categoryId: "shashlik",
    tags: ["bbq"],
    image: "/products/shashlik-lavash-sheya.jpg",
    tagline: "Классическая свиная шея на углях с маринованным луком",
    composition: "свиная шея, маринованный лук, лаваш, соус шашлыковский",
    variants: [],
    sizes: [{ id: "portion", label: "порция", price: 450, article: "21131" }],
    overall: 9.4,
    votes: 132,
    criteria: [5, 4.5, 4.5],
  }),
  product({
    slug: "shashlik-kuritsa-bedro",
    name: "Шашлык куриное бедро",
    categoryId: "shashlik",
    tags: ["bbq"],
    image: STOCK.shashlik,
    tagline: "Сочное куриное бедро на мангале",
    composition: "куриное бедро, специи, маринованный лук",
    variants: [],
    sizes: [{ id: "portion", label: "порция", price: 340, article: "21134" }],
    overall: 8.9,
    votes: 88,
    criteria: [4.5, 4.5, 4],
  }),

  product({
    slug: "pizza-pepperoni",
    name: "Пепперони",
    emoji: "🍕",
    categoryId: "pizza",
    tags: ["spicy", "cheese"],
    image: STOCK.pizza,
    tagline: "Острая пепперони, моцарелла и томатный соус на тонком тесте",
    composition: "тесто, томатный соус, моцарелла, пепперони, орегано",
    variants: [],
    sizes: [
      { id: "30", label: "30 см", price: 520 },
      { id: "40", label: "40 см", price: 720 },
    ],
    overall: 8.8,
    votes: 64,
    criteria: [4.5, 4.5, 4],
  }),
  product({
    slug: "pizza-chetyre-syra",
    name: "Четыре сыра",
    emoji: "🧀",
    categoryId: "pizza",
    tags: ["cheese"],
    image: STOCK.pizzaAlt,
    tagline: "Моцарелла, дорблю, пармезан и чеддер на сливочной основе",
    composition: "тесто, сливочный соус, моцарелла, дорблю, пармезан, чеддер",
    variants: [],
    sizes: [
      { id: "30", label: "30 см", price: 560 },
      { id: "40", label: "40 см", price: 760 },
    ],
    overall: 9,
    votes: 51,
    criteria: [4.5, 4.5, 4.5],
  }),

  product({
    slug: "combo-kuritsa",
    name: "Комбо с курицей",
    categoryId: "combo",
    tags: ["classic"],
    image: STOCK.combo,
    tagline: "Шашлык, гарнир, овощи, соус и напиток одним заказом",
    composition: "шашлык из курицы, гарнир на выбор, овощи, соус, напиток",
    variants: [],
    sizes: [{ id: "combo", label: "комбо", price: 445, article: "21123" }],
    overall: 9,
    votes: 74,
    criteria: [4.5, 4.5, 4.5],
  }),
  product({
    slug: "combo-svinina",
    name: "Комбо со свининой",
    categoryId: "combo",
    badge: "hit",
    tags: ["classic"],
    image: STOCK.combo,
    tagline: "Свиная мякоть с мангала, гарнир, овощи и напиток",
    composition: "шашлык из свинины, гарнир на выбор, овощи, соус, напиток",
    variants: [],
    sizes: [{ id: "combo", label: "комбо", price: 465, article: "21122" }],
    overall: 9.1,
    votes: 69,
    criteria: [4.5, 4.5, 4.5],
  }),

  product({
    slug: "plov",
    name: "Плов по-узбекски",
    categoryId: "sides",
    tags: ["classic"],
    image: STOCK.sides,
    tagline: "Настоящий узбекский плов с бараниной и зирой",
    composition: "рис девзира, мясо, морковь, зира, барбарис",
    variants: [],
    sizes: [{ id: "portion", label: "порция", price: 320, article: "41111" }],
    overall: 8.7,
    votes: 44,
    criteria: [4.5, 4, 4.5],
  }),
  product({
    slug: "morkov-po-koreyski",
    name: "Морковь по-корейски",
    categoryId: "sides",
    tags: ["spicy"],
    image: STOCK.sides,
    tagline: "Пряная морковь по-корейски домашнего приготовления",
    composition: "морковь, чеснок, специи, масло",
    variants: [],
    sizes: [{ id: "portion", label: "порция", price: 80, article: "31112" }],
    overall: 8.2,
    votes: 27,
    criteria: [4, 4, 4.5],
  }),

  product({
    slug: "cola-05",
    name: "Добрый Кола 0,5",
    categoryId: "drinks",
    tags: [],
    image: STOCK.drinks,
    tagline: "Классическая кола, охлаждённая",
    composition: "",
    variants: [],
    sizes: [{ id: "05", label: "0,5 л", price: 120, article: "51267" }],
    overall: 8,
    votes: 19,
    criteria: [4, 4, 4],
  }),
  product({
    slug: "chay-rich",
    name: "Чай Рич",
    categoryId: "drinks",
    tags: [],
    image: STOCK.drinks,
    tagline: "Холодный чай в ассортименте",
    composition: "",
    variants: [
      { id: "green", label: "Зелёный", icon: null, priceDelta: 0 },
      { id: "black", label: "Чёрный", icon: null, priceDelta: 0 },
    ],
    sizes: [{ id: "05", label: "0,5 л", price: 120, article: "51422" }],
    overall: 8.1,
    votes: 22,
    criteria: [4, 4, 4],
  }),

  product({
    slug: "sous-chesnochnyy",
    name: "Соус чесночный",
    categoryId: "sauces",
    tags: [],
    image: STOCK.sauce,
    tagline: "Фирменный чесночный соус на сметанной основе",
    composition: "сметана, чеснок, зелень, специи",
    variants: [],
    sizes: [{ id: "30", label: "30 г", price: 35 }],
    overall: 9,
    votes: 31,
    criteria: [4.5, 4.5, 4.5],
  }),
  product({
    slug: "sous-barbekyu",
    name: "Соус барбекю",
    categoryId: "sauces",
    tags: ["bbq"],
    image: STOCK.sauce,
    tagline: "Дымный соус барбекю",
    composition: "томаты, специи, дымный ароматизатор",
    variants: [],
    sizes: [{ id: "30", label: "30 г", price: 35 }],
    overall: 8.6,
    votes: 24,
    criteria: [4.5, 4, 4.5],
  }),
]

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function productsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId).sort((a, b) => a.order - b.order)
}

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
