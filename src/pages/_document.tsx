import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/inter-regular.woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/inter-900.woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/ibm-plex-mono-regular.woff2"
          crossOrigin=""
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
