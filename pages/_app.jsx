import { useEffect, useLayoutEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactLenis, useLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Global stylesheets ---
// In the Next.js Pages Router, plain (non-module) global CSS may only be
// imported from this Custom App file. The original components/pages imported
// their own CSS; those imports have been moved here. The cascade is identical
// because every selector is global/class-based.
import '../src/index.css';
import '../src/components/Navbar.css';
import '../src/components/Loader.css';
import '../src/components/About.css';
import '../src/components/Blogs.css';
import '../src/components/Creations.css';
import '../src/components/ExplorePortfolio.css';
import '../src/components/Footer.css';
import '../src/components/Contact.css';
import '../src/components/ShareModal.css';
import '../src/styles/AboutPage.css';
import '../src/styles/BlogsPage.css';
import '../src/styles/WorksPage.css';
import '../src/styles/ContactPage.css';
import '../src/styles/LegalPages.css';

gsap.registerPlugin(ScrollTrigger);

function AppInner({ Component, pageProps }) {
  const router = useRouter();
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

  // Recalculate all GSAP ScrollTriggers after each client-side navigation.
  //
  // Because page transitions overlap (the outgoing page stays mounted for the
  // duration of its exit animation) and pages like the Hero/About build their
  // pinned timelines on a deferred timer (~900ms), a one-shot refresh isn't
  // enough: the pin-spacers can be measured while the previous page's spacer is
  // still in the DOM, leaving a blank gap. We reset scroll on completion and
  // fire a staggered set of refreshes so the final one runs *after* the old
  // page has fully unmounted AND the new page's deferred setup has finished.
  useEffect(() => {
    let timers = [];

    const handleRouteChangeComplete = () => {
      // Clear any pending refreshes from a previous navigation
      timers.forEach(clearTimeout);
      timers = [];

      const refresh = () => ScrollTrigger.refresh();

      // Reset scroll to the top so pin start positions measure from 0
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      // Immediate + staggered recalcs. The later timers (>900ms) guarantee a
      // clean measurement once deferred pin timelines (Hero/About) are built
      // and the previous page's pin-spacer has been removed.
      requestAnimationFrame(refresh);
      timers.push(setTimeout(refresh, 200));
      timers.push(setTimeout(refresh, 1000));
      timers.push(setTimeout(refresh, 1300));
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      timers.forEach(clearTimeout);
    };
  }, [router.events, lenis]);

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
  }, [router.asPath, lenis]);

  // Key on the pathname WITHOUT the query string. The Navbar performs a
  // shallow `router.replace('/', ...)` to clear the `?scrollTo=` param after a
  // cross-page scroll; keying on the full asPath would treat `/?scrollTo=home`
  // and `/` as different routes and needlessly remount (and rebuild every GSAP
  // timeline on) the home page mid-transition. Stripping the query keeps the
  // home page mounted while still giving each distinct route/blog slug its own
  // key for the enter/exit animation.
  const routeKey = router.asPath.split('?')[0];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <AnimatePresence onExitComplete={() => ScrollTrigger.refresh()}>
        <Component key={routeKey} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ReactLenis
        root
        autoRaf={false}
        options={{ lerp: 0.05, smoothWheel: true }}
      >
        <AppInner Component={Component} pageProps={pageProps} />
      </ReactLenis>
    </>
  );
}
