import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ReactLenis } from 'lenis/react';
import Hero from './components/Hero';
import IntroLoader from './components/IntroLoader';
import CursorSparks from './components/CursorSparks';
import usePerformance from './hooks/usePerformance';
import './index.css';

// Lazy load non-critical sections spanning below the fold
const About = lazy(() => import('./components/About'));
const Blogs = lazy(() => import('./components/Blogs'));
const Creations = lazy(() => import('./components/Creations'));
const Contact = lazy(() => import('./components/Contact'));
const UnifiedBackground = lazy(() => import('./components/UnifiedBackground'));

export default function App() {
  const { canPlayVideo } = usePerformance();
  const [siteEntered, setSiteEntered] = useState(!canPlayVideo);

  useEffect(() => {
    // 1) Force scroll to top on every refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Guarantee user is rigidly stuck at top until the portal video completes
  useEffect(() => {
    if (!siteEntered) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed'; // Eradicates iOS Safari touch-drag scroll leaks
      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.height = 'auto';
      document.body.style.width = 'auto';
      window.scrollTo(0, 0); // Mathematically forces scroll exactly strictly to L1 upon portal exit!
    }
  }, [siteEntered]);

  return (
    <>
      {!siteEntered && <IntroLoader onComplete={() => setSiteEntered(true)} />}

      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="app-main">
        <CursorSparks />
        <Hero />
        
        {/* Defer heavy secondary DOM rendering until necessary fallback skeleton is resolved inline */}
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <About />
          <UnifiedBackground />
          <Blogs />
          <Creations />
          <Contact />
        </Suspense>
      </div>
      </ReactLenis>
    </>
  );
}
