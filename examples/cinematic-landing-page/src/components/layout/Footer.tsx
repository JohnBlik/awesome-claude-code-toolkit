import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { personal } from '@/data/personal';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
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
        <motion.div variants={fadeUp} className="flex flex-col items-start gap-8">
          <a
            href="#top"
            className="font-display text-4xl font-semibold leading-none sm:text-6xl"
          >
            <span className="text-gradient">{personal.name}</span>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-3 text-base text-white/75
              transition-colors hover:text-white"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full
              border border-white/10 bg-white/5 text-white/75 transition-all
              group-hover:bg-white/10">
              <Icon name="mail" size={14} />
            </span>
            {personal.email}
          </a>
        </motion.div>

        <motion.nav
          aria-label="Footer"
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </motion.nav>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/5
            pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {personal.name}. Crafted in Berlin.
          </p>
          <div className="flex items-center gap-2">
            {personal.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full
                  border border-white/10 bg-white/5 text-white/70 transition-all
                  hover:scale-110 hover:bg-white/10 hover:text-white"
              >
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
