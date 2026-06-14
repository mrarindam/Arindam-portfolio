import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import Blogs from './Blogs';
import './About.css';

// Brand logos
import idollyLogo from '../media/brandlogo/idolly AI.jpg';
import futureLeadersLogo from '../media/brandlogo/futureleaders.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const lenis = useLenis();
  const containerRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);

  // Text Layer Refs
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  // About Collage Refs
  const vignetteRef = useRef(null);
  const transitionBgRef = useRef(null);
  const aboutOverlayRef = useRef(null);
  const trackRef = useRef(null);
  const quoteRef = useRef(null);
  const titleColRef = useRef(null);

  // Bouncing logo refs (Panels 3 & 4)
  const discordLogoRef = useRef(null);
  const idollyLogoRef = useRef(null);
  const blogsWrapperRef = useRef(null);

  useLayoutEffect(() => {
    // Refresh ScrollTrigger so the page calculations are updated on reload
    ScrollTrigger.refresh();

    // Phones get a smaller, centered image so the stacked About title
    // (top) and quote (bottom) have clear space around it. Matches the
    // 768px breakpoint where .about-collage-container switches to a column.
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=15000", // Extended duration to accommodate the Blogs section slide up and hold
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // self.progress ranges from 0 to 1.
            let active = 'home';
            let theme = 'dark';
            if (self.progress >= 0.293 && self.progress < 0.879) {
              active = 'about';
              theme = 'light';
            } else if (self.progress >= 0.879) {
              active = 'blogs';
              theme = 'light';
            } else {
              active = 'home';
              theme = 'dark';
            }
            window.dispatchEvent(new CustomEvent('heroActiveSection', { detail: active }));
            if (containerRef.current) {
              containerRef.current.setAttribute('data-theme', theme);
            }
          }
        }
      });

      // Logos start raised & invisible so they can drop + bounce on reveal
      gsap.set([discordLogoRef.current, idollyLogoRef.current], {
        opacity: 0,
        y: -180
      });

      gsap.set(blogsWrapperRef.current, {
        y: "100%",
        visibility: "hidden",
        pointerEvents: "none"
      });

      // Initial State: Text layers 2 & 3 hidden
      gsap.set([text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: 20,
        filter: "blur(10px)"
      });
      gsap.set([bg2Ref.current, bg3Ref.current], { opacity: 0 });

      // Ensure bg3 initial properties are fully reset
      gsap.set(bg3Ref.current, {
        width: "100%",
        height: "100%",
        top: "0%",
        left: "0%",
        xPercent: 0,
        yPercent: 0,
        borderRadius: "0px",
        x: 0 // Reset any horizontal translation
      });

      // --- STAGE 1: Transition Scene 1 to Scene 2 ---
      tl.to(bg1Ref.current, { opacity: 0, scale: 1.1, duration: 2, ease: "power2.inOut" }, 0)
        .to(bg2Ref.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, 0);

      tl.to(text1Ref.current, {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.in"
      }, 0);

      tl.to(text2Ref.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "power2.out"
      }, 1.2);

      // --- STAGE 2: Transition Scene 2 to Scene 3 ---
      tl.to(bg2Ref.current, { opacity: 0, scale: 1.1, duration: 2, ease: "power2.inOut" }, 3.5)
        .to(bg3Ref.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, 3.5);

      tl.to(text2Ref.current, {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.in"
      }, 3.5);

      tl.to(text3Ref.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "power2.out"
      }, 4.7);

      // Image 3 zooms in slightly
      tl.to(bg3Ref.current, { scale: 1.1, duration: 2, ease: "none" }, 4.7);

      // Scene 3 is now fully visible around t=6.7. HOLD it here so the
      // "Turning Ideas Into Reality" text + image stay crisp and readable
      // for a good stretch of scrolling before the About transition begins.

      // --- STAGE 3: ZOOM OUT TO ABOUT COLLAGE & BG COLOR SHIFT ---

      // Hide Text 3 as we exit Hero narrative (after the hold)
      tl.to(text3Ref.current, {
        opacity: 0,
        y: -40,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.in"
      }, 10.3);

      // 1. Change background gradually to white gradient & fade out dark vignette
      // We start this slightly before the image shrink begins to prevent a black gap
      tl.to(transitionBgRef.current, {
        opacity: 1,
        duration: 3,
        ease: "power2.inOut"
      }, 9.7);

      tl.to(vignetteRef.current, {
        opacity: 0,
        duration: 3,
        ease: "power2.inOut"
      }, 9.7);

      // 2. Shrink bg3 into the center of the About bento collage
      tl.to(bg3Ref.current, {
        ...imageTarget,
        duration: 3.5,
        ease: "power2.inOut"
      }, 10.0);

      // 3. Make About Collage layout elements visible
      tl.to(aboutOverlayRef.current, {
        autoAlpha: 1,
        duration: 1
      }, 10.5);

      // 4. Fade in and slide the text components of Panel 1 into position
      tl.fromTo(titleColRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 11.3)
        .fromTo(quoteRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 11.3);

      // --- STAGE 4: HORIZONTAL TRANSITIONS (PANELS 2, 3, 4) ---

      // Slide 1 to 2: Skills & Technologies
      tl.to(trackRef.current, { xPercent: -25, ease: "power2.inOut", duration: 3.5 }, 14.0)
        .to(bg3Ref.current, { x: "-100vw", ease: "power2.inOut", duration: 3.5 }, 14.0)
        .to(transitionBgRef.current, { background: "linear-gradient(135deg, #fffcf6 0%, #fff3e0 100%)", duration: 3.5, ease: "power2.inOut" }, 14.0);

      // Slide 2 to 3: Discord Moderator
      tl.to(trackRef.current, { xPercent: -50, ease: "power2.inOut", duration: 3.5 }, 18.0)
        .to(transitionBgRef.current, { background: "linear-gradient(135deg, #faf7fc 0%, #f3e5f5 100%)", duration: 3.5, ease: "power2.inOut" }, 18.0);

      // Future Leaders logo drops in & bounces as Panel 3 settles
      tl.to(discordLogoRef.current, { opacity: 1, duration: 0.4, ease: "none" }, 20.0)
        .to(discordLogoRef.current, { y: 0, duration: 2.2, ease: "bounce.out" }, 20.0);

      // Slide 3 to 4: Brand Ambassador
      tl.to(trackRef.current, { xPercent: -75, ease: "power2.inOut", duration: 3.5 }, 22.0)
        .to(transitionBgRef.current, { background: "linear-gradient(135deg, #f2fbfb 0%, #e0f7fa 100%)", duration: 3.5, ease: "power2.inOut" }, 22.0);

      // IdollyAI logo drops in & bounces as Panel 4 settles
      tl.to(idollyLogoRef.current, { opacity: 1, duration: 0.4, ease: "none" }, 24.0)
        .to(idollyLogoRef.current, { y: 0, duration: 2.2, ease: "bounce.out" }, 24.0);

      // Slide 4 to 5: Blogs slide up
      tl.set(blogsWrapperRef.current, { visibility: "visible", pointerEvents: "auto" }, 25.5);
      tl.to(blogsWrapperRef.current, { y: "0%", ease: "power2.inOut", duration: 3.5 }, 25.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Ensure the page starts at the beginning (0) and ScrollTrigger gets refreshed
  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.update();
      ScrollTrigger.refresh();

      const forceScrollZero = () => {
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.update();
        ScrollTrigger.refresh();
      };
      
      requestAnimationFrame(forceScrollZero);
      const timeoutId = setTimeout(forceScrollZero, 50);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    document.documentElement.style.opacity = '1';
  }, [lenis]);

  return (
    <div ref={containerRef} id="home" className="hero-gsap-section" data-theme="dark">
      <div className="hero-viewport">

        {/* Cinematic Backgrounds */}
        <div ref={bg1Ref} className="hero-bg-layer" style={{ backgroundImage: "var(--hero-bg-1)", zIndex: 1 }} />
        <div ref={bg2Ref} className="hero-bg-layer" style={{ backgroundImage: "var(--hero-bg-2)", zIndex: 1, opacity: 0 }} />

        {/* bg3 is styled with absolute positioning properties so it can shrink cleanly */}
        <div ref={bg3Ref} className="hero-bg-layer" style={{
          backgroundImage: "var(--hero-bg-3)",
          zIndex: 4,
          opacity: 0,
          position: "absolute",
          transformOrigin: "center center"
        }} />

        {/* Overlays */}
        <div ref={vignetteRef} className="hero-vignette" />

        {/* Soft light transition background layer */}
        <div ref={transitionBgRef} className="about-transition-bg" />

        {/* --- STAGED CONTENT GROUPS --- */}
        <div className="content-container storytelling-mode">
          {/* Layer 1: Welcome */}
          <div ref={text1Ref} className="text-layer layer-1">
            <div className="title-container">
              <h1 className="title title-blue">Hi I'm <br className="mobile-break" />Arindam</h1>
            </div>
          </div>

          {/* Layer 2: Intro */}
          <div ref={text2Ref} className="text-layer layer-2" style={{ opacity: 0 }}>
            <div className="title-container">
              <h1 className="title title-gold">
                Designer<br />
                Developer<br />
                Creator
              </h1>
            </div>
          </div>

          {/* Layer 3: Vision */}
          <div ref={text3Ref} className="text-layer layer-3" style={{ opacity: 0 }}>
            <div className="title-container">
              <h1 className="title title-purple">Turning Ideas<br className="mobile-break" /> Into Reality</h1>
            </div>
          </div>
        </div>

        {/* --- ABOUT COLLAGE OVERLAY --- */}
        <div ref={aboutOverlayRef} className="about-collage-overlay">
          <div ref={trackRef} className="about-horizontal-track">

            {/* Panel 1: About Me (Original Layout) */}
            <div className="about-panel panel-1">
              <div className="about-collage-container">
                {/* Left Column: Title */}
                <div ref={titleColRef} className="about-title-column">
                  <h2 className="about-main-title">About<br />Me</h2>
                </div>

                {/* Center Spacer matching target image bounds */}
                <div className="about-image-center-placeholder"></div>

                {/* Right Column: Quote and signature */}
                <div ref={quoteRef} className="collage-quote-box">
                  <p className="collage-quote">"It doesn't matter where you start, it's how you progress from there."</p>
                  <span className="collage-signature">Lando Norris</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Skills & Technologies */}
            <div className="about-panel panel-2">
              <div className="about-panel-content skills-panel-content">
                <h2 className="about-panel-title">Skills & Technologies</h2>
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
                  <div className="skills-row skills-row-wide">
                    <span className="skills-row-label">Tools</span>
                    <span className="skills-row-items">Git / GitHub, VS Code, Vercel, Linux, Docker</span>
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

        {/* --- BLOGS PINNED OVERLAY --- */}
        <div ref={blogsWrapperRef} className="blogs-pinned-wrapper">
          <Blogs />
        </div>

      </div>
    </div>
  );
}
