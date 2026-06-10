import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import img1 from '../media/graphics/community_management.webp';
import img2 from '../media/graphics/marketing_support.webp';
import img3 from '../media/graphics/team.webp';
import img4 from '../media/graphics/ambassador_program.webp';

export default function Footer() {
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="main-footer" data-theme="dark">
      <div className="footer-glow" />
      
      <div className="footer-top">
        <h1 className="footer-large-logo">MR ARINDAM</h1>
      </div>

      <div className="footer-middle">
        <div className="footer-col">
          <span className="col-header">GENERAL MENU</span>
          <ul className="footer-menu-links">
            <li><button onClick={() => handleScrollToSection('creations')}>WORKS</button></li>
            <li><button onClick={() => window.scrollTo({ top: 4000, behavior: 'smooth' })}>ABOUT</button></li>
            <li><Link to="/blogs">BLOGS</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="col-header">GET IN TOUCH</span>
          <p className="footer-contact-link">
            <a href="mailto:marindam342@gmail.com">MARINDAM342@GMAIL.COM</a>
          </p>
          <p className="footer-contact-link">
            <a href="https://t.me/MrxArindam" target="_blank" rel="noopener noreferrer">TELEGRAM: @MRXARINDAM</a>
          </p>
        </div>
      </div>

      <div className="footer-showcase-svg">
        <svg viewBox="0 0 1000 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="year-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff9e00" />
              <stop offset="50%" stop-color="#ff3c00" />
              <stop offset="100%" stop-color="#b100ff" />
            </linearGradient>
          </defs>
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="260" fill="url(#year-gradient)" letterSpacing="15" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 60, 0, 0.45))' }}>2026</text>
        </svg>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">MR ARINDAM &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
        <span className="footer-policy">PRIVACY POLICY</span>
      </div>
    </footer>
  );
}
