import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useTheme } from '@/hooks/useTheme';
import { personal } from '@/data/personal';
import { cn } from '@/lib/cn';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            'w-full max-w-6xl rounded-full transition-all duration-500 px-4 sm:px-6',
            scrolled
              ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] py-2.5'
              : 'bg-transparent border border-transparent py-3.5'
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="flex items-center gap-2.5 font-display font-semibold"
              aria-label={`${personal.name} — home`}
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg
                bg-gradient-to-br from-brand-500 via-glow-violet to-glow-pink text-white shadow-glow">
                <span className="text-[13px] font-semibold">{personal.initials}</span>
              </span>
              <span className="hidden sm:inline-flex flex-col leading-tight">
                <span className="text-sm font-semibold">{personal.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/45">
                  Designer · Developer
                </span>
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative px-3 py-2 text-sm text-white/75 transition-colors
                      hover:text-white group"
                  >
                    {l.label}
                    <span
                      className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-px
                      origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-glow-pink
                      transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full
                  border border-white/10 bg-white/5 text-white/80 transition-all
                  hover:bg-white/10 hover:text-white"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
              </button>
              <MagneticButton strength={0.25} className="hidden sm:inline-flex">
                <Button as="a" href="#contact" size="sm">
                  Hire me
                  <Icon name="arrowUpRight" size={14} />
                </Button>
              </MagneticButton>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full
                  border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
              >
                <Icon name={open ? 'close' : 'menu'} size={18} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden bg-[#0b0b15]/90 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-auto mt-28 flex max-w-sm flex-col gap-1 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-lg text-white/85 hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <Button as="a" href="#contact" className="w-full" onClick={() => setOpen(false)}>
                  Hire me
                  <Icon name="arrowUpRight" size={14} />
                </Button>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
