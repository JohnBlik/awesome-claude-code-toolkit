import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { personal } from '@/data/personal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function SkillBar({ label, value, active }: { label: string; value: number; active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="font-medium text-white/85">{label}</span>
        <span className="font-mono text-xs text-white/40">{value}%</span>
      </div>
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: active ? `${value}%` : 0 }}
          transition={{
            duration: reduced ? 0.001 : 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-y-0 left-0 rounded-full
            bg-gradient-to-r from-brand-500 via-glow-violet to-glow-pink"
        />
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: active ? `${value}%` : 0 }}
          transition={{
            duration: reduced ? 0.001 : 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
          className="absolute inset-y-0 left-0 rounded-full blur-md opacity-60
            bg-gradient-to-r from-brand-500 via-glow-violet to-glow-pink"
        />
      </div>
    </div>
  );
}

export function About() {
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const active = useInView(skillsRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      aria-label="About"
      className="relative section-padding"
    >
      <div className="container-narrow">
        <SectionHeader
          eyebrow="About"
          title="A studio of one. By design."
          description={personal.bio}
          align="left"
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr,1fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {[
              { label: 'Years freelancing', value: `${personal.yearsExperience}+` },
              { label: 'Projects shipped', value: `${personal.projectsShipped}+` },
              { label: 'Based in', value: 'Berlin' },
              { label: 'Working with', value: 'Worldwide' },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <GlassCard hoverable={false} glow="none" className="text-left">
                  <div className="text-3xl font-semibold sm:text-4xl">
                    <span className="text-gradient">{s.value}</span>
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/55">
                    {s.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <div ref={skillsRef} className="flex flex-col gap-5">
            <p className="text-sm uppercase tracking-[0.25em] text-white/55">Stack</p>
            <div className="flex flex-col gap-5">
              {personal.skills.map((s) => (
                <SkillBar key={s.label} label={s.label} value={s.value} active={active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
