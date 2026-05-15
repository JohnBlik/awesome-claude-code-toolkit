import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  glow?: 'violet' | 'pink' | 'cyan' | 'none';
}

const glowMap: Record<NonNullable<GlassCardProps['glow']>, string> = {
  violet: 'before:bg-glow-violet/30',
  pink: 'before:bg-glow-pink/30',
  cyan: 'before:bg-glow-cyan/30',
  none: 'before:bg-transparent',
};

export function GlassCard({
  children,
  hoverable = true,
  glow = 'violet',
  className,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={cn(
        'relative isolate rounded-2xl p-6 sm:p-7 glass overflow-hidden',
        'before:pointer-events-none before:absolute before:-inset-1 before:-z-10',
        'before:rounded-3xl before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500',
        hoverable && 'hover:before:opacity-100 hover:border-white/20',
        glowMap[glow],
        className
      )}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
