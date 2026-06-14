import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { blogs, toSlug } from '../data/blogs';
import './Blogs.css';

const MotionLink = motion(Link);

const arrowVariants = {
  rest: { x: 0, opacity: 1 },
  hover: {
    x: [0, 24, -24, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      times: [0, 0.4, 0.42, 1],
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 15 } }
};

// Show exactly the 5 most recent blogs
const recentBlogs = blogs.slice().reverse().slice(0, 5);

// Dynamic tag helper based on blog theme
const getBlogTag = (id) => {
  switch (id) {
    case 7:
      return { label: 'backend', color: '#ff3c00', bgColor: 'rgba(255, 60, 0, 0.1)' };
    case 6:
      return { label: 'tutorial', color: '#7b4dd4', bgColor: 'rgba(123, 77, 212, 0.1)' };
    case 5:
      return { label: 'fun', color: '#ff9e00', bgColor: 'rgba(255, 158, 0, 0.1)' };
    case 4:
      return { label: 'automation', color: '#00b4d8', bgColor: 'rgba(0, 180, 216, 0.1)' };
    case 3:
      return { label: 'security', color: '#d90429', bgColor: 'rgba(217, 4, 41, 0.1)' };
    case 2:
      return { label: 'security', color: '#d90429', bgColor: 'rgba(217, 4, 41, 0.1)' };
    case 1:
      return { label: 'tutorial', color: '#7b4dd4', bgColor: 'rgba(123, 77, 212, 0.1)' };
    default:
      return { label: 'project', color: '#2ec4b6', bgColor: 'rgba(46, 196, 182, 0.1)' };
  }
};

export default function Blogs() {
  const containerRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, recentBlogs.length - cardsToShow);
  const activeIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <section ref={containerRef} id="blogs" className="blogs-section-purple">
      {/* Existing purple-to-white gradient background */}
      <div className="blogs-purple-bg" />

      <div className="blogs-split-container">
        {/* Left Sidebar */}
        <div className="blogs-sidebar">
          <div className="blogs-title-wrap">
            <h2 className="blogs-sidebar-title">Blog</h2>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="blogs-content-area">
          <div className="blogs-slider-viewport">
            <div 
              className="blogs-grid-custom" 
              style={{ 
                transform: `translateX(calc(-${activeIndex} * (100% / ${cardsToShow} + 2rem / ${cardsToShow})))`,
                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {recentBlogs.map((blog, index) => {
                const tagInfo = getBlogTag(blog.id);
                return (
                  <motion.article
                    key={blog.id}
                    className="blog-card-custom"
                    style={{ flex: `0 0 calc((100% - ${(cardsToShow - 1) * 2}rem) / ${cardsToShow})` }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <MotionLink 
                      to={`/blog/${toSlug(blog.title)}`} 
                      className="blog-card-link-custom"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                    >
                      <div
                        className="blog-card-thumb-custom"
                        style={{ backgroundImage: `url(${blog.thumbnail})` }}
                      />
                      <div className="blog-card-body-custom">
                        <h3 className="blog-card-title-custom">{blog.title}</h3>
                        <p className="blog-card-desc-custom">{blog.desc}</p>
                        
                        <div className="blog-card-footer-custom">
                          <span 
                            className="blog-card-badge-custom" 
                            style={{ color: tagInfo.color, backgroundColor: tagInfo.bgColor }}
                          >
                            {tagInfo.label}
                          </span>
                          
                          <motion.div className="blog-card-arrow-custom" variants={buttonVariants}>
                            <motion.svg 
                              variants={arrowVariants}
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </motion.svg>
                          </motion.div>
                        </div>
                      </div>
                    </MotionLink>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* Navigation controls row at bottom */}
          <div className="blogs-controls-row">
            <div className="blogs-nav-arrows">
              <button 
                className={`blogs-nav-arrow arrow-prev ${activeIndex > 0 ? 'active' : ''}`} 
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button 
                className={`blogs-nav-arrow arrow-next ${activeIndex < maxIndex ? 'active' : ''}`} 
                onClick={handleNext}
                disabled={activeIndex === maxIndex}
                aria-label="Next page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="blogs-progress-line">
              <div 
                className="blogs-progress-fill" 
                style={{ width: `${maxIndex > 0 ? (activeIndex / maxIndex) * 100 : 100}%` }}
              />
            </div>
            
            <button className="blogs-list-btn" onClick={() => navigate('/blogs')}>
              Blog List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
