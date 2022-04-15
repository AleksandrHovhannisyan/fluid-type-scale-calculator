import { STATUS_CODES as REASON_PHRASES } from 'http';
import { constants as HTTP_STATUS_CODES } from 'http2';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { QueryParamKey } from '../api/api.constants';
import { getQueryParamConfig, validateQueryParams } from '../api/api.utils';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { initialFormState } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.context';
import { FormState } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.types';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import site from '../data/site.json';
import { HTTPError, WithFonts } from '../types';
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
        fontSize: params[QueryParamKey.minFontSize].getValue(),
        screenWidth: params[QueryParamKey.minScreenWidth].getValue(),
        ratio: params[QueryParamKey.minRatio].getValue(),
      },
      max: {
        fontSize: params[QueryParamKey.maxFontSize].getValue(),
        screenWidth: params[QueryParamKey.maxScreenWidth].getValue(),
        ratio: params[QueryParamKey.maxRatio].getValue(),
      },
      typeScaleSteps: {
        all: params[QueryParamKey.allSteps].getValue(),
        base: params[QueryParamKey.baseStep].getValue(),
      },
      namingConvention: params[QueryParamKey.namingConvention].getValue(),
      shouldUseRems: params[QueryParamKey.shouldUseRems].getValue(),
      roundingDecimalPlaces: params[QueryParamKey.roundingDecimalPlaces].getValue(),
      fontFamily: params[QueryParamKey.fontFamily].getValue(),
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
