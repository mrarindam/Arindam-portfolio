import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogPage from './pages/BlogPage';
import './index.css';

import ExplorePortfolio from './components/ExplorePortfolio';

const About = lazy(() => import('./components/About'));
const Creations = lazy(() => import('./components/Creations'));
const Footer = lazy(() => import('./components/Footer'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

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

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </ReactLenis>
    </BrowserRouter>
  );
}
