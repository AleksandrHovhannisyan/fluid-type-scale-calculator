import type { GetStaticPropsResult, NextPage } from 'next';
import Banner from '../components/Banner/Banner';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { GITHUB_CORNER_SIZE } from '../components/GithubCorner/GithubCorner.constants';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { site } from '../constants';
import type { WithFonts } from '../types';
import styles from './index.module.scss';

type HomePageProps = WithFonts;

// Fetch Google Fonts at build time
export const getStaticProps = async (): Promise<GetStaticPropsResult<HomePageProps>> => {
  try {
    const response = await (
      await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${process.env.GOOGLE_FONTS_API_KEY}`)
    ).json();
    const fonts = response.items.map((font: { family: string }) => font.family);
    return { props: { fonts } };
  } catch (e) {
    return { props: { fonts: ['Inter'] } };
  }
};

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <Layout>
      <noscript>
        <Banner className={styles['no-js-banner']} style={{ paddingInline: GITHUB_CORNER_SIZE }}>
          This app requires JavaScript. Please enable it if you can.
        </Banner>
      </noscript>
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator fonts={props.fonts} />
      <Info />
    </Layout>
  );
};

export default Home;
