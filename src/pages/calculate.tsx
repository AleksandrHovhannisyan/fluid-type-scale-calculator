import { STATUS_CODES as REASON_PHRASES } from 'http';
import { constants as HTTP_STATUS_CODES } from 'http2';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { QueryParamKey } from '../api/api.constants';
import { getQueryParam, getQueryParamConfig, validateQueryParams } from '../api/api.utils';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import { initialFormState } from '../constants';
import site from '../data/site.json';
import { FormState, HTTPError, WithFonts } from '../types';
import { getGoogleFontFamilies } from '../utils';

type CalculatePageProps = WithFonts & {
  /** The initial state with which to populate the app from query params. */
  initialState: FormState;
  /** A server-side error. */
  error?: HTTPError;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CalculatePageProps>> => {
  const fonts = await getGoogleFontFamilies();

  try {
    const params = getQueryParamConfig(context.query, { fonts });
    validateQueryParams(params);

    const initialState: FormState = {
      min: {
        fontSize: getQueryParam<QueryParamKey.minFontSize>(params, QueryParamKey.minFontSize).value,
        screenWidth: getQueryParam<QueryParamKey.minScreenWidth>(params, QueryParamKey.minScreenWidth).value,
        modularRatio: getQueryParam<QueryParamKey.minRatio>(params, QueryParamKey.minRatio).value,
      },
      max: {
        fontSize: getQueryParam<QueryParamKey.maxFontSize>(params, QueryParamKey.maxFontSize).value,
        screenWidth: getQueryParam<QueryParamKey.maxScreenWidth>(params, QueryParamKey.maxScreenWidth).value,
        modularRatio: getQueryParam<QueryParamKey.maxRatio>(params, QueryParamKey.maxRatio).value,
      },
      typeScaleSteps: {
        all: getQueryParam<QueryParamKey.allSteps>(params, QueryParamKey.allSteps).value,
        base: getQueryParam<QueryParamKey.baseStep>(params, QueryParamKey.baseStep).value,
      },
      namingConvention: getQueryParam<QueryParamKey.namingConvention>(params, QueryParamKey.namingConvention).value,
      shouldUseRems: getQueryParam<QueryParamKey.shouldUseRems>(params, QueryParamKey.shouldUseRems).value,
      roundingDecimalPlaces: getQueryParam<QueryParamKey.roundingDecimalPlaces>(
        params,
        QueryParamKey.roundingDecimalPlaces
      ).value,
      fontFamily: getQueryParam<QueryParamKey.fontFamily>(params, QueryParamKey.fontFamily).value,
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
