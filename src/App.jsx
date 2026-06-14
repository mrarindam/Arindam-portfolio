import React, { useState, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogPage from './pages/BlogPage';
import useDocumentMetadata from './hooks/useDocumentMetadata';
import './index.css';

import ExplorePortfolio from './components/ExplorePortfolio';

import About from './components/About';
import Creations from './components/Creations';
import Footer from './components/Footer';
import Loader from './components/Loader';
const WorksPage = lazy(() => import('./pages/WorksPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useDocumentMetadata({
    title: "Mr Arindam — Developer, Creator & Builder | Portfolio",
    description: "Explore the portfolio of Mr Arindam — a Full Stack Developer specializing in modern web experiences, AI agents, Web3, and creative digital products.",
    canonicalPath: "/"
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <Navbar />
      <div className="app-main">
        <Hero />
        <ExplorePortfolio />
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <About />
          <Creations />
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const lenis = useLenis();

  // Global Lenis and GSAP ScrollTrigger ticker synchronization
  useEffect(() => {
    if (!lenis) return;

    // Synchronize ScrollTrigger updates with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Disable GSAP lag smoothing to ensure instant updates
    gsap.ticker.lagSmoothing(0);

    // Synchronize Lenis RAF loop with GSAP ticker
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Refresh ScrollTrigger after initialization
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  // Ensure pages are immediately visible and reset scroll to top
  useLayoutEffect(() => {
    document.documentElement.style.opacity = '1';
    
    const resetScroll = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
    const timeoutId = setTimeout(resetScroll, 50);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, lenis]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <AnimatePresence onExitComplete={() => ScrollTrigger.refresh()}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ReactLenis 
        root 
        autoRaf={false} 
        options={{ lerp: 0.05, smoothWheel: true }}
      >
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <AnimatedRoutes />
        </Suspense>
      </ReactLenis>
    </BrowserRouter>
  );
}