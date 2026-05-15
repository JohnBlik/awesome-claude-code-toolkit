import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';

const testimonials = [
  {
    quote:
      'Aurora made our launch feel cinematic. Conversion jumped 38% the first week, and the whole team genuinely enjoys building on top of it.',
    name: 'Aria Chen',
    role: 'Head of Design, Lumen',
    initials: 'AC',
    color: 'from-glow-violet to-glow-pink',
  },
  {
    quote:
      'The motion vocabulary is just right — opinionated where it should be, flexible where it counts. Best landing page stack I have used.',
    name: 'Marcus Holloway',
    role: 'Staff Engineer, Northbeam',
    initials: 'MH',
    color: 'from-brand-500 to-accent-400',
  },
  {
    quote:
      'Glassmorphism, particles, scroll choreography — every detail is wired up. We shipped an investor-ready story in two afternoons.',
    name: 'Priya Anand',
    role: 'Founder, Studio Halo',
    initials: 'PA',
    color: 'from-glow-pink to-amber-400',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Loved by builders"
          title="Stories from teams that ship."
          description="Real product teams are using Aurora to launch faster — and look unmistakably better while doing it."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i}>
              <GlassCard
                glow={i % 3 === 0 ? 'violet' : i % 3 === 1 ? 'cyan' : 'pink'}
                className="flex h-full flex-col justify-between"
              >
                <div>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="mb-5 h-8 w-8 text-white/30"
                    fill="currentColor"
                  >
                    <path d="M7 7h4v4H8c0 3 2 4 4 4v3c-5 0-8-3-8-7V7zm9 0h4v4h-3c0 3 2 4 4 4v3c-5 0-8-3-8-7V7z" />
                  </svg>
                  <p className="text-[15px] leading-relaxed text-white/85">"{t.quote}"</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full
                      bg-gradient-to-br ${t.color} text-sm font-semibold text-white shadow-glow`}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-white/55">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
