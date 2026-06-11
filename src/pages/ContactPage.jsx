import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import './ContactPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detect mobile screens dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Initialize ScrollTrigger pinning and zooming after slide-in transitions complete (Desktop only)
  useEffect(() => {
    if (!animationDone || isMobile) return;

    // Small delay to ensure the browser layout has repainted and removed transform containing blocks
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=220%", // Cinematic zoom scroll length
            scrub: 1.2,    // Smooth interpolation scrub delay
            pin: true,     // Pin the zoom container in the viewport
            anticipatePin: 1
          }
        });

        // Zoom the SVG text directly inside the vertical stroke of the letter "N"
        tl.to(textRef.current, {
          scale: 800,
          ease: "power2.inOut", // Organic ease-in-out speed curve
          duration: 1.0
        }, 0);

        // Fade in the black overlay to transition the background from light to black.
        // Delayed to start at 25% progress to blend letter stroke boundaries.
        tl.to(overlayRef.current, {
          opacity: 1,
          ease: "power1.in",
          duration: 0.6
        }, 0.25);

        // Fade out the SVG near the end of the timeline
        tl.to(textRef.current, {
          opacity: 0,
          ease: "none",
          duration: 0.2
        }, 0.8);

      }, containerRef);

      ScrollTrigger.refresh();

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, [animationDone, isMobile]);

  return (
    <motion.div 
      ref={containerRef}
      className="contact-page-wrapper"
      initial={{ x: "-100%", opacity: 0.9 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.9 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        // Direct DOM update to clear transforms immediately and avoid render race conditions
        if (containerRef.current) {
          containerRef.current.style.transform = "none";
        }
        setAnimationDone(true);
      }}
      style={animationDone ? { transform: "none" } : {}}
    >
      <Navbar />

      {/* SECTION 1: ZOOM EFFECT (Pinned dynamically by GSAP ScrollTrigger once transition is done) */}
      {!isMobile && (
        <div ref={triggerRef} className="contact-zoom-section" data-theme="light">
          {/* Black Background Overlay */}
          <div ref={overlayRef} className="black-overlay" style={{ opacity: 0 }} />

          {/* SVG Zoom-in Layer */}
          <div className="zoom-svg-layer">
            <svg 
              ref={textRef}
              viewBox="0 0 1200 300" 
              className="zoom-svg-text"
              style={{ transformOrigin: "29.5% 52%" }}
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="'Orbitron', sans-serif"
                fontWeight="900"
                fill="#030308"
                fontSize="100"
                letterSpacing="15"
              >
                CONTACT ME
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* SECTION 2: CONTENT DETAILS SECTION (Scrolls up naturally below Section 1) */}
      <div className="contact-details-section" data-theme="dark">
        <Contact />
      </div>
    </motion.div>
  );
}
