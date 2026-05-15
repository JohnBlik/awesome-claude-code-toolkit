import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { fadeUp, stagger } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = reduced ? 0 : yRaw;
  const opacity = reduced ? 1 : opacityRaw;
  const scale = reduced ? 1 : scaleRaw;

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center
        overflow-hidden px-5 pt-32 pb-20 sm:px-8 sm:pt-40"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="container-narrow relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5
              px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-white/75 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-glow-pink opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow-pink" />
            </span>
            New · v4.0 just launched
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-balance text-5xl font-semibold leading-[1.02]
              sm:text-7xl lg:text-[5.5rem]"
          >
            Design at the
            <br />
            <span className="text-gradient">speed of light.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Aurora is the cinematic platform that turns ideas into immersive experiences.
            Built for designers and engineers who refuse to compromise on the details.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button size="lg" icon={<Icon name="arrowRight" size={16} />}>
              Start free trial
            </Button>
            <button
              type="button"
              className="group inline-flex items-center gap-3 rounded-full px-5 py-3
                text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-white/15 bg-white/5 transition-all group-hover:bg-white/10
                group-hover:border-white/30">
                <Icon name="play" size={14} className="text-white translate-x-px" />
              </span>
              Watch the demo
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex items-center gap-6 text-xs uppercase tracking-widest text-white/45"
          >
            <span>Trusted by teams at</span>
            <div className="flex items-center gap-5 sm:gap-8 text-white/55 font-semibold tracking-wider">
              <span>LINEAR</span>
              <span>VERCEL</span>
              <span>STRIPE</span>
              <span className="hidden sm:inline">FIGMA</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
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
