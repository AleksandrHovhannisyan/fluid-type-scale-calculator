import packageJson from '../../../package.json';
import socials from '../../data/socials.json';
import Link from '../Link/Link';
import styles from './PageFooter.module.scss';

const PageFooter = () => {
  return (
    <footer className={styles['page-footer']}>
      <div>
        <span aria-hidden="true">&copy;</span>Copyright{' '}
        <Link href="https://www.aleksandrhovhannisyan.com/" className={styles['site-link']}>
          Aleksandr Hovhannisyan
        </Link>
        , 2021–Present. v{packageJson.version}.
      </div>
      <p className="sr-only">Social media links</p>
      <ul className={styles.socials}>
        {Object.entries(socials).map(([key, social]) => {
          return (
            <li key={key}>
              <Link href={social.url}>{social.name}</Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default PageFooter;
