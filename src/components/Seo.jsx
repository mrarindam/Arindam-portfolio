import Head from 'next/head';

const SITE_URL = 'https://mrarindam.xyz';

/**
 * Server-rendered SEO/meta tags. Replaces the old client-side
 * `useDocumentMetadata` hook so that titles, descriptions, Open Graph,
 * Twitter, and canonical tags are present in the initial HTML (SSG) and
 * visible to crawlers and social-card scrapers.
 *
 * Props mirror the original hook exactly.
 */
export default function Seo({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  ogSiteName = 'Mr Arindam Portfolio',
  canonicalPath,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd,
}) {
  // Construct absolute image path if a relative one is provided
  let absoluteImage = ogImage;
  if (ogImage && !ogImage.startsWith('http')) {
    absoluteImage = SITE_URL + ogImage;
  } else if (!ogImage) {
    // Default fallback og:image
    absoluteImage = SITE_URL + '/og-image.png';
  }

  // Construct canonical URL
  const fullUrl = canonicalPath ? SITE_URL + canonicalPath : SITE_URL;

  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedTwitterTitle = twitterTitle || ogTitle || title;
  const resolvedTwitterDescription =
    twitterDescription || ogDescription || description;

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Open Graph / Facebook / Discord */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      {resolvedOgTitle && <meta property="og:title" content={resolvedOgTitle} />}
      {resolvedOgDescription && (
        <meta property="og:description" content={resolvedOgDescription} />
      )}
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content={ogSiteName} />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      {resolvedTwitterTitle && (
        <meta name="twitter:title" content={resolvedTwitterTitle} />
      )}
      {resolvedTwitterDescription && (
        <meta name="twitter:description" content={resolvedTwitterDescription} />
      )}
      <meta name="twitter:image" content={twitterImage || absoluteImage} />

      <link rel="canonical" href={fullUrl} />

      {/* Structured data (JSON-LD) for rich search results */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
