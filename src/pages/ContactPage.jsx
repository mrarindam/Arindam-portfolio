import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import './ContactPage.css';

export default function ContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page-wrapper">
      <div className="contact-page-header">
        <button className="contact-back-btn" onClick={() => navigate('/')}>
          &larr; Back to Home
        </button>
      </div>
      <Contact />
    </div>
  );
}
