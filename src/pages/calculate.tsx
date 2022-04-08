import { STATUS_CODES as REASON_PHRASES } from 'http';
import { constants as HTTP_STATUS_CODES } from 'http2';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { COMMA_SEPARATED_LIST_REGEX } from '../components/FluidTypeScaleCalculator/Form/GroupTypeScaleSteps/GroupTypeScaleSteps.constants.';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { DEFAULT_FONT_FAMILY, initialFormState, site } from '../constants';
import { FormDataKey, FormState, HTTPError, WithFonts } from '../types';
import { getGoogleFontFamilies, isNumber, throwIf } from '../utils';

type CalculatePageProps = WithFonts & {
  /** The initial state with which to populate the app from query params. */
  initialState: FormState;
  /** A server-side error. */
  error?: HTTPError;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CalculatePageProps>> => {
  const query = context.query as Record<FormDataKey, string>;
  const fonts = await getGoogleFontFamilies();

  /** Helper to return a query param by key, if it exists, and an empty string otherwise. */
  const getQueryParam = (key: keyof typeof FormDataKey): string | undefined => query[FormDataKey[key]];

  /** Helper that fetches the given key from query params, expecting to find a string that looks like a number. If the param does not exist,
   * returns the fallback. If the param exists but is not of a numeric type, throws an error. Else, returns the parsed param as a number. */
  const getNumericParamWithFallback = (key: keyof typeof FormDataKey, fallback: number): number => {
    const param = getQueryParam(key);
    if (typeof param === 'undefined') {
      return fallback;
    }
    throwIf(!isNumber(param));
    return Number(param);
  };

  try {
    const allTypeScaleSteps = getQueryParam('allSteps') ?? initialFormState.typeScaleSteps.all.join(',');
    const baseTypeScaleStep = getQueryParam('baseStep') ?? initialFormState.typeScaleSteps.base;
    const fontFamily = getQueryParam('fontFamily') ?? DEFAULT_FONT_FAMILY;
    const shouldUseRems = getQueryParam('shouldUseRems');

    throwIf(
      !COMMA_SEPARATED_LIST_REGEX.test(allTypeScaleSteps) ||
        !allTypeScaleSteps.includes(baseTypeScaleStep) ||
        (shouldUseRems && shouldUseRems !== 'on') ||
        !fonts.includes(fontFamily)
    );

    const initialState: FormState = {
      min: {
        fontSize: getNumericParamWithFallback('minFontSize', initialFormState.min.fontSize),
        screenWidth: getNumericParamWithFallback('minScreenWidth', initialFormState.min.screenWidth),
        modularRatio: getNumericParamWithFallback('minRatio', initialFormState.min.modularRatio),
      },
      max: {
        fontSize: getNumericParamWithFallback('maxFontSize', initialFormState.max.fontSize),
        screenWidth: getNumericParamWithFallback('maxScreenWidth', initialFormState.max.screenWidth),
        modularRatio: getNumericParamWithFallback('maxRatio', initialFormState.max.modularRatio),
      },
      typeScaleSteps: {
        all: allTypeScaleSteps.split(','),
        base: baseTypeScaleStep,
      },
      namingConvention: getQueryParam('namingConvention') ?? initialFormState.namingConvention,
      shouldUseRems: shouldUseRems === 'on',
      roundingDecimalPlaces: getNumericParamWithFallback(
        'roundingDecimalPlaces',
        initialFormState.roundingDecimalPlaces
      ),
      fontFamily,
    };
    return {
      props: {
        initialState,
        fonts,
      },
    };
  } catch (e) {
    const statusCode = HTTP_STATUS_CODES.HTTP_STATUS_BAD_REQUEST;
    return {
      props: {
        fonts,
        initialState: initialFormState,
        error: {
          code: statusCode,
          reasonPhrase: REASON_PHRASES[statusCode] as string,
          // TODO: provide more helpful feedback via error messaging. This should suffice for now.
          description: 'One or more query parameters are invalid. Please check the URL you entered.',
        },
      },
    };
  }
};

const Calculate: NextPage<CalculatePageProps> = (props) => {
  if (props.error) {
    return <ErrorPage {...props.error} />;
  }
  return (
    <Layout isBlockedFromIndexing={true}>
      <HeroBanner title={site.title} subtitle={site.description} />
      <FluidTypeScaleCalculator initialState={props.initialState} fonts={props.fonts} />
      <Info />
    </Layout>
  );
};

export default Calculate;
