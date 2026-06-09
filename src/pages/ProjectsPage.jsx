import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { otherProjects } from '../data/projects';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const navigate = useNavigate();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projects-page-wrapper">
      <div className="projects-page-gradient" />
      
      <motion.div 
        className="projects-page-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="projects-header">
          <button className="projects-back-btn" onClick={() => navigate('/')}>
            &larr; Back to Home
          </button>
          <h1 className="projects-page-title">More Creations</h1>
          <p className="projects-page-subtitle">A collection of additional mobile applications, Web3 integrations, and utility experiments.</p>
        </div>

        <div className="projects-grid">
          {otherProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              className="small-project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="card-image-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.name} className="card-image" />
                ) : (
                  <div className="card-image-placeholder">No Image</div>
                )}
                <div className="card-badge">{project.stack[0]}</div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{project.name}</h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-stack-list">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="card-actions">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="card-btn btn-demo">
                      Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="card-btn btn-github">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
