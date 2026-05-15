import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Mode = 'project' | 'monthly';

interface Plan {
  name: string;
  tagline: string;
  project: { from: number; unit: string };
  monthly: { from: number; unit: string };
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Launch',
    tagline: 'A polished single-page launch in two weeks.',
    project: { from: 4500, unit: 'one-off' },
    monthly: { from: 2200, unit: '/ month' },
    cta: 'Book Launch',
    features: [
      'High-conversion landing page',
      'Brand-led art direction',
      'Motion details & 3D accents',
      'Edge hosting setup',
      'One round of revisions',
    ],
  },
  {
    name: 'Studio',
    tagline: 'Full marketing site or storefront, end to end.',
    project: { from: 12500, unit: 'from' },
    monthly: { from: 4800, unit: '/ month' },
    cta: 'Book Studio',
    highlighted: true,
    features: [
      'Up to 8 pages or product templates',
      'Design system & component library',
      'CMS / Shopify / Sanity integration',
      'Custom motion & 3D moments',
      'Analytics, SEO & accessibility audit',
      'Two rounds of revisions',
    ],
  },
  {
    name: 'Partner',
    tagline: 'Embedded with your team on the long game.',
    project: { from: 28000, unit: 'starting' },
    monthly: { from: 7600, unit: '/ month' },
    cta: 'Talk about Partner',
    features: [
      'Everything in Studio',
      'Full web app or platform build',
      'Embedded with your product team',
      'Weekly shipping cadence',
      'Ongoing motion & 3D direction',
      'Priority support · SLA 24h',
    ],
  },
];

export function Pricing() {
  const [mode, setMode] = useState<Mode>('project');

  return (
    <section id="pricing" aria-label="Pricing" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Pricing"
          title="Transparent engagement tiers."
          description="Fixed-fee projects or a monthly retainer — whichever fits how you build. All quotes are itemised and locked before the first commit."
        />

        <div className="mb-12 flex justify-center">
          <div className="relative inline-flex items-center rounded-full border border-white/10
            bg-white/5 p-1 backdrop-blur" role="tablist" aria-label="Billing mode">
            {(['project', 'monthly'] as Mode[]).map((b) => (
              <button
                key={b}
                type="button"
                role="tab"
                onClick={() => setMode(b)}
                aria-selected={mode === b}
                aria-pressed={mode === b}
                className={cn(
                  'relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors',
                  mode === b ? 'text-white' : 'text-white/55 hover:text-white/80'
                )}
              >
                {b === 'project' ? 'Per project' : 'Monthly retainer'}
                {b === 'monthly' && (
                  <span className="ml-2 rounded-full bg-glow-pink/20 px-2 py-0.5 text-[10px]
                    font-semibold uppercase tracking-wider text-glow-pink">
                    flex
                  </span>
                )}
                {mode === b && (
                  <motion.span
                    layoutId="billing-pill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full
                      bg-gradient-to-r from-brand-500/30 to-glow-violet/30
                      ring-1 ring-inset ring-white/20"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 lg:grid-cols-3"
        >
          {plans.map((p) => {
            const price = mode === 'project' ? p.project : p.monthly;
            return (
              <motion.div key={p.name} variants={fadeUp}>
                <GlassCard
                  glow={p.highlighted ? 'pink' : 'violet'}
                  className={cn(
                    'flex h-full flex-col',
                    p.highlighted &&
                      'border-glow-violet/30 ring-1 ring-glow-violet/20 shadow-glow'
                  )}
                >
                  {p.highlighted && (
                    <span className="self-start rounded-full bg-gradient-to-r from-brand-500 to-glow-pink
                      px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="mt-4 text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{p.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-[11px] uppercase tracking-widest text-white/45">
                      {price.unit}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-semibold tracking-tight">
                      €{price.from.toLocaleString('en-US')}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                        <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center
                          justify-center rounded-full bg-gradient-to-br from-brand-500 to-glow-violet
                          text-white">
                          <Icon name="check" size={10} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      as="a"
                      href="#contact"
                      variant={p.highlighted ? 'primary' : 'ghost'}
                      className="w-full"
                      icon={<Icon name="arrowUpRight" size={14} />}
                    >
                      {p.cta}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-10 text-center text-xs uppercase tracking-widest text-white/40">
          Need a one-off audit, motion polish or design review? Ask about hourly engagements.
        </p>
      </div>
    </section>
  );
}
