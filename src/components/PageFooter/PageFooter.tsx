import type { SimpleIcon } from 'simple-icons';
import { siBuymeacoffee, siGithub, siLinkedin, siStackexchange, siTwitter } from 'simple-icons/icons';
import socials from '../../data/socials.json';
import Link from '../Link/Link';
import styles from './PageFooter.module.scss';

type SocialId = keyof typeof socials;

const socialIcons: Record<SocialId, SimpleIcon> = {
  linkedin: siLinkedin,
  github: siGithub,
  twitter: siTwitter,
  stackexchange: siStackexchange,
  buymeacoffee: siBuymeacoffee,
};

const PageFooter = () => {
  return (
    <footer className={styles['page-footer']}>
      <span>
        <span aria-hidden="true">&copy;</span>Copyright{' '}
        <Link href="https://www.aleksandrhovhannisyan.com/">Aleksandr Hovhannisyan</Link>, 2021–Present.
      </span>
      <ul className={styles.socials} aria-label="Social media">
        {Object.entries(socials).map(([key, social]) => {
          return (
            <li key={key}>
              <Link
                href={social.url}
                aria-label={social.name}
                dangerouslySetInnerHTML={{ __html: socialIcons[key as SocialId].svg }}
              />
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default PageFooter;
