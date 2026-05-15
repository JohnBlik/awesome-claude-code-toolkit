import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';

interface CounterProps {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  active: boolean;
}

function Counter({ to, suffix = '', decimals = 0, duration = 2000, active }: CounterProps) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, active, reduced]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString('en-US');

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

const items: Array<{ value: number; suffix?: string; decimals?: number; label: string }> = [
  { value: 120, suffix: 'k+', label: 'Active creators' },
  { value: 99.99, suffix: '%', decimals: 2, label: 'Uptime guarantee' },
  { value: 4.9, suffix: '/5', decimals: 1, label: 'Average rating' },
  { value: 60, suffix: ' FPS', label: 'Animation budget' },
];

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="By the numbers"
          title="Built to scale with you."
          description="Designed for teams that need an unfair advantage. Here's what our community is building right now."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-px overflow-hidden rounded-2xl glass sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="relative flex flex-col items-center justify-center bg-[#0d0d1c]/40 px-6 py-10
                transition-colors hover:bg-white/[0.04]"
            >
              <span className="text-5xl font-semibold tracking-tight text-gradient sm:text-6xl">
                <Counter
                  to={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  active={inView}
                />
              </span>
              <span className="mt-3 text-xs uppercase tracking-[0.25em] text-white/55">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
