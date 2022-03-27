import { FC } from 'react';
import { JsonLd } from 'jsonld/jsonld-spec';
import Head from 'next/head';
import SocialPreviewImage from '../../../public/assets/images/thumbnail.png';
import { defaultSeoProps, faviconSizes } from './Layout.constants';
import { LayoutProps } from './Layout.types';

const Layout: FC<LayoutProps> = (props) => {
  const { seoProps = defaultSeoProps } = props;

  const structuredData: JsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebApplication',
    name: seoProps.title,
    // TODO: url
    url: '{{ site.url }}',
    description: seoProps.description,
    applicationCategory: 'DeveloperApplication',
    genre: 'design',
    browserRequirements: 'Requires JavaScript.',
    softwareVersion: '1.0.0',
    operatingSystem: 'All',
  };

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {faviconSizes.map((width) => (
          <link key={width} rel="icon" href={`/assets/images/favicon-${width}.png`} sizes={`${width}x${width}`}></link>
        ))}
        <noscript>
          <style>{`#preview-inputs,#copy-to-clipboard-button{display:none}`}</style>
        </noscript>
      </Head>
      {props.children}
    </main>
  );
};

export default Layout;
