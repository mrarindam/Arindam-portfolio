/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Blogs', id: 'blogs' },
    { label: 'Creations', id: 'creations' },
    { label: 'Contact', id: 'contact' }
  ];

  // Track scroll position to add class to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section occupies the middle part of viewport
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll for header height if needed (e.g. 80px)
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
              <span className="nav-underline"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar/Menu */}
      <div className={`nav-menu-mobile ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links-container">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-link-item ${activeSection === item.id ? 'active' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
