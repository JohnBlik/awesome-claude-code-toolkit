import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeUp, stagger } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { personal } from '@/data/personal';

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = reduced ? 0 : yRaw;
  const opacity = reduced ? 1 : opacityRaw;
  const scale = reduced ? 1 : scaleRaw;

  const { text } = useTypewriter(personal.rotatingPhrases);

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden
        px-5 pt-32 pb-20 sm:px-8 sm:pt-40"
    >
      {/* Floating gradient lights */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2
            rounded-full bg-glow-violet/20 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.4 }}
          className="absolute right-[10%] top-1/2 h-[24rem] w-[24rem] rounded-full
            bg-glow-pink/15 blur-[160px]"
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container-narrow relative z-10 flex flex-col items-start text-left"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-start"
        >
          {/* Availability pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04]
              px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {personal.availability}
          </motion.div>

          {/* Name */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex items-center gap-3 text-sm font-medium text-white/65"
          >
            <span className="h-px w-10 bg-white/30" />
            {personal.name}
            <span className="text-white/30">/</span>
            <span className="text-white/55">{personal.role}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[1.02]
              sm:text-7xl lg:text-[5.75rem]"
          >
            I design &amp; build{' '}
            <span className="relative inline-block align-baseline">
              <span className="text-gradient">{text}</span>
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] bg-glow-pink
                  align-baseline animate-[pulse_1s_ease-in-out_infinite]"
              />
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Independent designer-developer crafting cinematic interfaces for studios, founders
            and growth teams. {personal.yearsExperience}+ years, {personal.projectsShipped}+ projects shipped.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton>
              <Button
                as="a"
                href="#contact"
                size="lg"
                icon={<Icon name="arrowUpRight" size={16} />}
              >
                Start a project
              </Button>
            </MagneticButton>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 rounded-full px-5 py-3
                text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-white/15 bg-white/5 transition-all group-hover:bg-white/10
                group-hover:border-white/30">
                <Icon name="play" size={14} className="text-white translate-x-px" />
              </span>
              View selected work
            </a>
          </motion.div>

          {/* Credentials row */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase
              tracking-widest text-white/45"
          >
            <span>Selected clients</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8 text-white/55 font-semibold tracking-wider">
              <span>LUMEN</span>
              <span>NORTHBEAM</span>
              <span>STUDIO HALO</span>
              <span className="hidden sm:inline">ORBIT</span>
              <span className="hidden md:inline">MERIDIAN</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
