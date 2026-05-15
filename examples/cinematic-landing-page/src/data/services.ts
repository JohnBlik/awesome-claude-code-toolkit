import type { IconName } from '@/components/ui/Icon';

export interface Service {
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  glow: 'violet' | 'pink' | 'cyan';
}

export const services: Service[] = [
  {
    icon: 'globe',
    title: 'Business websites',
    description:
      'Brand-led marketing sites engineered for speed, conversions and a CMS your team will actually enjoy.',
    bullets: ['Design system', 'Headless CMS', 'SEO foundations', 'Edge hosting'],
    glow: 'violet',
  },
  {
    icon: 'layers',
    title: 'Ecommerce',
    description:
      'Bespoke storefronts on Shopify, Stripe and Sanity — built around your brand, not a template.',
    bullets: ['Custom storefronts', 'Subscriptions', 'A/B experiments', 'Analytics'],
    glow: 'pink',
  },
  {
    icon: 'bolt',
    title: 'Landing pages',
    description:
      'High-conversion launch pages with motion-first design, ready to ship in two weeks or less.',
    bullets: ['Narrative design', 'Motion details', 'CRO copy', 'Heat-mapping'],
    glow: 'cyan',
  },
  {
    icon: 'cpu',
    title: 'Web apps',
    description:
      'Production-grade SaaS tools and dashboards — React, TypeScript, Postgres, modern infra.',
    bullets: ['Realtime data', 'Auth & billing', 'Admin tooling', 'Testing'],
    glow: 'violet',
  },
  {
    icon: 'wand',
    title: 'UI / UX design',
    description:
      'Interface systems and product flows that make the complex feel obvious. Figma-native.',
    bullets: ['Design tokens', 'Component libraries', 'Prototyping', 'Handoff'],
    glow: 'pink',
  },
  {
    icon: 'sparkle',
    title: 'Motion & 3D',
    description:
      'Cinematic micro-interactions, scroll choreography and lightweight 3D for the moments that matter.',
    bullets: ['Framer Motion', 'GSAP', 'WebGL / Three.js', 'Lottie'],
    glow: 'cyan',
  },
];
