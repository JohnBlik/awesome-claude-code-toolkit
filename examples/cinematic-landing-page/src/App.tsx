import { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { LoadingScreen } from '@/components/effects/LoadingScreen';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { ParticlesBackground } from '@/components/effects/ParticlesBackground';
import { AuroraBlobs } from '@/components/effects/AuroraBlobs';

const Features = lazy(() =>
  import('@/components/sections/Features').then((m) => ({ default: m.Features }))
);
const Stats = lazy(() =>
  import('@/components/sections/Stats').then((m) => ({ default: m.Stats }))
);
const Testimonials = lazy(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const Pricing = lazy(() =>
  import('@/components/sections/Pricing').then((m) => ({ default: m.Pricing }))
);
const FAQ = lazy(() =>
  import('@/components/sections/FAQ').then((m) => ({ default: m.FAQ }))
);
const Footer = lazy(() =>
  import('@/components/layout/Footer').then((m) => ({ default: m.Footer }))
);

function SectionFallback() {
  return (
    <div
      aria-hidden
      className="container-narrow section-padding"
    >
      <div className="h-8 w-48 animate-pulse rounded-full bg-white/5" />
      <div className="mt-6 h-20 w-full max-w-xl animate-pulse rounded-2xl bg-white/5" />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = window.setTimeout(() => setLoading(false), 1100);
    return () => window.clearTimeout(handle);
  }, []);

  return (
    <>
      <LoadingScreen visible={loading} />
      <ScrollProgress />

      <a
        href="#features"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[80] rounded-full bg-white
          px-4 py-2 text-sm font-semibold text-black"
      >
        Skip to content
      </a>

      <div className="relative">
        <div aria-hidden className="fixed inset-0 -z-20 bg-[#0b0b15]">
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="absolute inset-0 bg-grid-faint bg-[length:48px_48px] opacity-[0.35] mask-fade-x" />
          <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
        </div>

        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
          <AuroraBlobs />
          <ParticlesBackground />
        </div>

        <Navbar />

        <main id="main" className="relative">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <Features />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Stats />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Pricing />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
