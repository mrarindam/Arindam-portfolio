import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs, toSlug } from '../data/blogs';
import './BlogsPage.css';

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
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="blogs-page-wrapper"
      data-theme="light"
      initial={{ x: "100%", opacity: 0.9 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.9 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
        <h1 className="blogs-page-heading">Blogs</h1>
        
        {/* Articles Grid */}
        <div className="articles-grid">
          {blogs.map((blog) => {
            const tag = getBlogTag(blog.id);
            return (
              <article key={blog.id} className="article-card">
                <Link to={`/blog/${toSlug(blog.title)}`} className="article-card-link">
                  <div className="article-image-wrapper">
                    <img src={blog.thumbnail} alt={blog.title} className="article-image" loading="lazy" />
                  </div>
                  <div className="article-info">
                    <h3 className="article-title">{blog.title}</h3>
                    <p className="article-desc">{blog.desc}</p>
                    
                    <div className="article-card-footer">
                      <span className="article-tag-badge">{tag}</span>
                      <div className="article-arrow-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
