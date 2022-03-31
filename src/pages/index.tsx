import type { GetStaticPropsResult, NextPage } from 'next';
import Banner from '../components/Banner/Banner';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { GITHUB_CORNER_SIZE } from '../components/GithubCorner/GithubCorner.constants';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { site } from '../constants';
import type { WithFonts } from '../types';
import { getGoogleFontFamilies } from '../utils';
import styles from './index.module.scss';

type HomePageProps = WithFonts;

export const getStaticProps = async (): Promise<GetStaticPropsResult<HomePageProps>> => {
  const fonts = await getGoogleFontFamilies();
  return { props: { fonts } };
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
