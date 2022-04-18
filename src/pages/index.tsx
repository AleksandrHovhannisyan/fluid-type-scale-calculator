import type { GetStaticPropsResult, NextPage } from 'next';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import site from '../data/site.json';
import type { WithFonts } from '../types';
import { getGoogleFontFamilies } from '../utils';

type HomePageProps = WithFonts;

export const getStaticProps = async (): Promise<GetStaticPropsResult<HomePageProps>> => {
  const fonts = await getGoogleFontFamilies();
  return { props: { fonts } };
};

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <Layout>
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator fonts={props.fonts} />
      <Info />
    </Layout>
  );
};

export default Home;
