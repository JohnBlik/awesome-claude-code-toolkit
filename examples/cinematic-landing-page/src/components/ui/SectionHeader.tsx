import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-4 mb-14 sm:mb-20 max-w-3xl',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5
            px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-glow-violet shadow-[0_0_10px_currentColor]" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-white/65 max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
