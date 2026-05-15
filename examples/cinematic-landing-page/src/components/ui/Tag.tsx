import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/[0.04]',
        'px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/65',
        className
      )}
    >
      {children}
    </span>
  );
}
