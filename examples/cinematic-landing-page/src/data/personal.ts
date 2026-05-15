export const personal = {
  name: 'Lukas Voss',
  initials: 'LV',
  role: 'Independent Web Designer & Developer',
  location: 'Berlin · remote worldwide',
  email: 'hello@lukasvoss.studio',
  availability: 'Booking projects for Q3',
  yearsExperience: 9,
  projectsShipped: 84,
  // Phrases for the typewriter in Hero
  rotatingPhrases: [
    'websites that perform.',
    'commerce that converts.',
    'interfaces that move.',
    'brands you remember.',
  ] as const,
  bio: `I’m an independent designer-developer working at the intersection of product, motion and brand. For the last nine years I’ve helped studios, founders and growth teams ship interfaces that feel as good as they look — fast, accessible and unmistakably theirs.`,
  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' as const },
    { label: 'Twitter', href: 'https://x.com/', icon: 'twitter' as const },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' as const },
  ],
  // Skill bars for About
  skills: [
    { label: 'React · TypeScript', value: 96 },
    { label: 'Next.js · Remix', value: 92 },
    { label: 'Three.js · WebGL', value: 78 },
    { label: 'Tailwind · CSS architecture', value: 95 },
    { label: 'Motion design · Framer', value: 88 },
    { label: 'UI/UX · Figma systems', value: 90 },
  ],
} as const;
