import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import Seo from '../src/components/Seo';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export default function PrivacyPage() {
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

      <Seo
        title="Privacy Policy | Mr Arindam — How Your Data Is Protected"
        description="Read the privacy policy for mrarindam.xyz. Learn how we collect, use, and protect your personal information when you visit or interact with our website."
        canonicalPath="/privacy"
      />

      <div className="legal-content-container">
        <Link href="/" className="back-link">
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <div className="legal-header">
          <div className="legal-icon-box">
            <ShieldCheck size={32} />
          </div>
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: June 14, 2026</p>
        </div>

        <div className="legal-body-card">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to the personal website of Mr Arindam (mrarindam.xyz). Your privacy is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by this website and how it is used.
            </p>
            <p>
              By accessing or using our website, you agree to the collection, use, and disclosure of your information in accordance with this Privacy Policy. If you do not agree with the terms outlined herein, please do not use the website.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>
              We may collect two types of information from our users:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information you choose to provide, such as your name, email address, and message details, when you contact us via email, form submissions, or join our community servers (e.g., Discord).
              </li>
              <li>
                <strong>Non-Personal Data:</strong> Log files, browser types, Internet Service Providers (ISP), referring/exit pages, platform type, date/time stamps, and number of clicks. This information is anonymous and used to analyze trends and optimize user experience.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>
              Any of the information we collect from you may be used in one of the following ways:
            </p>
            <ul>
              <li>To personalize your experience and respond to your individual needs.</li>
              <li>To improve our website layout, features, and content based on user feedback.</li>
              <li>To establish communication, reply to queries, or provide client support.</li>
              <li>To administer collaborative events, newsletters, or portfolio updates.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Cookies & Trackers</h2>
            <p>
              We use standard cookies to store information about visitors' preferences, record user-specific information on which pages the user accesses or visits, and customize web page content based on visitors' browser type or other information that the visitor sends via their browser.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. We use state-of-the-art encryption protocols and host our application on secure cloud hosting services. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Third-Party Links & Integrations</h2>
            <p>
              Occasionally, at our discretion, we may include or offer third-party products, services, or portfolio links on our website (e.g., GitHub, Discord, X, Telegram). These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Changes to Our Privacy Policy</h2>
            <p>
              If we decide to change our privacy policy, we will post those changes on this page and/or update the Privacy Policy modification date above. We encourage users to periodically check this page for any updates.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please feel free to reach out to us at:
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
