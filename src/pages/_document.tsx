import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Inter:wght@300;400;900&display=swap"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
