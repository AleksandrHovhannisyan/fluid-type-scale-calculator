import { STATUS_CODES as REASON_PHRASES } from 'http';
import { constants as HTTP_STATUS_CODES } from 'http2';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { QUERY_PARAM_CONFIG } from '../api/api.constants';
import { QueryParamId, UserSuppliedQueryParams } from '../api/api.types';
import { validateQueryParams } from '../api/api.validators';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { initialFormState } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.context';
import { FormState } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.types';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import site from '../data/site.json';
import { HTTPError, WithFonts } from '../types';
import { getGoogleFontFamilies, throwIf } from '../utils';

type CalculatePageProps = WithFonts & {
  /** The initial state with which to populate the app from query params. */
  initialState: FormState;
  /** A server-side error. */
  error?: HTTPError;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CalculatePageProps>> => {
  const query = context.query as UserSuppliedQueryParams;
  const fonts = await getGoogleFontFamilies();

  try {
    // Validate the query params first
    validateQueryParams({ query, config: QUERY_PARAM_CONFIG, fonts });

    // Then transform the query params to state
    const initialState: FormState = {
      min: {
        fontSize: QUERY_PARAM_CONFIG[QueryParamId.minFontSize].getValue(query),
        screenWidth: QUERY_PARAM_CONFIG[QueryParamId.minWidth].getValue(query),
        ratio: QUERY_PARAM_CONFIG[QueryParamId.minRatio].getValue(query),
      },
      max: {
        fontSize: QUERY_PARAM_CONFIG[QueryParamId.maxFontSize].getValue(query),
        screenWidth: QUERY_PARAM_CONFIG[QueryParamId.maxWidth].getValue(query),
        ratio: QUERY_PARAM_CONFIG[QueryParamId.maxRatio].getValue(query),
      },
      typeScaleSteps: {
        all: QUERY_PARAM_CONFIG[QueryParamId.allSteps].getValue(query),
        base: QUERY_PARAM_CONFIG[QueryParamId.baseStep].getValue(query),
      },
      namingConvention: QUERY_PARAM_CONFIG[QueryParamId.namingConvention].getValue(query),
      shouldUseRems: QUERY_PARAM_CONFIG[QueryParamId.shouldUseRems].getValue(query),
      roundingDecimalPlaces: QUERY_PARAM_CONFIG[QueryParamId.roundingDecimalPlaces].getValue(query),
      fontFamily: QUERY_PARAM_CONFIG[QueryParamId.previewFont].getValue(query),
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
