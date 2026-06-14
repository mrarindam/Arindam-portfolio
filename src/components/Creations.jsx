import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Creations.css';

import { mainProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const MotionLink = motion(Link);

const getProjectGradient = (id) => {
  switch (id) {
    case 1:
      return 'linear-gradient(135deg, #ffffff 0%, #fffbf0 50%, #ffeec2 100%)';
    case 2:
      return 'linear-gradient(135deg, #ffffff 0%, #f3effc 50%, #e6dcf7 100%)';
    case 3:
      return 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 50%, #dbeeff 100%)';
    case 4:
      return 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #dcfce7 100%)';
    case 5:
      return 'linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #ffedd5 100%)';
    default:
      return 'linear-gradient(135deg, #ffffff 0%, #fff0f3 50%, #ffe5ec 100%)';
  }
};

export default function Creations() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < mainProjects.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Pinning cards on desktop/tablet to eliminate heavy scroll lag on mobile viewports
    mm.add("(min-width: 601px)", () => {
      const cards = gsap.utils.toArray('.project-card-wrapper');
      
      cards.forEach((card, idx) => {
        if (idx === cards.length - 1) return; // Do not pin the last card

        ScrollTrigger.create({
          trigger: card,
          pin: true,
          pinSpacing: false,
          start: `top ${idx * 30}px`,
          endTrigger: cards[cards.length - 1],
          end: `top ${idx * 30}px`,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });
      });
    });

    // Global ScrollTrigger for active section tracking
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80px',
        end: 'bottom top',
        onEnter: () => window.dispatchEvent(new CustomEvent('heroActiveSection', { detail: 'creations' })),
        onLeave: () => window.dispatchEvent(new CustomEvent('heroActiveSection', { detail: 'home' })),
        onEnterBack: () => window.dispatchEvent(new CustomEvent('heroActiveSection', { detail: 'creations' })),
        onLeaveBack: () => window.dispatchEvent(new CustomEvent('heroActiveSection', { detail: 'blogs' })),
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="creations"
      className="creations-section"
      ref={sectionRef}
      data-theme="light"
    >
      <div 
        className="creations-slider-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="creations-cards-track"
          style={{
            '--active-index': activeIndex
          }}
        >
          {mainProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`project-card-wrapper ${idx === 0 ? 'first-card' : ''} ${idx === activeIndex ? 'active' : ''}`}
              style={{
                zIndex: idx + 1,
                background: getProjectGradient(project.id),
                '--stack-offset': `${idx * 20}px`
              }}
            >
              <div className="creations-container">
                {/* LEFT SIDE: Info */}
                <div className="project-info">
                  <div className="info-content">
                    <div className="top-nav-arrows">
                      <div className="project-number">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <h3 className="project-title">{project.name}</h3>
                    {project.stack && project.stack.length > 0 && (
                      <span className="project-tag">{project.stack[0]}</span>
                    )}
                    <p className="project-desc">{project.description}</p>

                    <div className="project-actions">
                      {project.demoLink && (
                        <motion.a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="creations-btn btn-primary"
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          Visit
                        </motion.a>
                      )}
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="creations-btn btn-secondary"
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          GitHub
                        </motion.a>
                      )}
                      {idx === mainProjects.length - 1 && (
                        <MotionLink
                          to="/works"
                          className="creations-btn btn-explore-more"
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          Explore More &rarr;
                        </MotionLink>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Preview Card */}
                <div className="preview-container">
                  <div className="preview-card">
                    <div className="card-glow-pulse"></div>
                    <div className="preview-card-inner">
                      {project.image ? (
                        <img src={project.image} alt={project.name} className="preview-image" loading="lazy" />
                      ) : (
                        <div className="preview-image" style={{ background: 'rgba(0,0,0,0.05)' }}></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Controls */}
        <button 
          className="nav-btn prev-btn mobile-only-control" 
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="mobile-explore-more-container mobile-only-control">
          <MotionLink
            to="/works"
            className="mobile-explore-more-btn"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            EXPLORE MORE
          </MotionLink>
        </div>

        <button 
          className="nav-btn next-btn mobile-only-control" 
          onClick={() => activeIndex < mainProjects.length - 1 && setActiveIndex(activeIndex + 1)}
          disabled={activeIndex === mainProjects.length - 1}
          aria-label="Next project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
