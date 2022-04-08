import { HTTPError } from '../../types';
import HeroBanner from '../HeroBanner/HeroBanner';
import Layout from '../Layout/Layout';
import styles from './ErrorPage.module.scss';

const ErrorPage = (props: HTTPError) => {
  const { code, reasonPhrase, description } = props;
  const title = `${code} ${reasonPhrase}`;
  return (
    <Layout
      seoProps={{
        title,
        description,
      }}
      isBlockedFromIndexing={true}
      className={styles['error-page']}
    >
      <HeroBanner title={title} subtitle={description} className={styles['error-banner']} />
    </Layout>
  );
};

export default ErrorPage;
