import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="google-adsense-account" content="ca-pub-4835378757253642" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4835378757253642"
          crossOrigin="anonymous"
        />
        {/* Disable browser scroll restoration so GSAP/Lenis control scroll position */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch (e) {}",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
