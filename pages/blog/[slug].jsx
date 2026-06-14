import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Seo from '../../src/components/Seo';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { blogs, toSlug } from '../../src/data/blogs';

export default function BlogPage({ slug }) {
  const router = useRouter();
  const blog = blogs.find((b) => toSlug(b.title) === slug);

  const seoTitle = blog ? `${blog.title} | Mr Arindam Blog` : 'Blog Not Found | Mr Arindam';
  const seoDescription = blog ? blog.desc : 'The requested blog post could not be found.';
  const seoType = blog ? 'article' : 'website';

  // BlogPosting structured data for rich results on real posts.
  const SITE_URL = 'https://mrarindam.xyz';
  const blogJsonLd = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.desc,
        image: `${SITE_URL}${blog.thumbnail || '/og-image.png'}`,
        url: `${SITE_URL}/blog/${slug}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${slug}`,
        },
        author: { '@type': 'Person', name: 'Mr Arindam', url: SITE_URL },
        publisher: { '@type': 'Person', name: 'Mr Arindam', url: SITE_URL },
      }
    : null;

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <motion.div
        className="blog-page-wrapper"
        data-theme="light"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1, position: "relative" }}
        exit={{ x: "-100%", opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
      >
        <Seo
          title={seoTitle}
          description={seoDescription}
          ogType={seoType}
          canonicalPath={`/blog/${slug}`}
        />
        <Navbar />
        <main className="blog-page-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 2rem' }}>
          <h1 style={{ color: '#111115', fontFamily: 'Inter, sans-serif', marginBottom: '2rem' }}>Blog Not Found</h1>
          <button
            className="blog-page-back-btn"
            onClick={() => router.push('/blogs')}
            style={{
              background: '#111115',
              color: '#ffffff',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600'
            }}
          >
            Back to Blogs
          </button>
        </main>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="blog-page-wrapper"
      data-theme="light"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1, position: "relative" }}
      exit={{ x: "-100%", opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.8 }}
    >
      <Seo
        title={seoTitle}
        description={seoDescription}
        ogType={seoType}
        canonicalPath={`/blog/${slug}`}
        jsonLd={blogJsonLd}
      />
      <Navbar />

      <main className="blog-page-main">
        <motion.div
          className="blog-page-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="blog-page-back-btn" onClick={() => router.push('/blogs')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blogs
          </button>

          <h1 className="blog-page-title">{blog.title}</h1>

          {blog.youtube && (
            <div className="blog-page-video">
              <iframe
                src={`https://www.youtube.com/embed/${blog.youtube}?si=hoS4UFgXW08jVrAw`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}

          <div className="blog-page-body">
            {typeof blog.content === 'string' ? <p>{blog.content}</p> : blog.content}
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
}

export async function getStaticPaths() {
  const paths = blogs.map((b) => ({ params: { slug: toSlug(b.title) } }));
  // 'blocking' so unknown slugs still render the in-app "Blog Not Found" page
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
