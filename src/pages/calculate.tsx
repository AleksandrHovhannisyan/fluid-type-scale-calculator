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
    throwIf(!isNumber(param), `Expected a number for ${FormDataKey[key]} but received ${param}.`);
    return Number(param);
  };

  try {
    const minScreenWidth = getNumericParamWithFallback('minScreenWidth', initialFormState.min.screenWidth);
    const maxScreenWidth = getNumericParamWithFallback('maxScreenWidth', initialFormState.max.screenWidth);
    const allTypeScaleSteps = getQueryParam('allSteps') ?? initialFormState.typeScaleSteps.all.join(',');
    const baseTypeScaleStep = getQueryParam('baseStep') ?? initialFormState.typeScaleSteps.base;
    const fontFamily = getQueryParam('fontFamily') ?? DEFAULT_FONT_FAMILY;
    const shouldUseRems = getQueryParam('shouldUseRems');

    throwIf(
      minScreenWidth >= maxScreenWidth,
      `${FormDataKey.minScreenWidth} (${minScreenWidth}) must be strictly less than ${FormDataKey.maxScreenWidth} (${maxScreenWidth}).`
    );
    throwIf(
      !COMMA_SEPARATED_LIST_REGEX.test(allTypeScaleSteps),
      `Expected a comma-separated list for ${FormDataKey.allSteps}.`
    );
    throwIf(
      !allTypeScaleSteps.includes(baseTypeScaleStep),
      `The base step ${baseTypeScaleStep} was not found in the list of all steps.`
    );
    throwIf(
      !!shouldUseRems && shouldUseRems !== 'on',
      `${FormDataKey.shouldUseRems} must either be 'on' if enabled or omitted if turned off.`
    );
    throwIf(
      !fonts.includes(fontFamily),
      `${fontFamily} is not a recognized Google Font family. Custom fonts are not currently supported.`
    );

    const initialState: FormState = {
      min: {
        fontSize: getNumericParamWithFallback('minFontSize', initialFormState.min.fontSize),
        screenWidth: minScreenWidth,
        modularRatio: getNumericParamWithFallback('minRatio', initialFormState.min.modularRatio),
      },
      max: {
        fontSize: getNumericParamWithFallback('maxFontSize', initialFormState.max.fontSize),
        screenWidth: maxScreenWidth,
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
    // TypeScript doesn't support type annotations on catch
    const error = e as Error;
    const statusCode = HTTP_STATUS_CODES.HTTP_STATUS_BAD_REQUEST;
    const description = error.message ?? 'One or more query parameters are invalid. Please check the URL you entered.';
    return {
      props: {
        fonts,
        initialState: initialFormState,
        error: {
          code: statusCode,
          reasonPhrase: REASON_PHRASES[statusCode] as string,
          description,
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
