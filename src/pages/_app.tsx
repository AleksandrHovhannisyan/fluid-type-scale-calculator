import type { AppProps } from 'next/app';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import { Fonts } from '../constants';
import '../../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global font CSS (critical, inlined in head) */}
      <style jsx global>{`
        html {
          --ff-body: ${Fonts.BODY.style.fontFamily};
          --fw-body-regular: 400;
          --fw-body-bold: 900;
          --ff-mono: ${Fonts.MONO.style.fontFamily};
          --fw-mono-regular: 500;
        }
        body {
          font-family: var(--ff-body);
          font-weight: var(--fw-body-regular);
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: var(--fw-body-bold);
        }
        code {
          font-family: var(--ff-mono);
          font-weight: var(--fw-mono-regular);
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
