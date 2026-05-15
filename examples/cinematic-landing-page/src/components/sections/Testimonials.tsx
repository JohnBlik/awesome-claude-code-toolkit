import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icon';
import { testimonials } from '@/data/testimonials';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 6500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const total = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, next]);

  const t = testimonials[index];

  return (
    <section id="testimonials" aria-label="Testimonials" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="Testimonials"
          title="Words from collaborators."
          description="The fastest signal on whether someone is worth hiring is what the people who already worked with them say."
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10
            bg-white/[0.03] p-8 backdrop-blur-md sm:p-12">
            {/* corner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full
                bg-glow-violet/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full
                bg-glow-pink/15 blur-3xl"
            />

            <div className="relative min-h-[18rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-7"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-9 w-9 text-white/25"
                    fill="currentColor"
                  >
                    <path d="M7 7h4v4H8c0 3 2 4 4 4v3c-5 0-8-3-8-7V7zm9 0h4v4h-3c0 3 2 4 4 4v3c-5 0-8-3-8-7V7z" />
                  </svg>
                  <blockquote className="font-display text-xl leading-relaxed text-white/90 sm:text-2xl">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-full font-semibold text-white shadow-glow',
                        'bg-gradient-to-br',
                        t.color
                      )}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/55">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((tt, i) => (
                <button
                  key={tt.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${tt.name}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-8 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full
                  border border-white/10 bg-white/5 text-white/80 transition-colors
                  hover:bg-white/10 hover:text-white"
              >
                <Icon name="chevron" size={16} className="-rotate-90" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full
                  border border-white/10 bg-white/5 text-white/80 transition-colors
                  hover:bg-white/10 hover:text-white"
              >
                <Icon name="chevron" size={16} className="rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
