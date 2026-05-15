import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { services } from '@/data/services';

export function Services() {
  return (
    <section id="services" aria-label="Services" className="relative section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-4xl
          bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Services"
          title="What I help teams build."
          description="A focused practice — design and code under one roof. No agency overhead, no handoff loss, just one person accountable for the result."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <GlassCard glow={s.glow} className="h-full">
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
                    bg-gradient-to-br from-white/15 to-white/5 text-white shadow-inner"
                >
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="inline-flex items-center rounded-full border border-white/10
                        bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase
                        tracking-wider text-white/65"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
