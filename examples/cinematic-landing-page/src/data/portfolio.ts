export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: 'Web app' | 'Ecommerce' | 'Landing' | 'Brand site';
  summary: string;
  description: string;
  role: string;
  outcomes: string[];
  tags: string[];
  /** Tailwind gradient classes for the preview tile */
  gradient: string;
  /** Color used for the “fake browser” mock */
  mockAccent: string;
}

export const projects: Project[] = [
  {
    slug: 'lumen-os',
    title: 'Lumen OS',
    client: 'Lumen',
    year: 2025,
    category: 'Web app',
    summary: 'A realtime canvas for design ops teams.',
    description:
      'Lumen needed a flagship product that could rival the polish of Linear and Figma. I led design and front-end, shipping a realtime canvas with multiplayer cursors, a custom undo stack and a motion language that became their signature.',
    role: 'Lead designer · Front-end',
    outcomes: [
      '+38% activation in week one',
      'Sub-90 ms interaction latency',
      'Featured in Sidebar.io',
    ],
    tags: ['React', 'TypeScript', 'Liveblocks', 'Framer Motion', 'Tailwind'],
    gradient: 'from-brand-500 via-glow-violet to-glow-pink',
    mockAccent: '#a855f7',
  },
  {
    slug: 'northbeam-store',
    title: 'Northbeam',
    client: 'Northbeam Goods',
    year: 2024,
    category: 'Ecommerce',
    summary: 'Premium outdoor apparel storefront.',
    description:
      'A bespoke Shopify Hydrogen build with a cinematic look-book, configurator and Klaviyo flows. Replaced a Liquid theme that was costing them conversions on mobile.',
    role: 'Designer · Hydrogen developer',
    outcomes: [
      '2.1× mobile conversion rate',
      'AOV up 24%',
      'Editorial-grade product pages',
    ],
    tags: ['Hydrogen', 'Shopify', 'Sanity', 'GSAP'],
    gradient: 'from-emerald-400 via-accent-500 to-brand-500',
    mockAccent: '#10b981',
  },
  {
    slug: 'halo-launch',
    title: 'Studio Halo',
    client: 'Studio Halo',
    year: 2025,
    category: 'Landing',
    summary: 'Investor-ready launch site for a creative studio.',
    description:
      'Two-week sprint to design, build and ship a launch page for a fundraising round. Scroll-driven 3D, custom typography pairing and a press kit.',
    role: 'Solo end-to-end',
    outcomes: ['Closed pre-seed in 6 weeks', 'Lighthouse 98+ on mobile'],
    tags: ['Next.js', 'Three.js', 'Framer Motion'],
    gradient: 'from-amber-400 via-glow-pink to-glow-violet',
    mockAccent: '#f59e0b',
  },
  {
    slug: 'orbit-dashboards',
    title: 'Orbit Analytics',
    client: 'Orbit',
    year: 2024,
    category: 'Web app',
    summary: 'Analytics dashboards for finance teams.',
    description:
      'A data-dense interface that still feels human. Designed token-based theming, a charting system on top of Visx and an export pipeline finance teams actually trust.',
    role: 'Design systems · Front-end',
    outcomes: [
      'NPS jumped from 34 → 58',
      '40% fewer “export to Excel” tickets',
    ],
    tags: ['React', 'Visx', 'Postgres', 'tRPC'],
    gradient: 'from-cyan-400 via-brand-500 to-glow-violet',
    mockAccent: '#22d3ee',
  },
  {
    slug: 'meridian-brand',
    title: 'Meridian',
    client: 'Meridian Coffee',
    year: 2024,
    category: 'Brand site',
    summary: 'Editorial brand site for a specialty roaster.',
    description:
      'A slow, deliberate brand site that feels closer to print than the web. Custom photography pipeline and a CMS the founders run themselves.',
    role: 'Designer · Developer',
    outcomes: ['Doubled wholesale enquiries', 'Awwwards SOTD nominee'],
    tags: ['Astro', 'Sanity', 'GSAP', 'TypeScript'],
    gradient: 'from-orange-400 via-rose-500 to-glow-pink',
    mockAccent: '#f97316',
  },
  {
    slug: 'pulse-fintech',
    title: 'Pulse',
    client: 'Pulse Finance',
    year: 2025,
    category: 'Landing',
    summary: 'Product page for a stealth fintech.',
    description:
      'A single-page experience built around one product reveal. Custom WebGL distortion shader on the hero, narrative scroll, and a press-ready story.',
    role: 'Solo end-to-end',
    outcomes: ['12k waitlist signups in 30 days', '4.2 min median session'],
    tags: ['Next.js', 'WebGL', 'GLSL', 'Framer Motion'],
    gradient: 'from-fuchsia-500 via-glow-violet to-brand-500',
    mockAccent: '#d946ef',
  },
];

export const portfolioCategories = ['All', 'Web app', 'Ecommerce', 'Landing', 'Brand site'] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];
