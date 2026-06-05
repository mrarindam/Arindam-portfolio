/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Creations.css';

import prj1 from '../media/Projects/prj1.webp';
import prj2 from '../media/Projects/prj2.webp';
import prj3 from '../media/Projects/prj3.webp';
import prj4 from '../media/Projects/prj4.webp';
import prj5 from '../media/Projects/prj5.webp';
import prj6 from '../media/Projects/prj6.webp';
import prj7 from '../media/Projects/prj7.webp';
import prj8 from '../media/Projects/prj8.webp';

const projects = [
  {
    id: 1,
    name: 'Tokensight AI',
    stack: ['Next Js', 'Tailwind CSS'],
    description: 'Scan any Solana token in seconds. Analyze liquidity, holder concentration, creator behavior and price momentum with real-time, AI-driven risk signals.',
    image: prj1,
    demoLink: 'https://tokensightai.tech/',
    githubLink: 'https://github.com/mrarindam/TokenSight-Ai'
  },
  {
    id: 2,
    name: 'Text Editions',
    stack: ['React Native'],
    description: 'A robust text-editing utility designed with performance and clean architecture for smooth mobile editing workflows.',
    image: prj2,
    demoLink: 'https://arindamk143.github.io/text-edit/',
    githubLink: 'https://github.com/Arindamk143/text-edit'
  },
  {
    id: 3,
    name: 'Solar System',
    stack: ['WebGL', 'Three Js'],
    description: 'An immersive, fully interactive 3D web experience showcasing the planets with stunning graphics and real-time rendering.',
    image: prj3,
    demoLink: 'https://solar-system-ca.web.app/',
    githubLink: 'https://github.com/Arindamk143/Solar-System'

  },
  {
    id: 4,
    name: 'Find About You',
    stack: ['Ip.Api', 'React Native'],
    description: 'An intuitive mobile application that gathers detailed network and location data to provide comprehensive user insights.',
    image: prj4,
    demoLink: 'https://arindamk143.github.io/GetaboutU/',
    githubLink: 'https://github.com/Arindamk143/GetaboutU'
  },
  {
    id: 5,
    name: 'Skate Escape',
    stack: ['React Native', 'Three Js', 'React Three Fiber', 'Vite'],
    description: 'A high-performance 3D mobile game integrating advanced interactive physics and immersive gameplay concepts.',
    image: prj5,
    demoLink: 'https://skate-escape.vercel.app/',
    githubLink: 'https://github.com/mrarindam/Skate-Escape'
  },
  {
    id: 6,
    name: 'Typo Tester',
    stack: ['React Native', 'Ether.Js', 'SupaBase DB', 'Vite', 'Base Ecosystem'],
    description: 'A Web3-integrated typing test platform built on the Base ecosystem featuring secure database integration and real-time metric tracking.',
    image: prj6,
    demoLink: 'https://typotester.vercel.app/',
    githubLink: 'https://github.com/mrarindam/TypoTester'
  },
  {
    id: 7,
    name: 'We Say GM',
    stack: ['React Native', 'Ether.Js', 'Base Ecosystem', 'Vite'],
    description: 'A clean decentralized application focused on Web3 social interactions, deployed on the Base network for fast, low-cost operations.',
    image: prj7,
    demoLink: 'https://saygmlouder.vercel.app/',
    githubLink: 'https://github.com/mrarindam/'
  },
  {
    id: 8,
    name: 'KURO THE VOICE ASSISTANCE',
    stack: ['React Native'],
    description: 'A cutting-edge AI-driven voice assistant built for seamless mobile experiences, featuring intuitive natural language processing.',
    image: prj8,
    demoLink: 'https://arindamk143.github.io/Kuro-Assistance/',
    githubLink: 'https://github.com/Arindamk143/Kuro-Assistance/'
  },
];

export default function Creations() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const activeProject = projects[currentIndex];

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)"
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)"
      };
    }
  };

  return (
    <motion.section
      id="creations"
      className="creations-section"
      ref={containerRef}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", y: 50 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ margin: "0px", once: false }}
        className="section-header"
        style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center' }}
      >
        <h2 className="section-title">MY WORK</h2>
      </motion.div>

      <div className="creations-container">
        {/* LEFT SIDE: Info */}
        <div className="project-info">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProject.id}
              className="info-content"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
            >

              <div className="top-nav-arrows" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="nav-btn" onClick={handlePrev} aria-label="Previous Project" style={{ width: '40px', height: '40px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="project-number" style={{ margin: 0 }}>
                  {(currentIndex + 1).toString().padStart(2, '0')}
                </div>
                <button className="nav-btn" onClick={handleNext} aria-label="Next Project" style={{ width: '40px', height: '40px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <h3 className="project-title">{activeProject.name}</h3>
              {activeProject.stack && activeProject.stack.length > 0 && (
                <span className="project-tag">{activeProject.stack[0]}</span>
              )}
              <p className="project-desc">{activeProject.description}</p>

              <div className="project-actions">
                {activeProject.demoLink ? (
                  <a href={activeProject.demoLink} target="_blank" rel="noopener noreferrer" className="creations-btn btn-primary">
                    Live Demo
                  </a>
                ) : (
                  <button className="creations-btn btn-primary">Live Demo</button>
                )}
                {activeProject.githubLink ? (
                  <a href={activeProject.githubLink} target="_blank" rel="noopener noreferrer" className="creations-btn btn-secondary">
                    GitHub
                  </a>
                ) : (
                  <button className="creations-btn btn-secondary">GitHub</button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: Preview Card */}
        <div className="preview-container">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProject.id}
              className="preview-card"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="card-glow-pulse"></div>
              <div className="preview-card-inner">
                {activeProject.image ? (
                  <img src={activeProject.image} alt={activeProject.name} className="preview-image" loading="lazy" />
                ) : (
                  <div className="preview-image" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM NAV */}
        <div className="slider-nav">
          <div className="slider-dots">
            {projects.map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
              ></div>
            ))}
          </div>


        </div>

      </div>
    </motion.section>
  );
}
