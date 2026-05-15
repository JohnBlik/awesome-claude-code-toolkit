import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icon';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { processSteps } from '@/data/process';

export function Process() {
  return (
    <section id="process" aria-label="Process" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Process"
          title="How we'll work together."
          description="A predictable, lightweight process refined over 80+ projects. You always know what's next, who owns it and when you'll see it."
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-7 top-2 bottom-2 w-px hidden sm:block
              bg-gradient-to-b from-glow-violet/60 via-glow-pink/40 to-transparent"
          />
          {processSteps.map((step, i) => (
            <motion.li key={step.number} variants={fadeUp} className="relative">
              <div className="group flex flex-col gap-5 rounded-2xl border border-transparent
                p-4 transition-colors hover:border-white/10 hover:bg-white/[0.02]
                sm:flex-row sm:items-start sm:gap-7 sm:p-5">
                <div className="relative flex items-center gap-4 sm:flex-col sm:items-start">
                  <span className="relative inline-flex h-14 w-14 flex-shrink-0 items-center
                    justify-center rounded-2xl border border-white/10 bg-[#0e0e1c] text-white
                    shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)] transition-all
                    group-hover:scale-105 group-hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.7)]">
                    <Icon name={step.icon} size={20} />
                    <span
                      aria-hidden
                      className="absolute -inset-px rounded-2xl opacity-0 transition-opacity
                        duration-500 group-hover:opacity-100
                        bg-gradient-to-br from-brand-500/40 via-glow-violet/30 to-glow-pink/30 blur"
                    />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/45">
                    Step {step.number}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold sm:text-2xl">{step.title}</h3>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1
                      text-[11px] uppercase tracking-widest text-white/55">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </div>
              </div>
              {i < processSteps.length - 1 && (
                <div aria-hidden className="mx-auto h-4 sm:h-2" />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
