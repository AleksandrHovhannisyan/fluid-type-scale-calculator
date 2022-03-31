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
  const fonts = await getGoogleFontFamilies();
  try {
    const query = context.query as Record<FormDataKey, string>;
    // TODO: validate query params
    const initialState: FormState = {
      min: {
        fontSize: Number(query[FormDataKey.minFontSize]),
        screenWidth: Number(query[FormDataKey.minScreenWidth]),
        modularRatio: Number(query[FormDataKey.minRatio]),
      },
      max: {
        fontSize: Number(query[FormDataKey.maxFontSize]),
        screenWidth: Number(query[FormDataKey.maxScreenWidth]),
        modularRatio: Number(query[FormDataKey.maxRatio]),
      },
      modularSteps: query[FormDataKey.modularSteps].split(','),
      baseModularStep: query[FormDataKey.baseModularStep],
      namingConvention: query[FormDataKey.namingConvention],
      shouldUseRems: query[FormDataKey.shouldUseRems] === 'on',
      roundingDecimalPlaces: Number(query[FormDataKey.roundingDecimalPlaces]),
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
    <Layout>
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator initialState={props.initialState} fonts={props.fonts} />
      <Info />
    </Layout>
  );
};

export default Calculate;
