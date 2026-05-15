import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps & {
  as?: 'button';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type ButtonAsAnchor = CommonProps & {
  as: 'a';
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
};

const MotionButton = motion.button;
const MotionAnchor = motion.a;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      icon,
      className,
      children,
      as,
      ...rest
    } = props;

    const base =
      variant === 'primary'
        ? 'relative inline-flex items-center justify-center gap-2 rounded-full font-medium text-white overflow-hidden bg-gradient-to-r from-brand-500 via-glow-violet to-glow-pink shadow-glow'
        : 'inline-flex items-center justify-center gap-2 rounded-full font-medium text-white/90 border border-white/15 bg-white/5 backdrop-blur';

    const motionProps = {
      whileHover: { scale: 1.04, y: -2 },
      whileTap: { scale: 0.97 },
      transition: { type: 'spring' as const, stiffness: 380, damping: 22 },
      className: cn(base, sizes[size], 'group', className),
    };

    const content = (
      <>
        {variant === 'primary' && (
          <span
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)]
              bg-[length:200%_100%] animate-shimmer"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          {icon}
        </span>
      </>
    );

    if (as === 'a') {
      return (
        <MotionAnchor
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...motionProps}
          {...(rest as React.ComponentProps<typeof MotionAnchor>)}
        >
          {content}
        </MotionAnchor>
      );
    }

    return (
      <MotionButton
        ref={ref as React.Ref<HTMLButtonElement>}
        {...motionProps}
        {...(rest as React.ComponentProps<typeof MotionButton>)}
      >
        {content}
      </MotionButton>
    );
  }
);
