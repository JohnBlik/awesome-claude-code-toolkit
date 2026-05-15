import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AuroraBlobs() {
  const reduced = useReducedMotion();

  const animateA = reduced
    ? undefined
    : { x: ['-20%', '10%', '-20%'], y: ['-10%', '8%', '-10%'], scale: [1, 1.1, 1] };
  const animateB = reduced
    ? undefined
    : { x: ['20%', '-5%', '20%'], y: ['20%', '0%', '20%'], scale: [1, 1.15, 1] };
  const animateC = reduced ? undefined : { y: ['40%', '20%', '40%'] };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ x: '-20%', y: '-10%', scale: 1 }}
        animate={animateA}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        style={{ willChange: 'transform' }}
        className="absolute -top-32 -left-20 h-[40rem] w-[40rem] rounded-full blur-[120px]
          bg-brand-500/30"
      />
      <motion.div
        initial={{ x: '20%', y: '20%', scale: 1 }}
        animate={animateB}
        transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/3 right-0 h-[34rem] w-[34rem] rounded-full blur-[140px]
          bg-glow-pink/25"
      />
      <motion.div
        initial={{ y: '40%' }}
        animate={animateC}
        transition={{ duration: 24, ease: 'easeInOut', repeat: Infinity }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full blur-[120px]
          bg-accent-500/20"
      />
    </div>
  );
}
