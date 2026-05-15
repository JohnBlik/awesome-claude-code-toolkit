import { useEffect, useRef, useState } from 'react';

/**
 * Two-layer cursor:
 *  - A tiny dot tracks the pointer 1:1 via transform.
 *  - A larger ring lags with a spring for the magnetic feel.
 *  - Both expand when over interactive elements (`[data-cursor="hover"]`,
 *    a, button, [role=button], label, input, textarea).
 *  - Suppressed on coarse-pointer devices (touch).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('cursor-hidden');
    return () => document.documentElement.classList.remove('cursor-hidden');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovered = false;
    let pressed = false;
    let raf = 0;

    const isInteractive = (el: Element | null): boolean => {
      while (el && el instanceof Element) {
        if (el.matches('a, button, [role="button"], label, input, textarea, [data-cursor="hover"]')) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const next = isInteractive(e.target as Element | null);
      if (next !== hovered) {
        hovered = next;
        ring.dataset.hovered = hovered ? 'true' : 'false';
      }
    };
    const onDown = () => {
      pressed = true;
      ring.dataset.pressed = 'true';
    };
    const onUp = () => {
      pressed = false;
      ring.dataset.pressed = 'false';
    };
    const onLeave = () => {
      ring.dataset.visible = 'false';
      dot.dataset.visible = 'false';
    };
    const onEnter = () => {
      ring.dataset.visible = 'true';
      dot.dataset.visible = 'true';
    };

    const tick = () => {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const scale = hovered ? 1.6 : pressed ? 0.7 : 1;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        data-visible="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full
          bg-white mix-blend-difference will-change-transform"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        data-visible="true"
        data-hovered="false"
        data-pressed="false"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full
          border border-white/70 mix-blend-difference will-change-transform
          transition-[border-color,background-color] duration-200
          data-[hovered=true]:bg-white data-[hovered=true]:border-white"
      />
    </>
  );
}
