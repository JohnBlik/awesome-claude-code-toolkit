import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';

type FeatureGlow = 'violet' | 'pink' | 'cyan';

const features: Array<{
  icon: 'wand' | 'bolt' | 'layers' | 'shield' | 'globe' | 'cpu';
  title: string;
  description: string;
  glow: FeatureGlow;
}> = [
  {
    icon: 'wand',
    title: 'Cinematic motion',
    description:
      'Hand-crafted animations powered by Framer Motion deliver a feel that rivals native apps.',
    glow: 'violet',
  },
  {
    icon: 'bolt',
    title: 'Lightning fast',
    description:
      'Built on Vite and React 18. Lazy-loaded sections keep the bundle small and the page snappy.',
    glow: 'pink',
  },
  {
    icon: 'layers',
    title: 'Composable design',
    description:
      'A clean component architecture with glassmorphism primitives you can drop into any project.',
    glow: 'cyan',
  },
  {
    icon: 'shield',
    title: 'Accessible by default',
    description:
      'Keyboard navigation, ARIA semantics and reduced-motion support are wired in from the start.',
    glow: 'violet',
  },
  {
    icon: 'globe',
    title: 'Responsive everywhere',
    description:
      'A mobile-first grid and fluid typography ensure the experience scales from phones to ultrawides.',
    glow: 'pink',
  },
  {
    icon: 'cpu',
    title: 'Performance first',
    description:
      'Hardware-accelerated transforms, layered effects and code-splitting keep frame budgets in check.',
    glow: 'cyan',
  },
];

export function Features() {
  return (
    <section id="features" className="relative section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-4xl
          bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Features"
          title="Every detail, dialed in."
          description="A polished toolkit of motion-first primitives, designed so you can ship a beautiful product without re-inventing the basics."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <GlassCard glow={f.glow} className="h-full">
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
                    bg-gradient-to-br from-white/15 to-white/5 text-white shadow-inner"
                >
                  <Icon name={f.icon} size={22} />
                </div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
