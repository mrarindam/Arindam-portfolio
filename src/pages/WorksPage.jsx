import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mainProjects, otherProjects } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RetroGame from '../components/RetroGame';
import './WorksPage.css';

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Combine all works/projects
  const allProjects = [...mainProjects, ...otherProjects];

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(project => project.categories && project.categories.includes(selectedCategory));

  const categories = ['All', 'Tool', 'Web3', 'SaaS Website', 'Gaming', 'WebGL'];

  return (
    <motion.div 
      className="projects-page-wrapper" 
      data-theme="dark"
      initial={{ x: "-100%", opacity: 0.9 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.9 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />
      
      <motion.div 
        className="projects-page-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="projects-header">
          <h1 className="projects-page-title">MY WORK</h1>
          <div className="title-underline-container">
            <svg width="220" height="12" viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8 C 50 2, 170 10, 216 4" stroke="#ff9e00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="projects-page-subtitle">A curated showcase of my applications, Web3 integrations, SaaS platforms, Gaming and digital tools.</p>
          
          {/* Category Filter Options with Framer Motion Sliding Animation */}
          <div className="works-category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="active-indicator-bg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: '#ff9e00',
                      borderRadius: '30px',
                      zIndex: -1,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                key={`${project.id}-${project.name}`}
                layout
                className="small-project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
              >
                <div className="card-image-wrapper">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="card-image" />
                  ) : (
                    <div className="card-image-placeholder">No Image</div>
                  )}
                </div>

                <div className="card-content">
                  <span className="card-category-tag">
                    {project.categories.join(' / ') || 'Project'}
                  </span>
                  <h3 className="card-title">{project.name}</h3>
                  <p className="card-desc">{project.description}</p>
                  <div className="card-stack-list">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="card-actions">
                    {project.demoLink && (
                      <motion.a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="card-btn btn-demo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Visit
                      </motion.a>
                    )}
                    {project.githubLink && (
                      <motion.a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="card-btn btn-github"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      <RetroGame />
      
      <Footer />
    </motion.div>
  );
}
