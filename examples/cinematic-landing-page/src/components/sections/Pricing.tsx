import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Billing = 'monthly' | 'yearly';

interface Plan {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For makers exploring the craft.',
    monthly: 0,
    yearly: 0,
    cta: 'Start free',
    features: [
      'Up to 3 projects',
      'Core motion library',
      'Community support',
      'Aurora-hosted previews',
    ],
  },
  {
    name: 'Studio',
    tagline: 'For teams shipping at speed.',
    monthly: 29,
    yearly: 24,
    cta: 'Start 14-day trial',
    highlighted: true,
    features: [
      'Unlimited projects',
      'Premium motion primitives',
      'Real-time collaboration',
      'Priority support · SLA 24h',
      'Branding & custom domains',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For organizations at scale.',
    monthly: 99,
    yearly: 84,
    cta: 'Talk to sales',
    features: [
      'Everything in Studio',
      'SSO, SCIM & audit logs',
      'Dedicated success manager',
      'Custom integrations',
      'Compliance & DPA',
    ],
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('yearly');

  return (
    <section id="pricing" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, scalable plans."
          description="Start free, upgrade when your project deserves the spotlight. Cancel anytime."
        />

        <div className="mb-12 flex justify-center">
          <div className="relative inline-flex items-center rounded-full border border-white/10
            bg-white/5 p-1 backdrop-blur">
            {(['monthly', 'yearly'] as Billing[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBilling(b)}
                aria-pressed={billing === b}
                className={cn(
                  'relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors',
                  billing === b ? 'text-white' : 'text-white/55 hover:text-white/80'
                )}
              >
                {b === 'monthly' ? 'Monthly' : 'Yearly'}
                {b === 'yearly' && (
                  <span className="ml-2 rounded-full bg-glow-pink/20 px-2 py-0.5 text-[10px]
                    font-semibold uppercase tracking-wider text-glow-pink">
                    -20%
                  </span>
                )}
                {billing === b && (
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
          {plans.map((p) => (
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
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold">
                    ${billing === 'monthly' ? p.monthly : p.yearly}
                  </span>
                  <span className="text-sm text-white/50">/ month</span>
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
                    variant={p.highlighted ? 'primary' : 'ghost'}
                    className="w-full"
                    icon={<Icon name="arrowRight" size={14} />}
                  >
                    {p.cta}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
