import type { NextPage } from 'next';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { site } from '../data';
import type { WithFonts } from '../types';

type HomePageProps = WithFonts;

// Fetch Google Fonts at build time
export const getStaticProps = async (): Promise<{ props: HomePageProps }> => {
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
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator fonts={props.fonts} />
      <Info />
    </Layout>
  );
};

export default Home;
