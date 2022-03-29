import { socials } from '../../data';
import Link from '../Link/Link';
import styles from './PageFooter.module.scss';

const PageFooter = () => {
  return (
    <footer className={styles['page-footer']}>
      <span>
        <span aria-hidden="true">&copy;</span>Copyright{' '}
        <Link href="https://www.aleksandrhovhannisyan.com/">Aleksandr Hovhannisyan</Link>, 2021. Made with{' '}
        <Link href="https://nextjs.org/">Next.js</Link>.
      </span>
      <ul className={styles.socials} aria-label="Social media">
        {Object.entries(socials).map(([key, { name, url, icon }]) => {
          return (
            <li key={key}>
              <Link href={url} aria-label={name} dangerouslySetInnerHTML={{ __html: icon }} />
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default PageFooter;
