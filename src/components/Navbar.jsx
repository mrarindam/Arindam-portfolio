import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavbarTheme from '../hooks/useNavbarTheme';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

// SVG Icons for Contacts
const XIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TelegramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const DiscordIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6a15.8 15.8 0 0 0-3.8-1 12.2 12.2 0 0 0-.3.7 15 15 0 0 0-3.8 0A12.2 12.2 0 0 0 9.8 5 15.8 15.8 0 0 0 6 6a16.5 16.5 0 0 0-2 11 15.4 15.4 0 0 0 4 2 13 13 0 0 0 1-1.3 11 11 0 0 1-2-.6 1 1 0 0 1 0-1.7 10 10 0 0 0 8 0 1 1 0 0 1 0 1.7 11 11 0 0 1-2 .6 13 13 0 0 0 1 1.3 15.4 15.4 0 0 0 4-2A16.5 16.5 0 0 0 18 6Z"></path>
    <path d="M9.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM14.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path>
  </svg>
);

const MailIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

// Text Roll Component for hover animation
const TextRoll = ({ text }) => {
  return (
    <span className="text-roll-container">
      <span className="text-roll-inner">
        <span className="text-roll-item clone">{text}</span>
        <span className="text-roll-item primary">{text}</span>
      </span>
    </span>
  );
};

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Blogs', id: 'blogs' },
  { label: 'Works', id: 'works' },
  { label: 'Contact', id: 'contact' }
];

export default function Navbar() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [_activeSection, setActiveSection] = useState('home');
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle cross-page scrolling when landing back on the homepage
  useEffect(() => {
    if (location.state && location.state.scrollTo && location.pathname === '/') {
      const id = location.state.scrollTo;
      // Clear state so it doesn't trigger again on reload
      window.history.replaceState({}, document.title);

      setTimeout(() => {
        if (id === 'about') {
          if (lenis) {
            lenis.scrollTo(4000);
          } else {
            window.scrollTo({ top: 4000, behavior: 'smooth' });
          }
        } else if (id === 'blogs') {
          if (lenis) {
            lenis.scrollTo(13400);
          } else {
            window.scrollTo({ top: 13400, behavior: 'smooth' });
          }
        } else if (id === 'home') {
          if (lenis) {
            lenis.scrollTo(0);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          const element = document.getElementById(id);
          if (element) {
            if (lenis) {
              lenis.scrollTo(element, { offset: -80 });
            } else {
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
          }
        }
      }, 300);
    }
  }, [location, lenis]);



  // Prevent scroll when fullscreen menu is open (including Lenis)
  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
    };

    if (isDesktopOpen) {
      document.documentElement.classList.add('nav-active');
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      if (lenis) lenis.stop();
    } else {
      document.documentElement.classList.remove('nav-active');
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      if (lenis) lenis.start();
    }

    return () => {
      document.documentElement.classList.remove('nav-active');
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      if (lenis) lenis.start();
    };
  }, [isDesktopOpen, lenis]);

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

  // Track active section inside the pinned Hero container via custom events
  useEffect(() => {
    const handleHeroActive = (e) => {
      setActiveSection(e.detail);
    };
    window.addEventListener('heroActiveSection', handleHeroActive);
    return () => window.removeEventListener('heroActiveSection', handleHeroActive);
  }, []);

  // Track active section for external elements using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
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
      if (item.id === 'creations' || item.id === 'contact') {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsDesktopOpen(false);

    if (id === 'contact') {
      navigate('/contact');
      return;
    }

    if (id === 'blogs') {
      navigate('/blogs');
      return;
    }

    if (id === 'works') {
      navigate('/works');
      return;
    }

    if (id === 'about') {
      navigate('/about');
      return;
    }

    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    if (id === 'home') {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
      } else {
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
    }
  };

  const topLineVariants = {
    closed: { width: "20px", x: 12, rotate: 0, y: 0 },
    hover: { width: "32px", x: 0, rotate: 0, y: 0 },
    open: { width: "32px", x: 0, rotate: 45, y: 6 }
  };

  const bottomLineVariants = {
    closed: { width: "20px", x: 0, rotate: 0, y: 0 },
    hover: { width: "32px", x: 0, rotate: 0, y: 0 },
    open: { width: "32px", x: 0, rotate: -45, y: -6 }
  };

  const navbarTheme = useNavbarTheme();
  const isLightTheme = navbarTheme === 'light';

  return (
    <>
      <motion.nav
        className={`navbar-custom ${scrolled ? 'scrolled' : ''} ${isDesktopOpen ? 'menu-open' : ''} ${isLightTheme ? 'light-theme' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        <div className="navbar-container">
          {/* Logo/Brand */}
          <a href="#home" className="nav-logo-custom" onClick={(e) => handleNavClick(e, 'home')}>
            Mr Arindam
          </a>

          {/* Toggle Button & Active Section Indicator for All Devices */}
          <div className="nav-toggle-custom" style={{ display: 'flex', alignItems: 'center' }}>
            <motion.button
              className="desktop-menu-toggle"
              onClick={() => setIsDesktopOpen(!isDesktopOpen)}
              whileHover="hover"
              animate={isDesktopOpen ? "open" : "closed"}
              initial="closed"
              aria-label="Toggle navigation menu"
            >
              <div className="desktop-toggle-line-container">
                <motion.div
                  className="desktop-toggle-line line-top"
                  variants={topLineVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.div
                  className="desktop-toggle-line line-bottom"
                  variants={bottomLineVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Overlay for All Devices */}
      <AnimatePresence>
        {isDesktopOpen && (
          <motion.div
            className="desktop-fullscreen-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="desktop-fullscreen-container">
              <div className="desktop-fullscreen-links">
                {navItems.map((item, index) => (
                  <div className="desktop-fullscreen-link-wrapper" key={item.id}>
                    <motion.a
                      href={`#${item.id}`}
                      className="desktop-fullscreen-link-item"
                      onClick={(e) => handleNavClick(e, item.id)}
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                    >
                      <span className="link-text">
                        <TextRoll text={item.label} />
                      </span>
                      <span className="link-arrow">→</span>
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Social Contact Icons at Bottom */}
              <div className="desktop-fullscreen-socials">
                <a href="https://x.com/ExeArindam" target="_blank" rel="noopener noreferrer" className="social-icon-item" aria-label="X (Twitter)">
                  <XIcon size={36} />
                </a>
                <a href="https://t.me/MrxArindam" target="_blank" rel="noopener noreferrer" className="social-icon-item" aria-label="Telegram">
                  <TelegramIcon size={36} />
                </a>
                <a href="#" className="social-icon-item" aria-label="Discord">
                  <DiscordIcon size={36} />
                </a>
                <a href="https://github.com/mrarindam" target="_blank" rel="noopener noreferrer" className="social-icon-item" aria-label="GitHub">
                  <GithubIcon size={36} />
                </a>
                <a href="mailto:marindam342@gmail.com" className="social-icon-item" aria-label="Email">
                  <MailIcon size={36} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
