import clsx from 'clsx';
import styles from './Link.module.scss';

const Link = ({ href, className, ...otherProps }) => {
  const isExternalLink = /https?:\/\//.test(href);
  const hrefDependentProps = isExternalLink
    ? {
        rel: 'noreferrer noopener',
        target: '_blank',
      }
    : {};
  return <a href={href} className={clsx(styles.link, className)} {...otherProps} {...hrefDependentProps} />;
};

export default Link;
