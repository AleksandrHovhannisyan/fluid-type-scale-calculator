import { FC } from 'react';
import Head from 'next/head';
import SocialPreviewImage from '../../../public/assets/images/thumbnail.png';
import { defaultSeoProps } from './Layout.constants';
import { LayoutProps } from './Layout.types';

const Layout: FC<LayoutProps> = (props) => {
  const { seoProps = defaultSeoProps } = props;
  return (
    <main id="page">
      <Head>
        <title>{seoProps.title}</title>
        <meta name="description" content={seoProps.description} />
        <meta name="keywords" content={seoProps.keywords?.join(', ')} />
        <meta name="author" content={process.env.NEXT_PUBLIC_SITE_AUTHOR} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="TODO:" />
        <meta property="og:title" content={seoProps.title} />
        <meta property="og:image" content={SocialPreviewImage.src} />
        <meta property="og:description" content={seoProps.description} />
        <meta property="og:url" content="TODO:" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoProps.title} />
        <meta name="twitter:author" content="@hovhaDovah" />
        <meta name="twitter:description" content={seoProps.description} />
        <meta name="twitter:image" content={SocialPreviewImage.src} />
        {/* TODO: favicon */}
        <noscript>
          <style>{`#preview-inputs,#copy-to-clipboard-button{display:none}`}</style>
        </noscript>
      </Head>
      {props.children}
    </main>
  );
};

export default Layout;
