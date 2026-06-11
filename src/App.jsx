import React, { useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogPage from './pages/BlogPage';
import './index.css';

import ExplorePortfolio from './components/ExplorePortfolio';

import About from './components/About';
import Creations from './components/Creations';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const WorksPage = lazy(() => import('./pages/WorksPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));

function HomePage() {
  return (
    <>
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

  // Global GSAP ticker sync with Lenis scrolling
  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenisRAF = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenisRAF);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateLenisRAF);
    };
  }, [lenis]);

  // Track scroll position on home page
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.location.pathname === '/') {
            sessionStorage.setItem('homeScrollY', window.scrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure non-home pages are immediately visible and reset scroll to top
  useLayoutEffect(() => {
    if (location.pathname !== '/') {
      document.documentElement.style.opacity = '1';
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, lenis]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ReactLenis root autoRaf={false} options={{ lerp: 0.05, smoothWheel: true }}>
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <AnimatedRoutes />
        </Suspense>
      </ReactLenis>
    </BrowserRouter>
  );
}