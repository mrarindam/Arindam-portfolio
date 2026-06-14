import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Graphics Images (served from /public/media)
const img1 = '/media/graphics/1.webp';
const img2 = '/media/graphics/2.webp';
const img3 = '/media/graphics/3.webp';
const img4 = '/media/graphics/4.webp';
const img5 = '/media/graphics/5.webp';
const img6 = '/media/graphics/6.webp';
const img7 = '/media/graphics/7.webp';
const img8 = '/media/graphics/8.webp';
const img9 = '/media/graphics/9.webp';

// 'Explore The Works.svg' contains spaces, so it is URL-encoded
const exploreTheWorksSvg = '/media/graphics/Explore%20The%20Works.svg';

gsap.registerPlugin(ScrollTrigger);

export default function ExplorePortfolio() {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useLayoutEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
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

      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="explore-transition" className="explore-section" data-theme="dark">
      {/* Wrapper to clip column overflow so explore-section can use overflow: visible for position: sticky */}
      <div className="explore-grid-wrapper">
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
      </div>

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
