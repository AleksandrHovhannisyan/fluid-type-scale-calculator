import escape from 'lodash/escape';
import { HTTPError } from '../../types';
import HeroBanner from '../HeroBanner/HeroBanner';
import Layout from '../Layout/Layout';
import styles from './ErrorPage.module.scss';

const ErrorPage = (props: HTTPError) => {
  const title = `${props.code} ${props.reasonPhrase}`;
  return (
    <Layout
      seoProps={{
        title,
        description: escape(props.description),
      }}
      isBlockedFromIndexing={true}
      className={styles['error-page']}
    >
      <HeroBanner title={title} subtitle={props.description} className={styles['error-banner']} />
    </Layout>
  );
};

export default ErrorPage;
