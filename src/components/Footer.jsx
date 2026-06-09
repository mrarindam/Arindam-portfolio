import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import img1 from '../media/graphics/community_management.webp';
import img2 from '../media/graphics/marketing_support.webp';
import img3 from '../media/graphics/team.webp';
import img4 from '../media/graphics/ambassador_program.webp';

export default function Footer() {
  const showcaseImages = [img1, img2, img3, img4];

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-glow" />
      
      <div className="footer-top">
        <h1 className="footer-large-logo">MR ARINDAM</h1>
      </div>

      <div className="footer-middle">
        <div className="footer-col">
          <span className="col-header">GENERAL MENU</span>
          <ul className="footer-menu-links">
            <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>HOME</button></li>
            <li><button onClick={() => handleScrollToSection('creations')}>WORKS</button></li>
            <li><button onClick={() => window.scrollTo({ top: 4000, behavior: 'smooth' })}>ABOUT</button></li>
            <li><button onClick={() => window.scrollTo({ top: 13400, behavior: 'smooth' })}>BLOGS</button></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="col-header">LOCATION</span>
          <p className="footer-info-text">
            KOLKATA, WEST BENGAL,<br />
            INDIA
          </p>
          <p className="footer-info-subtext">
            MONDAY – FRIDAY, 10:00 / 19:00
          </p>
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

      <div className="footer-showcase">
        <div className="showcase-scroll-container">
          {showcaseImages.map((img, idx) => (
            <div key={idx} className="showcase-img-card">
              <img src={img} alt={`Showcase ${idx + 1}`} className="showcase-img" />
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">MR ARINDAM &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
        <span className="footer-policy">PRIVACY POLICY</span>
        <div className="footer-socials">
          <a href="https://github.com/mrarindam" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a href="https://t.me/MrxArindam" target="_blank" rel="noopener noreferrer">TELEGRAM</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </div>
      </div>
    </footer>
  );
}
