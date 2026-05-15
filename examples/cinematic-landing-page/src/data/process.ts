import type { IconName } from '@/components/ui/Icon';

export interface ProcessStep {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  duration: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: 'sparkle',
    title: 'Discovery',
    description:
      'We dig into your audience, business model and competitive landscape. You leave the week with a written brief and a measurable target.',
    duration: '1 week',
  },
  {
    number: '02',
    icon: 'wand',
    title: 'Design',
    description:
      'Brand-led art direction, then a hi-fi prototype in Figma. We iterate fast — you sign off on the look and motion before any code is written.',
    duration: '2 – 3 weeks',
  },
  {
    number: '03',
    icon: 'cpu',
    title: 'Development',
    description:
      'Production-grade build in React/TypeScript with a clean component architecture, accessibility built in and CI from day one.',
    duration: '3 – 6 weeks',
  },
  {
    number: '04',
    icon: 'bolt',
    title: 'Deployment',
    description:
      'Launch on edge infra, instrument analytics, run QA across devices. We staircase the release so you can rollback safely.',
    duration: '1 week',
  },
  {
    number: '05',
    icon: 'shield',
    title: 'Support',
    description:
      'Monthly retainer covering monitoring, motion tuning, A/B tests and the small product moves that compound over time.',
    duration: 'Ongoing',
  },
];
