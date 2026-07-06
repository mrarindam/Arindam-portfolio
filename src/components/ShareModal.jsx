import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';

export default function ShareModal({ project, shareUrl, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareText = `Check out this project: ${project.name}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialShares = [
    {
      name: 'X (Twitter)',
      url: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: '#000000',
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      icon: (
        <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: '#25D366',
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: (
        <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 5.281 3.425 9.756 8.191 11.341.134.025.269-.044.297-.179.031-.137.031-.278-.009-.413l-.841-3.136s2.516 1.503 4.453 1.503c6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0zm5.82 8.351l-1.997 9.407c-.15.666-.544.828-1.097.525l-3.044-2.244-1.469 1.416c-.162.163-.297.297-.61.297l.219-3.11 5.66-5.112c.247-.219-.053-.341-.384-.122l-7.003 4.409-3.019-.944c-.656-.206-.669-.656.137-.972l11.794-4.544c.547-.206 1.025.122.812.9l-.004-.002z" />
        </svg>
      ),
      color: '#0088cc',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: '#0077b5',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: '#1877F2',
    },
  ];

  return (
    <motion.div
      className="share-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="share-modal-content"
        initial={{ scale: 0.85, y: 30, rotateX: -15, opacity: 0 }}
        animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 30, rotateX: 10, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 330, mass: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="share-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h3 className="share-modal-title">Share Project</h3>
        <p className="share-modal-subtitle">Share "{project.name}" with your network</p>

        <div className="share-social-grid">
          {socialShares.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="share-social-btn"
              style={{ '--hover-color': social.color }}
            >
              <div className="share-icon-container">{social.icon}</div>
              <span className="share-social-name">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="share-divider">
          <span>or copy link</span>
        </div>

        <div className="share-copy-container">
          <input
            type="text"
            className="share-copy-input"
            value={shareUrl}
            readOnly
            onClick={(e) => e.target.select()}
          />
          <button className="share-copy-btn" onClick={handleCopyLink}>
            {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
