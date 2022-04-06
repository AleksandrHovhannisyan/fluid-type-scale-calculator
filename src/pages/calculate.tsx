import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { COMMA_SEPARATED_LIST_REGEX } from '../components/FluidTypeScaleCalculator/Form/GroupModularSteps/GroupModularSteps.constants';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { DEFAULT_FONT_FAMILY, initialFormState, site } from '../constants';
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

  /** Helper to return a query param by key, if it exists, and an empty string otherwise. */
  const getQueryParam = (key: keyof typeof FormDataKey) => query[FormDataKey[key]] ?? '';

  /** Checks if the provided value is a number. If it is, returns that value. Else, returns the specified fallback. */
  const withNumericFallback = (value: string, fallback: number): number =>
    Number.isNaN(+value) ? fallback : Number(value);

  try {
    const modularSteps = getQueryParam('modularSteps');
    const areStepsValid = COMMA_SEPARATED_LIST_REGEX.test(modularSteps);
    const baseModularStep = getQueryParam('baseModularStep');
    const fontFamily = getQueryParam('fontFamily');

    const initialState: FormState = {
      min: {
        fontSize: withNumericFallback(getQueryParam('minFontSize'), initialFormState.min.fontSize),
        screenWidth: withNumericFallback(getQueryParam('minScreenWidth'), initialFormState.min.screenWidth),
        modularRatio: withNumericFallback(getQueryParam('minRatio'), initialFormState.min.modularRatio),
      },
      max: {
        fontSize: withNumericFallback(getQueryParam('maxFontSize'), initialFormState.max.fontSize),
        screenWidth: withNumericFallback(getQueryParam('maxScreenWidth'), initialFormState.max.screenWidth),
        modularRatio: withNumericFallback(getQueryParam('maxRatio'), initialFormState.max.modularRatio),
      },
      modularSteps: areStepsValid ? modularSteps.split(',') : initialFormState.modularSteps,
      baseModularStep: modularSteps.split(',').includes(baseModularStep)
        ? baseModularStep
        : initialFormState.baseModularStep,
      namingConvention: getQueryParam('namingConvention'),
      shouldUseRems: getQueryParam('shouldUseRems') === 'on',
      roundingDecimalPlaces: withNumericFallback(
        getQueryParam('roundingDecimalPlaces'),
        initialFormState.roundingDecimalPlaces
      ),
      fontFamily: fonts.includes(fontFamily) ? fontFamily : DEFAULT_FONT_FAMILY,
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
