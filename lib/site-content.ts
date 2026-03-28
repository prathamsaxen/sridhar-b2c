export const siteBrand = {
  name: 'Sridha Scented Candles',
  shortName: 'Sridha',
  founder: 'Reena Agarwal',
  tagline:
    'Handcrafted scented candles for décor, gifting, and self-care — warmth, creativity, and mindful living.',
  heroTitle: 'Sridha Scented Candles',
  heroSubtitle:
    'Handmade with dedication and passion. Transform your space — one fragrance at a time.',
} as const

export const siteContact = {
  email: 'support@shreedharcandles.com',
} as const

export const siteMetadata = {
  title: `${siteBrand.name} — Handcrafted Scented Candles`,
  description: `${siteBrand.name}, founded by ${siteBrand.founder}. Lovingly handmade candles for décor, gifting, and self-care.`,
} as const

export const aboutContent = {
  heroTitle: `About ${siteBrand.name}`,
  heroSubtitle: 'Small moments of peace can change everything.',
  storyHeading: 'Our Story',
  storyParagraphs: [
    `${siteBrand.shortName} was born from a simple belief — that small moments of peace can change everything.`,
    `Founded by ${siteBrand.founder}, ${siteBrand.shortName} is not just a candle brand, but an expression of warmth, creativity, and mindful living. Every candle is lovingly handmade, carrying a piece of dedication, patience, and passion.`,
    'Perfect for décor, gifting, or self-care — every candle is designed to create a beautiful and relaxing experience.',
    'In a world that moves too fast, we aim to slow things down — one fragrance at a time. Whether it’s a quiet evening, a festive celebration, or a moment of self-care, Sridha candles are crafted to be a part of your story.',
  ],
  whyChooseHeading: 'Why Choose Us',
} as const

export const whyChooseUs = [
  {
    icon: '🌿',
    title: '100% Handmade with Love',
    body: 'Each candle is carefully handcrafted — no mass production, only pure artistry.',
  },
  {
    icon: '🕯️',
    title: 'Premium Quality Wax & Fragrance',
    body: 'We use high-quality wax and soothing fragrances for a long-lasting experience.',
  },
  {
    icon: '🎁',
    title: 'Perfect for Every Occasion',
    body: 'From gifting to self-care, our candles fit every mood and moment.',
  },
  {
    icon: '🌸',
    title: 'Unique Designs',
    body: 'Every candle is a blend of creativity and elegance — made to stand out.',
  },
  {
    icon: '💖',
    title: 'Made with Passion, Not Machines',
    body: 'You don’t just buy a candle, you feel the effort behind it.',
  },
] as const

export const termsContent = {
  lastUpdated: 'March 2026',
  bullets: [
    'All products are handmade, so slight variations may occur',
    'Prices and availability are subject to change',
    'Sridha reserves the right to update policies anytime',
    'By placing an order, you agree to our terms',
  ],
} as const

export const privacyContent = {
  title: 'Privacy Policy',
  lastUpdated: 'March 2026',
  intro:
    'We respect your privacy and ensure that your personal information is safe with us.',
  bullets: [
    'No data is shared with third parties',
    'Secure payment gateways are used',
  ],
} as const
