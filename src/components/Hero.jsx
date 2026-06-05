import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);

  // Text Layer Refs
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="home" className="hero-gsap-section">
      <div className="hero-viewport">

        {/* Cinematic Backgrounds */}
        <div ref={bg1Ref} className="hero-bg-layer" style={{ backgroundImage: "var(--hero-bg-1)", zIndex: 1 }} />
        <div ref={bg2Ref} className="hero-bg-layer" style={{ backgroundImage: "var(--hero-bg-2)", zIndex: 1, opacity: 0 }} />
        <div ref={bg3Ref} className="hero-bg-layer" style={{ backgroundImage: "var(--hero-bg-3)", zIndex: 1, opacity: 0 }} />

        {/* Overlays */}
        <div className="hero-vignette" />

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
      </div>
    </div>
  );
}
