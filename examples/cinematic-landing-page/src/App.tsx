import { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { LoadingScreen } from '@/components/effects/LoadingScreen';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { AuroraBlobs } from '@/components/effects/AuroraBlobs';
import { CustomCursor } from '@/components/effects/CustomCursor';

const ThreeBackground = lazy(() =>
  import('@/components/effects/ThreeBackground').then((m) => ({ default: m.ThreeBackground }))
);

const About = lazy(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About }))
);
const Services = lazy(() =>
  import('@/components/sections/Services').then((m) => ({ default: m.Services }))
);
const Portfolio = lazy(() =>
  import('@/components/sections/Portfolio').then((m) => ({ default: m.Portfolio }))
);
const Process = lazy(() =>
  import('@/components/sections/Process').then((m) => ({ default: m.Process }))
);
const Testimonials = lazy(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const Pricing = lazy(() =>
  import('@/components/sections/Pricing').then((m) => ({ default: m.Pricing }))
);
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import('@/components/layout/Footer').then((m) => ({ default: m.Footer }))
);

function SectionFallback() {
  return (
    <div aria-hidden className="container-narrow section-padding">
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
      <CustomCursor />

      <a
        href="#about"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[80] rounded-full bg-white
          px-4 py-2 text-sm font-semibold text-black"
      >
        Skip to content
      </a>

      <div className="relative">
        {/* Background layers */}
        <div aria-hidden className="fixed inset-0 -z-30 bg-[#0b0b15]">
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="absolute inset-0 bg-grid-faint bg-[length:48px_48px] opacity-[0.28] mask-fade-x" />
          <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
        </div>
        <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden">
          <AuroraBlobs />
        </div>
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>
        </div>

        <Navbar />

        <main id="main" className="relative">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Services />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Portfolio />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Process />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Pricing />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
