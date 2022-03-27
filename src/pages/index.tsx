import type { NextPage } from 'next';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import GithubCorner from '../components/GithubCorner/GithubCorner';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import { Layout } from '../components/Layout';
import PageFooter from '../components/PageFooter/PageFooter';
import { site } from '../data';

// Fetch Google Fonts at build time
export const getStaticProps = async () => {
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

type HomePageProps = {
  fonts: string[];
};

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <Layout>
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator fonts={props.fonts} />
      <Info />
      <PageFooter />
      <GithubCorner />
    </Layout>
  );
};

export default Home;
