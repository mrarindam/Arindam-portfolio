import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './Creations.css';

import { mainProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Pinning cards on desktop only to eliminate heavy scroll lag on mobile viewports
    mm.add("(min-width: 769px)", () => {
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
      <div className="creations-cards-stack">
        {mainProjects.map((project, idx) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className={`project-card-wrapper ${idx === 0 ? 'first-card' : ''}`}
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
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="creations-btn btn-primary">
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="creations-btn btn-secondary">
                        GitHub
                      </a>
                    )}
                    {idx === mainProjects.length - 1 && (
                      <Link to="/projects" className="creations-btn btn-explore-more">
                        Explore More &rarr;
                      </Link>
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
    </section>
  );
}
