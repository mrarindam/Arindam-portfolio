import { useEffect } from 'react';

const SITE_URL = 'https://mrarindam.com';

export default function useDocumentMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  ogSiteName = "Mr Arindam Portfolio",
  canonicalPath,
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage
}) {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // Helper function to set or create meta tag
    const setMetaTag = (attributeName, attributeValue, contentValue) => {
      if (!contentValue) return;
      let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', contentValue);
    };

    // Helper to set or create canonical link
    const setCanonical = (href) => {
      if (!href) return;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Construct absolute image path if relative is provided
    let absoluteImage = ogImage;
    if (ogImage && !ogImage.startsWith('http')) {
      absoluteImage = SITE_URL + ogImage;
    } else if (!ogImage) {
      // Default fallback og:image
      absoluteImage = SITE_URL + '/og-image.png';
    }

    // Construct canonical URL
    const fullUrl = canonicalPath ? SITE_URL + canonicalPath : SITE_URL + window.location.pathname;

    // 2. Set Meta Description
    setMetaTag('name', 'description', description);

    // 3. Set OpenGraph tags
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:title', ogTitle || title);
    setMetaTag('property', 'og:description', ogDescription || description);
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:site_name', ogSiteName);

    // 4. Set Twitter tags
    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:url', fullUrl);
    setMetaTag('name', 'twitter:title', twitterTitle || ogTitle || title);
    setMetaTag('name', 'twitter:description', twitterDescription || ogDescription || description);
    setMetaTag('name', 'twitter:image', twitterImage || absoluteImage);

    // 5. Set canonical URL
    setCanonical(fullUrl);

  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    ogSiteName,
    canonicalPath,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage
  ]);
}

