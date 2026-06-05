import React, { useEffect, Suspense, lazy } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './index.css';

// Lazy load non-critical sections spanning below the fold
const About = lazy(() => import('./components/About'));
const Blogs = lazy(() => import('./components/Blogs'));
const Creations = lazy(() => import('./components/Creations'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  useEffect(() => {
    // Force scroll to top on every refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <Navbar />
      <div className="app-main">
        <Hero />

        {/* Defer heavy secondary DOM rendering until necessary fallback skeleton is resolved inline */}
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <About />
          <Blogs />
          <Creations />
          <Contact />
        </Suspense>
      </div>
    </ReactLenis>
  );
}
