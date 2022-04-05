import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { initialFormState, site } from '../constants';
import { FormDataKey, FormState, WithFonts } from '../types';
import { getGoogleFontFamilies } from '../utils';

type CalculatePageProps = WithFonts & {
  initialState: FormState;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CalculatePageProps>> => {
  const query = context.query as Record<FormDataKey, string>;
  const fonts = await getGoogleFontFamilies();

  /** Helper to return a query param by key. */
  const getQueryParam = (key: keyof typeof FormDataKey) => query[FormDataKey[key]];

  try {
    const initialState: FormState = {
      min: {
        fontSize: Number(getQueryParam('minFontSize')),
        screenWidth: Number(getQueryParam('minScreenWidth')),
        modularRatio: Number(getQueryParam('minRatio')),
      },
      max: {
        fontSize: Number(getQueryParam('maxFontSize')),
        screenWidth: Number(getQueryParam('maxScreenWidth')),
        modularRatio: Number(getQueryParam('maxRatio')),
      },
      modularSteps: getQueryParam('modularSteps').split(','),
      baseModularStep: getQueryParam('baseModularStep'),
      namingConvention: getQueryParam('namingConvention'),
      shouldUseRems: getQueryParam('shouldUseRems') === 'on',
      roundingDecimalPlaces: Number(getQueryParam('roundingDecimalPlaces')),
      fontFamily: getQueryParam('fontFamily'),
    };
    return {
      props: {
        initialState,
        fonts,
      },
    };
  } catch (e) {
    return {
      props: {
        initialState: initialFormState,
        fonts,
      },
    };
  }
};

const Calculate: NextPage<CalculatePageProps> = (props) => {
  return (
    <Layout isBlockedFromIndexing={true}>
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator initialState={props.initialState} fonts={props.fonts} />
      <Info />
    </Layout>
  );
};

export default Calculate;
