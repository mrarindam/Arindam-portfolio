import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import '../components/Blogs.css';

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="blog-detail-wrapper">
        <div className="blog-detail-container">
          <h1 style={{ color: '#fff' }}>Blog not found</h1>
          <button className="blog-card-cta" onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid #c77dff', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-gradient" />
      <motion.div
        className="blog-detail-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="blog-back-btn" onClick={() => navigate('/')}>
          &larr; Back
        </button>

        <h1 className="blog-detail-title">{blog.title}</h1>

        {blog.youtube && (
          <div className="blog-detail-video">
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

        <div className="blog-detail-body">
          {typeof blog.content === 'string' ? <p>{blog.content}</p> : blog.content}
        </div>
      </motion.div>
    </div>
  );
}
