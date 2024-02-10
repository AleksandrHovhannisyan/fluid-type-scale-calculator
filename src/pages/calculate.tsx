import { STATUS_CODES as REASON_PHRASES } from 'http';
import { constants as HTTP_STATUS_CODES } from 'http2';
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { ZodError } from 'zod';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import FluidTypeScaleCalculator from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator';
import { initialFormState } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.context';
import { FormState } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.types';
import { getStateFromSchema } from '../components/FluidTypeScaleCalculator/FluidTypeScaleCalculator.utils';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import Info from '../components/Info/Info';
import Layout from '../components/Layout/Layout';
import site from '../data/site.json';
import { getSchema } from '../schema/schema';
import { UserSuppliedQueryParams } from '../schema/schema.types';
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
  const query = context.query as UserSuppliedQueryParams;
  const fonts = await getGoogleFontFamilies();
  const schema = getSchema({ fonts });

  try {
    const initialState: FormState = getStateFromSchema(schema, query);
    return {
      props: {
        initialState,
        fonts,
      },
    };
  } catch (e) {
    console.log(e);
    // TypeScript doesn't support type annotations on catch
    const error = e as ZodError;
    const statusCode = HTTP_STATUS_CODES.HTTP_STATUS_BAD_REQUEST;
    const description = `Bad value for query parameter ${error.errors[0].path[0]}. ${error.errors[0].message}.`;
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
