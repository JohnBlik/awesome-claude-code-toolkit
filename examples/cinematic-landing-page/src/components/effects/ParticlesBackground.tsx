import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  life: number;
}

interface Props {
  density?: number;
  className?: string;
}

const MAX_PARTICLES_DESKTOP = 110;
const MAX_PARTICLES_MOBILE = 50;
const CONNECT_DIST_SQ = 9000;

export function ParticlesBackground({ density = 0.00007, className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const runningRef = useRef(true);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxParticles = isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.4,
      hue: 250 + Math.random() * 80,
      life: Math.random(),
    });

    const seed = () => {
      const count = Math.max(
        24,
        Math.min(maxParticles, Math.floor(width * height * density))
      );
      const arr: Particle[] = new Array(count);
      for (let i = 0; i < count; i++) arr[i] = makeParticle();
      particlesRef.current = arr;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const stepUpdate = (ps: Particle[]) => {
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000) {
            p.vx += dx * 0.0006;
            p.vy += dy * 0.0006;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
      }
    };

    const stepRender = (ps: Particle[]) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const a = 0.45 + Math.sin(p.life * 6) * 0.25;
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST_SQ) {
            const alpha = 0.18 * (1 - d2 / CONNECT_DIST_SQ);
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 70%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      if (!runningRef.current) return;
      const ps = particlesRef.current;
      stepUpdate(ps);
      stepRender(ps);
      rafRef.current = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      const visible = !document.hidden;
      if (visible && !runningRef.current && !reduced) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      } else if (!visible && rafRef.current) {
        runningRef.current = false;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Pause when canvas is off-screen
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !runningRef.current && !reduced) {
          runningRef.current = true;
          rafRef.current = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && rafRef.current) {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { rootMargin: '64px' }
    );

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    io.observe(canvas);

    if (!reduced) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(draw);
    } else {
      runningRef.current = false;
      stepRender(particlesRef.current);
    }

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={
        'pointer-events-auto absolute inset-0 h-full w-full opacity-70 ' +
        (className ?? '')
      }
      style={{ contain: 'strict' }}
    />
  );
}
