import SimpleIcons from 'simple-icons';
import { socials } from '../../data';
import Link from '../Link/Link';
import styles from './styles.module.scss';

const PageFooter = () => {
  return (
    <footer className={styles['page-footer']}>
      <span>
        <span aria-hidden="true">&copy;</span>Copyright{' '}
        <Link href="https://www.aleksandrhovhannisyan.com/">Aleksandr Hovhannisyan</Link>, 2021. Made with{' '}
        <Link href="https://www.11ty.dev/">11ty</Link> and <Link href="https://slinkity.dev/">Slinkity</Link>.
      </span>
      <ul className={styles.socials} aria-label="Social media">
        {Object.entries(socials).map(([key, { name, url }]) => {
          return (
            <li key={key}>
              <Link href={url} aria-label={name} dangerouslySetInnerHTML={{ __html: SimpleIcons.Get(key).svg }} />
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default PageFooter;
