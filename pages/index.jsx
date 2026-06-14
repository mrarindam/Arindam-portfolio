import { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Seo from '../src/components/Seo';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import ExplorePortfolio from '../src/components/ExplorePortfolio';
import About from '../src/components/About';
import Creations from '../src/components/Creations';
import Footer from '../src/components/Footer';
import Loader from '../src/components/Loader';

// Structured data so search engines understand the site owner and brand.
const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://mrarindam.xyz/#person',
      name: 'Mr Arindam',
      url: 'https://mrarindam.xyz',
      jobTitle: 'Full Stack Developer',
      description:
        'Full Stack Developer specializing in modern web experiences, AI agents, Web3, and creative digital products.',
      sameAs: [
        'https://github.com/mrarindam',
        'https://x.com/ExeArindam',
        'https://t.me/MrxArindam',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mrarindam.xyz/#website',
      name: 'Mr Arindam Portfolio',
      url: 'https://mrarindam.xyz',
      publisher: { '@id': 'https://mrarindam.xyz/#person' },
      inLanguage: 'en',
    },
  ],
};

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Seo
        title="Mr Arindam | Developer, Creator & Builder | Portfolio"
        description="Explore the portfolio of Mr Arindam - a Full Stack Developer specializing in modern web experiences, AI agents, Web3, and creative digital products."
        canonicalPath="/"
        jsonLd={HOME_JSON_LD}
      />

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
