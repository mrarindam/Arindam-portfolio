import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExplorePortfolio.css';

// Graphics Images
import img1 from '../media/graphics/1.webp';
import img2 from '../media/graphics/2.webp';
import img3 from '../media/graphics/3.webp';
import img4 from '../media/graphics/4.webp';
import img5 from '../media/graphics/5.webp';
import img6 from '../media/graphics/6.webp';
import img7 from '../media/graphics/7.webp';
import img8 from '../media/graphics/8.webp';
import img9 from '../media/graphics/9.webp';

import exploreTheWorksSvg from '../media/graphics/Explore The Works.svg';

gsap.registerPlugin(ScrollTrigger);

export default function ExplorePortfolio() {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Column Parallax Animations (No pinning, dynamically translates columns as the user scrolls past)
      gsap.to(col1Ref.current, {
        y: '-100px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(col2Ref.current, {
        y: '80px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(col3Ref.current, {
        y: '-120px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="explore-transition" className="explore-section">
      {/* Dynamic Masonry Background Grid - 3 Columns */}
      <div className="explore-masonry-grid">
        <div ref={col1Ref} className="explore-col col-1">
          <div className="explore-card">
            <img src={img1} alt="Graphic 1" loading="lazy" />
          </div>
          <div className="explore-card">
            <img src={img4} alt="Graphic 4" loading="lazy" />
          </div>
          <div className="explore-card">
            <img src={img7} alt="Graphic 7" loading="lazy" />
          </div>
        </div>
        
        <div ref={col2Ref} className="explore-col col-2">
          <div className="explore-card">
            <img src={img2} alt="Graphic 2" loading="lazy" />
          </div>
          <div className="explore-card">
            <img src={img5} alt="Graphic 5" loading="lazy" />
          </div>
          <div className="explore-card">
            <img src={img8} alt="Graphic 8" loading="lazy" />
          </div>
        </div>

        <div ref={col3Ref} className="explore-col col-3">
          <div className="explore-card">
            <img src={img3} alt="Graphic 3" loading="lazy" />
          </div>
          <div className="explore-card">
            <img src={img6} alt="Graphic 6" loading="lazy" />
          </div>
          <div className="explore-card">
            <img src={img9} alt="Graphic 9" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="explore-overlay-vignette" />

      {/* Floating handwritten cursive SVG text container */}
      <div className="explore-text-container">
        <img
          src={exploreTheWorksSvg}
          alt="Explore The Works"
          className="explore-svg-text"
        />
      </div>
    </section>
  );
}
