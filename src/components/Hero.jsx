import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePerformance from '../hooks/usePerformance';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { particleDensity } = usePerformance();
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const swordRef = useRef(null);
  
  // Text Layer Refs
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const indicatorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Slightly longer for cinematic storytelling
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initial State: Text layers 2 & 3 hidden
      gsap.set([text2Ref.current, text3Ref.current], { 
        opacity: 0, 
        y: 20, 
        filter: "blur(10px)" 
      });
      gsap.set([bg2Ref.current, bg3Ref.current], { opacity: 0 });

      // --- STAGE 1: Transition Scene 1 to Scene 2 ---
      
      // Image 1 fades out, Image 2 fades in
      tl.to(bg1Ref.current, { opacity: 0, scale: 1.1, duration: 2, ease: "power2.inOut" }, 0)
        .to(swordRef.current, { opacity: 0, duration: 1 }, 0)
        .to(bg2Ref.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, 0);

      // Text 1 fades out (Starts exactly at scroll 0)
      tl.to(text1Ref.current, { 
        opacity: 0, 
        y: -20, 
        filter: "blur(10px)", 
        duration: 1.5, 
        ease: "power2.in" 
      }, 0);

      // Text 2 fades in (Delayed slightly after Image 2/Scene 2 starts)
      tl.to(text2Ref.current, { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 2, 
        ease: "power2.out" 
      }, 1.2);

      // --- STAGE 2: Transition Scene 2 to Scene 3 ---

      // Image 2 fades out, Image 3 fades in
      tl.to(bg2Ref.current, { opacity: 0, scale: 1.1, duration: 2, ease: "power2.inOut" }, 3.5)
        .to(bg3Ref.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, 3.5);

      // Text 2 fades out
      tl.to(text2Ref.current, { 
        opacity: 0, 
        y: -20, 
        filter: "blur(10px)", 
        duration: 1.5, 
        ease: "power2.in" 
      }, 3.5);

      // Text 3 fades in (Delayed after Image 3 starts)
      tl.to(text3Ref.current, { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 2, 
        ease: "power2.out" 
      }, 4.7);

      // Image 3 final zoom
      tl.to(bg3Ref.current, { scale: 1.1, duration: 3, ease: "none" }, 4.7);

      // Hide indicator immediately
      tl.to(indicatorRef.current, { opacity: 0, duration: 0.5 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Particles remain constant across all hero scenes, dynamically reduced based on GPU performance
    const count = Math.floor(150 * particleDensity);
    const particleArray = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 120,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * -5,
      sway: (Math.random() - 0.5) * 60
    }));
    setParticles(particleArray);
  }, [particleDensity]);

  return (
    <div ref={containerRef} id="home" className="hero-gsap-section">
      <div className="hero-viewport">
        
        {/* Cinematic Backgrounds */}
        <div ref={bg1Ref} className="hero-bg-layer" style={{ backgroundImage: "url('/hero-bg.webp')", zIndex: 1 }} />
        <div ref={bg2Ref} className="hero-bg-layer" style={{ backgroundImage: "url('/hero-bg-2.webp')", zIndex: 1 }} />
        <div ref={bg3Ref} className="hero-bg-layer" style={{ backgroundImage: "url('/hero-bg-3.webp')", zIndex: 1 }} />
        
        {/* Overlays */}
        <div className="hero-vignette" />
        <div ref={swordRef} className="sword-glow" style={{ zIndex: 2 }}></div>
        
        {/* Particles */}
        <div className="particles-layer">
          {particles.map(p => (
            <div 
              key={p.id} 
              className="particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--sway': `${p.sway}px`
              }}
            ></div>
          ))}
        </div>

        {/* --- STAGED CONTENT GROUPS --- */}
        <div className="content-container storytelling-mode">
          
          {/* Layer 1: Welcome */}
          <div ref={text1Ref} className="text-layer layer-1">
            <div className="title-container">
              <div className="title-glow-aura"></div>
              <h1 className="title">WELCOME TO<br className="mobile-break" /> MY WORLD</h1>
            </div>
          </div>

          {/* Layer 2: Intro */}
          <div ref={text2Ref} className="text-layer layer-2">
            <h2 className="subtitle">The Journey Begins</h2>
            <div className="title-container">
              <div className="title-glow-aura"></div>
              <h1 className="title">Hi, I'm<br className="mobile-break" /> Arindam</h1>
            </div>
          </div>

          {/* Layer 3: Vision */}
          <div ref={text3Ref} className="text-layer layer-3">
            <h2 className="subtitle">Design × Innovation</h2>
            <p className="description large-desc">
              Experience the fusion of <span className="highlight-text">cinematic anime aesthetics</span> and <span className="highlight-text">modern web portfolio design</span>, where every interaction <span className="highlight-text">feels alive</span>.
            </p>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div ref={indicatorRef} className="scroll-indicator">
          <span className="scroll-text">Scroll To Experience</span>
          <svg className="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
