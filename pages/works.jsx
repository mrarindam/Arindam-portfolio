import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mainProjects, otherProjects } from '../src/data/projects';
import Seo from '../src/components/Seo';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ShareModal from '../src/components/ShareModal';

const categoryColors = {
  Showcase: '#1d002bff',      // Elegant deep indigo/violet
  Tool: '#073b41ff',          // Slick dark teal/cyan
  Web3: '#241e02ff',          // Rich dark green/emerald
  'SaaS Website': '#362006ff', // Warm deep amber/bronze
  Gaming: '#4a0a5aff',        // Fierce deep crimson/burgundy
  WebGL: '#06063dff',         // Original midnight space-black
};

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('Showcase');
  const [selectedShowcase, setSelectedShowcase] = useState(null);
  const [shareProject, setShareProject] = useState(null);
  const [copied, setCopied] = useState(false);

  // Scroll to top and parse deep link query param when page loads
  useEffect(() => {
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const projectSlug = params.get('project');
    if (projectSlug) {
      const match = [...mainProjects, ...otherProjects].find(p => p.slug === projectSlug);
      if (match) {
        setSelectedShowcase(match);
      }
    }
  }, []);

  const handleCardClick = (project, e) => {
    if (project.categories.includes('Showcase')) {
      e.preventDefault();
      setSelectedShowcase(project);
      setCopied(false);

      // Update URL query param quietly
      if (window.history.pushState) {
        const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?project=${project.slug}`;
        window.history.pushState({ path: newurl }, '', newurl);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedShowcase(null);
    // Clear URL query param quietly
    if (window.history.pushState) {
      const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      window.history.pushState({ path: newurl }, '', newurl);
    }
  };

  const handleCopyPrompt = (promptText) => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Combine all works/projects
  const allProjects = [...mainProjects, ...otherProjects];

  // Filter projects by category
  const filteredProjects = allProjects.filter(project => project.categories && project.categories.includes(selectedCategory));

  const categories = ['Showcase', 'Tool', 'Web3', 'SaaS Website', 'Gaming', 'WebGL'];

  return (
    <motion.div
      className="projects-page-wrapper"
      data-theme="dark"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1, position: "relative" }}
      exit={{ x: "100%", opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
      style={{
        backgroundColor: categoryColors[selectedCategory] || '#030308',
        transition: 'background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Navbar />

      <Seo
        title="My Work | Mr Arindam — Projects & Creations"
        description="A curated showcase of applications, Web3 integrations, SaaS platforms, gaming projects, and digital tools built by Mr Arindam."
        canonicalPath="/works"
      />

      <motion.div
        className="projects-page-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="projects-header">
          <h1 className="projects-page-title">My Work</h1>
          <div className="title-underline-container">
            <svg width="220" height="12" viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8 C 50 2, 170 10, 216 4" stroke="#ff9e00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

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
                className={`small-project-card ${project.categories.includes('Showcase') ? 'showcase-card' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={(e) => handleCardClick(project, e)}
                style={project.categories.includes('Showcase') ? { cursor: 'pointer' } : {}}
              >
                <div className="card-image-wrapper">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="card-image" />
                  ) : (
                    <div className="card-image-placeholder">No Image</div>
                  )}
                </div>

                {!project.categories.includes('Showcase') && (
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
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <Footer />

      {/* Animated Showcase Modal Popup */}
      <AnimatePresence>
        {selectedShowcase && (
          <motion.div
            className="showcase-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="showcase-modal-content"
              initial={{ scale: 0.85, y: 40, rotateX: -15, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, rotateX: 10, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 340, mass: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="showcase-modal-close"
                onClick={handleCloseModal}
              >
                &times;
              </button>

              <div className="showcase-modal-image-wrapper">
                <img
                  src={selectedShowcase.image}
                  alt={selectedShowcase.name}
                  className="showcase-modal-image"
                />
              </div>

              <h2 className="showcase-modal-title">{selectedShowcase.name}</h2>

              <div className="showcase-modal-actions">
                {selectedShowcase.demoLink && (
                  <a
                    href={selectedShowcase.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn btn-visit"
                  >
                    Visit
                  </a>
                )}
                {selectedShowcase.githubLink && (
                  <a
                    href={selectedShowcase.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn btn-github"
                  >
                    GitHub
                  </a>
                )}
                {selectedShowcase.prompt && (
                  <button
                    onClick={() => handleCopyPrompt(selectedShowcase.prompt)}
                    className="modal-btn btn-copy"
                  >
                    {copied ? 'Copied!' : 'Copy Prompt'}
                  </button>
                )}
                <button
                  onClick={() => setShareProject(selectedShowcase)}
                  className="modal-btn btn-share"
                >
                  Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal Popup */}
      <AnimatePresence>
        {shareProject && (
          <ShareModal
            project={shareProject}
            shareUrl={typeof window !== 'undefined' ? `${window.location.origin}/works?project=${shareProject.slug}` : ''}
            onClose={() => setShareProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
