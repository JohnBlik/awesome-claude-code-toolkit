import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';

const groups = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Guides', 'Community', 'Support'],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px
          bg-gradient-to-r from-transparent via-glow-violet/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[60rem] -translate-x-1/2
          rounded-full bg-glow-violet/15 blur-3xl"
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-narrow px-5 sm:px-8 lg:px-12 py-16 sm:py-20"
      >
        <div className="grid gap-12 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <motion.div variants={fadeUp}>
            <a href="#top" className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg
                bg-gradient-to-br from-brand-500 via-glow-violet to-glow-pink shadow-glow">
                <Icon name="sparkle" size={18} className="text-white" />
              </span>
              Aurora
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              The cinematic platform that turns product launches into unforgettable
              experiences — built for teams that ship beautifully.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {([
                { icon: 'github', label: 'GitHub' },
                { icon: 'twitter', label: 'Twitter' },
                { icon: 'linkedin', label: 'LinkedIn' },
              ] as const).map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full
                    border border-white/10 bg-white/5 text-white/70 transition-all
                    hover:scale-110 hover:bg-white/10 hover:text-white"
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {groups.map((g) => (
            <motion.div key={g.title} variants={fadeUp}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
                {g.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5
            pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Aurora Labs. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Crafted with <span className="text-glow-pink">♥</span> for cinematic experiences.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
