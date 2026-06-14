import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ChevronLeft } from 'lucide-react';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './LegalPages.css';

export default function TermsPage() {
  useDocumentMetadata({
    title: "Terms of Service | Mr Arindam — Usage Guidelines & Policies",
    description: "Review the terms of service for mrarindam.com. Understand the rules, intellectual property rights, and limitations governing the use of this website.",
    canonicalPath: "/terms"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="legal-page-wrapper"
      data-theme="light"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />

      <div className="legal-content-container">
        <Link to="/" className="back-link">
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <div className="legal-header">
          <div className="legal-icon-box">
            <FileText size={32} />
          </div>
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: June 14, 2026</p>
        </div>

        <div className="legal-body-card">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and browsing the website of Mr Arindam (mrarindam.com), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. License and Intellectual Property</h2>
            <p>
              Unless otherwise stated, all materials on this website (including design layouts, code structures, texts, logos, graphics, and images) are the intellectual property of Mr Arindam and are protected by applicable copyright and trademark law.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to access the site and read contents for personal, non-commercial use. Under this license, you may not:
            </p>
            <ul>
              <li>Modify, copy, or duplicate the materials.</li>
              <li>Use the materials for any commercial purpose or public display.</li>
              <li>Attempt to decompile, reverse-engineer, or crack any software contained on this website.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Disclaimer of Warranties</h2>
            <p>
              The materials on this website are provided on an 'as is' basis. Mr Arindam makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
            <p>
              Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Limitations of Liability</h2>
            <p>
              In no event shall Mr Arindam or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if Mr Arindam or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Links and Referrals</h2>
            <p>
              Mr Arindam has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Mr Arindam of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or Location.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Site Terms of Service Modifications</h2>
            <p>
              Mr Arindam may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="contact-details">
              <strong>Email:</strong> <a href="mailto:marindam342@gmail.com">marindam342@gmail.com</a><br />
              <strong>Telegram:</strong> <a href="https://t.me/MrxArindam" target="_blank" rel="noopener noreferrer">@MrxArindam</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
