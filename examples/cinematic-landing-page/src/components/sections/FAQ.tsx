import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

const faqs = [
  {
    q: 'Is Aurora a UI kit or a starter template?',
    a: 'Both. It ships as an opinionated component starter you can fork — every section, animation and primitive is built for re-use across products.',
  },
  {
    q: 'Will the animations hurt performance?',
    a: 'No. Effects use GPU-friendly transforms, are gated behind in-view triggers and respect prefers-reduced-motion. Heavy sections are lazy-loaded so the initial paint stays fast.',
  },
  {
    q: 'Does it support light mode?',
    a: 'Yes — the design system is Tailwind dark-mode aware. The navbar toggle persists the selection in localStorage and the theme is applied to the document root.',
  },
  {
    q: 'Can I use it commercially?',
    a: 'Absolutely. The starter is MIT-licensed. Build, ship and modify it however you like — attribution is appreciated but not required.',
  },
  {
    q: 'How accessible is the page?',
    a: 'All interactive elements are keyboard reachable, the menu uses aria-expanded, animations honor reduced-motion, and color contrast meets WCAG AA on the primary text.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered."
          description="Still curious? Reach out and we’ll get back to you within one business day."
        />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-3xl flex-col gap-3"
        >
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <motion.li
                key={item.q}
                variants={fadeUp}
                className={cn(
                  'overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur',
                  'transition-colors',
                  isOpen && 'border-white/20 bg-white/[0.05]'
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5
                      text-left text-base font-medium text-white/90 transition-colors
                      hover:text-white"
                  >
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center
                        rounded-full border border-white/10 bg-white/5 text-white/70"
                    >
                      <Icon name="chevron" size={14} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-white/65">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
