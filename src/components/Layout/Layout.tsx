import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { JsonLd } from 'jsonld/jsonld-spec';
import Head from 'next/head';
import { useRouter } from 'next/router';
import packageJson from '../../../package.json';
import socials from '../../data/socials.json';
import { toAbsoluteUrl } from '../../utils';
import GithubCorner from '../GithubCorner/GithubCorner';
import PageFooter from '../PageFooter/PageFooter';
import { defaultSeoProps, faviconSizes } from './Layout.constants';
import type { LayoutProps } from './Layout.types';
import styles from './Layout.module.scss';

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  const { seoProps = defaultSeoProps } = props;
  const { pathname } = useRouter();
  const pageUrl = toAbsoluteUrl(pathname);

  const structuredData: JsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebApplication',
    name: seoProps.title,
    url: pageUrl,
    description: seoProps.description,
    applicationCategory: 'DeveloperApplication',
    genre: 'design',
    softwareVersion: packageJson.version,
    operatingSystem: 'All',
  };

  const ogImageUrl = toAbsoluteUrl('/assets/images/thumbnail.png');

  return (
    <main className={clsx(styles.layout, props.className)}>
      <Head>
        <title>{seoProps.title}</title>
        <meta name="description" content={seoProps.description} />
        <meta name="keywords" content={seoProps.keywords?.join(', ')} />
        <meta name="author" content={packageJson.author.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={seoProps.title} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:description" content={seoProps.description} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoProps.title} />
        <meta name="twitter:author" content={socials.twitter.handle} />
        <meta name="twitter:description" content={seoProps.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        {props.isBlockedFromIndexing && <meta name="robots" content="noindex" />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {faviconSizes.map((width) => (
          <link
            key={width}
            rel="icon"
            href={`/assets/images/favicon-${width}.png`}
            sizes={`${width}x${width}`}
          ></link>
        ))}
      </Head>
      {props.children}
      <PageFooter />
      <GithubCorner />
    </main>
  );
};

export default Layout;
