import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import './ContactPage.css';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="contact-page-wrapper" 
      data-theme="light"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1, position: "relative" }}
      exit={{ x: "100%", opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
    >
      <Navbar />
      
      <div className="contact-content-container">
        <Contact />
      </div>

      <Footer />
    </motion.div>
  );
}
