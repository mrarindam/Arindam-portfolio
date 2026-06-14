import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs, toSlug } from '../data/blogs';
import './BlogsPage.css';

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

// Tag helper for consistency
const getBlogTag = (id) => {
  switch (id) {
    case 7:
      return 'backend';
    case 6:
      return 'tutorial';
    case 5:
      return 'fun';
    case 4:
      return 'automation';
    case 3:
      return 'security';
    case 2:
      return 'security';
    case 1:
      return 'tutorial';
    default:
      return 'project';
  }
};

export default function BlogsPage() {
  useDocumentMetadata({
    title: "Blog | Mr Arindam — Articles on Development, Security & Tech",
    description: "Read articles by Mr Arindam on web development, cybersecurity, automation, Python scripting, and hands-on tech tutorials.",
    canonicalPath: "/blogs"
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="blogs-page-wrapper"
      data-theme="light"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1, position: "relative" }}
      exit={{ x: "100%", opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
    >
      <Navbar />
      
      {/* Moving Text Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          {/* Duplicate for seamless loop */}
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
          <span>My Articles</span>
        </div>
      </div>

      <main className="blogs-page-main">
        <h1 className="blogs-page-heading">
          Blogs
          <svg className="blogs-handdrawn-line" viewBox="0 0 500 20" preserveAspectRatio="none">
            <path 
              d="M 2,10 Q 125,6 250,12 T 498,9" 
              stroke="#111115" 
              strokeWidth="3.5" 
              fill="none" 
              strokeLinecap="round" 
            />
          </svg>
        </h1>
        
        {/* Articles Grid */}
        <div className="articles-grid">
          {blogs.map((blog) => {
            const tag = getBlogTag(blog.id);
            return (
              <article key={blog.id} className="article-card">
                <MotionLink 
                  to={`/blog/${toSlug(blog.title)}`} 
                  className="article-card-link"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <div className="article-image-wrapper">
                    <img src={blog.thumbnail} alt={blog.title} className="article-image" loading="lazy" />
                  </div>
                  <div className="article-info">
                    <h3 className="article-title">{blog.title}</h3>
                    <p className="article-desc">{blog.desc}</p>
                    
                    <div className="article-card-footer">
                      <span className="article-tag-badge">{tag}</span>
                      <motion.div className="article-arrow-btn" variants={buttonVariants}>
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
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
