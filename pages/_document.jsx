import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
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
