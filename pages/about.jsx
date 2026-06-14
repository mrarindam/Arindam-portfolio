import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Seo from '../src/components/Seo';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Brand logos (served from /public/media; 'idolly AI.jpg' is URL-encoded)
const idollyLogo = '/media/brandlogo/idolly%20AI.jpg';
const futureLeadersLogo = '/media/brandlogo/futureleaders.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const imageRef = useRef(null);
  const discordLogoRef = useRef(null);
  const idollyLogoRef = useRef(null);
  const transitionBgRef = useRef(null);
  const lenis = useLenis();
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const ctxRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.pathname.startsWith('/about')) {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      ScrollTrigger.refresh();
    }
  }, [router.pathname]);

  // 1. On mount, reset scroll and set initial static layout positioning immediately to ensure perfect visual layout during transition
  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    const isCompact = window.matchMedia("(max-width: 600px)").matches;
    const imageTarget = isCompact
      ? {
        width: "60vw",
        height: "38vh",
        minWidth: "0px",
        minHeight: "0px",
        maxWidth: "360px",
        maxHeight: "420px",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        borderRadius: "8px",
        scale: 1,
      }
      : {
        width: "32vw",
        height: "54vh",
        minWidth: "350px",
        minHeight: "450px",
        maxWidth: "500px",
        maxHeight: "600px",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        borderRadius: "8px",
        scale: 1,
      };

    const ctx = gsap.context(() => {
      // Set initial logo states
      gsap.set([discordLogoRef.current, idollyLogoRef.current], {
        opacity: 0,
        y: -180
      });

      // Set initial image placement
      gsap.set(imageRef.current, {
        position: "absolute",
        transformOrigin: "center center",
        zIndex: 4,
        ...imageTarget
      });

      // Set initial track position
      gsap.set(trackRef.current, { xPercent: 0 });
    });

    return () => ctx.revert();
  }, [lenis]);

  // 2. Initialize ScrollTrigger timeline only AFTER the entrance slide transition has completed, ensuring buttery smooth page transitions
  useLayoutEffect(() => {
    if (!isTransitionComplete) return;

    const isCompact = window.matchMedia("(max-width: 600px)").matches;
    const imageTarget = isCompact
      ? {
        width: "60vw",
        height: "38vh",
        minWidth: "0px",
        minHeight: "0px",
        maxWidth: "360px",
        maxHeight: "420px",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        borderRadius: "8px",
        scale: 1,
      }
      : {
        width: "32vw",
        height: "54vh",
        minWidth: "350px",
        minHeight: "450px",
        maxWidth: "500px",
        maxHeight: "600px",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        borderRadius: "8px",
        scale: 1,
      };

    let refreshTimer;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=4500",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Initial placement (redundancy safety)
      gsap.set([discordLogoRef.current, idollyLogoRef.current], {
        opacity: 0,
        y: -180
      });
      gsap.set(imageRef.current, {
        position: "absolute",
        transformOrigin: "center center",
        zIndex: 4,
        ...imageTarget
      });
      gsap.set(trackRef.current, { xPercent: 0 });

      // --- STAGE 1: Hold on Panel 1 (0 to 3.0 seconds) ---

      // --- STAGE 2: Slide Panel 1 -> 2 (3.0 to 6.5 seconds) ---
      tl.to(trackRef.current, { xPercent: -25, ease: "power2.inOut", duration: 3.5 }, 3.0)
        .to(imageRef.current, { x: "-100vw", ease: "power2.inOut", duration: 3.5 }, 3.0)
        .to(transitionBgRef.current, { background: "linear-gradient(135deg, #fffcf6 0%, #fff3e0 100%)", duration: 3.5, ease: "power2.inOut" }, 3.0);

      // --- STAGE 3: Hold on Panel 2 (6.5 to 8.5 seconds) ---

      // --- STAGE 4: Slide Panel 2 -> 3 (8.5 to 12.0 seconds) ---
      tl.to(trackRef.current, { xPercent: -50, ease: "power2.inOut", duration: 3.5 }, 8.5)
        .to(transitionBgRef.current, { background: "linear-gradient(135deg, #faf7fc 0%, #f3e5f5 100%)", duration: 3.5, ease: "power2.inOut" }, 8.5);

      // Future Leaders logo drops in Panel 3
      tl.to(discordLogoRef.current, { opacity: 1, duration: 0.4 }, 9.5)
        .to(discordLogoRef.current, { y: 0, duration: 2.2, ease: "bounce.out" }, 9.5);

      // --- STAGE 5: Hold on Panel 3 (12.0 to 14.0 seconds) ---

      // --- STAGE 6: Slide Panel 3 -> 4 (14.0 to 17.5 seconds) ---
      tl.to(trackRef.current, { xPercent: -75, ease: "power2.inOut", duration: 3.5 }, 14.0)
        .to(transitionBgRef.current, { background: "linear-gradient(135deg, #f2fbfb 0%, #e0f7fa 100%)", duration: 3.5, ease: "power2.inOut" }, 14.0);

      // IdollyAI logo drops in Panel 4
      tl.to(idollyLogoRef.current, { opacity: 1, duration: 0.4 }, 15.0)
        .to(idollyLogoRef.current, { y: 0, duration: 2.2, ease: "bounce.out" }, 15.0);

      // --- STAGE 7: Hold on Panel 4 (17.5 to 20.0 seconds) ---

    }, containerRef);
    ctxRef.current = ctx;

    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      clearTimeout(refreshTimer);
    };
  }, [isTransitionComplete]);

  return (
    <>
      {/* Curtain 1: Purple curtain matching the blogs design */}
      <motion.div
        initial={{ clipPath: "ellipse(150% 100% at 50% 50%)" }}
        animate={{ clipPath: "ellipse(150% 100% at 300% 50%)" }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#7b4dd4',
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      />

      <Seo
        title="About Me | Mr Arindam — Developer & Creator"
        description="Get to know Arindam — a Full Stack Developer specializing in modern web experiences, AI agents, Discord moderation, and brand ambassadorship in AI & Web3."
        canonicalPath="/about"
      />
      <Navbar />
      <motion.div 
        className="about-page-wrapper"
        data-theme="light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, position: "relative" }}
        exit={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onAnimationComplete={() => {
          setIsTransitionComplete(true);
          ScrollTrigger.refresh();
        }}
      >

        <div ref={containerRef} className="about-animation-section">
          {/* Soft light transition background layer */}
          <div ref={transitionBgRef} className="about-transition-bg" />

          {/* Center image positioned absolutely inside container */}
          <div ref={imageRef} className="about-main-image-container">
            <div className="about-main-image" />
          </div>

          <div ref={trackRef} className="about-horizontal-track">
            {/* Panel 1: About Me */}
            <div className="about-panel panel-1">
              <div className="about-collage-container">
                {/* Left Column: Title */}
                <div className="about-title-column">
                  <h2 className="about-main-title">About<br />Me</h2>
                </div>

                {/* Center Spacer matching target image bounds */}
                <div className="about-image-center-placeholder"></div>

                {/* Right Column: Quote and signature */}
                <div className="collage-quote-box">
                  <p className="collage-quote">"It doesn't matter where you start, it's how you progress from there."</p>
                  <span className="collage-signature">Lando Norris</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Skills & Technologies */}
            <div className="about-panel panel-2">
              <div className="about-panel-content skills-panel-content">
                <h2 className="about-panel-title">Tech Stack</h2>
                <p className="skills-intro">
                  Full Stack Developer specializing in modern web experiences, AI-powered applications and scalable backend systems.
                </p>
                <div className="skills-list">
                  <div className="skills-row">
                    <span className="skills-row-label">Frontend Development</span>
                    <span className="skills-row-items">Next.js, React, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS</span>
                  </div>
                  <div className="skills-row">
                    <span className="skills-row-label">Animation & UI</span>
                    <span className="skills-row-items">Framer Motion, Motion, Lenis, GSAP, Three.js, OGL, WebGL</span>
                  </div>
                  <div className="skills-row">
                    <span className="skills-row-label">Backend Development</span>
                    <span className="skills-row-items">Node.js, Express.js, Python, REST APIs, Auth & Authz</span>
                  </div>
                  <div className="skills-row">
                    <span className="skills-row-label">Database</span>
                    <span className="skills-row-items">MongoDB, Supabase, PostgreSQL, Firebase</span>
                  </div>
                  <div className="skills-row">
                    <span className="skills-row-label">AI & Automation</span>
                    <span className="skills-row-items">AI Agents, OpenAI APIs, Workflows, Automation, Prompt Eng., LLMs</span>
                  </div>
                  <div className="skills-row">
                    <span className="skills-row-label">Web3 Development</span>
                    <span className="skills-row-items">EVM Ecosystem, Smart Contracts, Wallet Connect, Web3.js, Ethers.js, Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: Discord Moderator */}
            <div className="about-panel panel-3">
              <div className="about-panel-content double-column-panel">
                <div className="panel-left-col panel-text-col">
                  <h2 className="about-panel-title panel-title-left">Discord Moderator</h2>
                  <p className="about-panel-desc">
                    As a Moderator, I help maintain a safe, engaging, and organized community environment. My responsibilities include community moderation, member support, conflict resolution, event coordination, bot management, permission systems, and ensuring smooth day-to-day server operations. I also manage and configure Discord bots to automate workflows, moderation tasks, and community engagement systems.
                  </p>
                </div>
                <div className="panel-right-col panel-server-col">
                  <h3 className="server-heading">Servers</h3>
                  <a
                    href="https://discord.gg/Tbd96eh4Tq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="server-logo-link"
                    aria-label="Join the Future Leaders Discord server"
                  >
                    <img ref={discordLogoRef} src={futureLeadersLogo} alt="Future Leaders" className="server-logo-img" />
                    <span className="server-logo-name">Future Leaders</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Panel 4: Brand Ambassador */}
            <div className="about-panel panel-4">
              <div className="about-panel-content double-column-panel">
                <div className="panel-left-col panel-text-col">
                  <h2 className="about-panel-title panel-title-left">Brand Ambassador</h2>
                  <p className="about-panel-desc">
                    I have experience working as a Brand Ambassador within the AI and Web3 ecosystem, helping projects expand their reach, strengthen community engagement and build meaningful relationships with users.
                  </p>
                  <p className="about-panel-desc">
                    I actively contributed to community growth through content creation, social media engagement, user onboarding, feedback collection and project advocacy across platforms such as X (Twitter) and Discord.
                  </p>
                </div>
                <div className="panel-right-col panel-server-col">
                  <h3 className="server-heading">Brands</h3>
                  <a
                    href="https://x.com/idolly_AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="server-logo-link"
                    aria-label="Visit IdollyAI on X"
                  >
                    <img ref={idollyLogoRef} src={idollyLogo} alt="IdollyAI" className="server-logo-img" />
                    <span className="server-logo-name">IdollyAI</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Footer />
      </motion.div>
    </>
  );
}
