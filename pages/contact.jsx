import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Seo from '../src/components/Seo';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Contact from '../src/components/Contact';

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

      <Seo
        title="Contact | Mr Arindam — Get in Touch for Collaborations"
        description="Reach out to Mr Arindam for project collaborations, freelance work, brand partnerships, or just to say hello. Let's build something amazing together."
        canonicalPath="/contact"
      />

      <div className="contact-content-container">
        <Contact />
      </div>

      <Footer />
    </motion.div>
  );
}
