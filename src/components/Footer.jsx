import React from 'react';
import Link from 'next/link';
export default function Footer() {
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
            <li><Link href="/works">WORKS</Link></li>
            <li><Link href="/about">ABOUT</Link></li>
            <li><Link href="/blogs">BLOGS</Link></li>
            <li><Link href="/contact">CONTACT</Link></li>
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
        <svg viewBox="0 0 1000 300" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="year-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9e00" />
              <stop offset="50%" stopColor="#ff3c00" />
              <stop offset="100%" stopColor="#b100ff" />
            </linearGradient>
          </defs>
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="260" fill="url(#year-gradient)" letterSpacing="15" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 60, 0, 0.45))' }}>2026</text>
        </svg>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">MR ARINDAM &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
        <div className="footer-policies">
          <Link href="/privacy" className="footer-policy-link">PRIVACY POLICY</Link>
          <span className="policy-divider">|</span>
          <Link href="/terms" className="footer-policy-link">TERMS OF SERVICE</Link>
        </div>
      </div>
    </footer>
  );
}
