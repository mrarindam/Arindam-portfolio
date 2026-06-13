import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs, toSlug } from '../data/blogs';
import '../components/Blogs.css';
export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => toSlug(b.title) === slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="blog-page-wrapper" data-theme="light" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="blog-page-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 2rem' }}>
          <h1 style={{ color: '#111115', fontFamily: 'Inter, sans-serif', marginBottom: '2rem' }}>Blog Not Found</h1>
          <button 
            className="blog-page-back-btn" 
            onClick={() => navigate('/blogs')}
            style={{ 
              background: '#111115', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.8rem 2rem', 
              borderRadius: '30px', 
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}
          >
            Back to Blogs
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page-wrapper" data-theme="light">
      <Navbar />
      
      <main className="blog-page-main">
        <motion.div
          className="blog-page-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="blog-page-back-btn" onClick={() => navigate('/blogs')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blogs
          </button>

          <h1 className="blog-page-title">{blog.title}</h1>

          {blog.youtube && (
            <div className="blog-page-video">
              <iframe
                src={`https://www.youtube.com/embed/${blog.youtube}?si=hoS4UFgXW08jVrAw`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}

          <div className="blog-page-body">
            {typeof blog.content === 'string' ? <p>{blog.content}</p> : blog.content}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
