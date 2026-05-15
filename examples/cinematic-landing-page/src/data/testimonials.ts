export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Lukas is the rare designer who codes and the rare developer who designs. The launch felt like a film — and conversion followed.',
    name: 'Aria Chen',
    role: 'Head of Design',
    company: 'Lumen',
    initials: 'AC',
    color: 'from-glow-violet to-glow-pink',
  },
  {
    quote:
      'We hired Lukas for a landing page and ended up rebuilding our entire marketing stack with him. Worth every cent.',
    name: 'Marcus Holloway',
    role: 'Staff Engineer',
    company: 'Northbeam',
    initials: 'MH',
    color: 'from-brand-500 to-accent-400',
  },
  {
    quote:
      'Calm, fast, opinionated. The deliverables came in ahead of schedule and the motion details made our investors stop scrolling.',
    name: 'Priya Anand',
    role: 'Founder',
    company: 'Studio Halo',
    initials: 'PA',
    color: 'from-glow-pink to-amber-400',
  },
  {
    quote:
      'He shipped a design system, the marketing site and our app shell in eight weeks. Then he taught the team how to maintain it.',
    name: 'Sven Ericsson',
    role: 'CTO',
    company: 'Orbit',
    initials: 'SE',
    color: 'from-cyan-400 to-brand-500',
  },
  {
    quote:
      'Aesthetically the work is unmatched, but the part you don’t see in the screenshots is the rigor underneath. Highest recommendation.',
    name: 'Júlia Costa',
    role: 'Design Director',
    company: 'Meridian',
    initials: 'JC',
    color: 'from-orange-400 to-glow-pink',
  },
];
