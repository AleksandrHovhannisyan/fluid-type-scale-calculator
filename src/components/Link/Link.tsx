import { FC, HTMLProps } from 'react';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import styles from './Link.module.scss';

type Props = LinkProps &
  Pick<HTMLProps<HTMLAnchorElement>, 'dangerouslySetInnerHTML'> & {
    /** Optional styling for the link. */
    className?: string;
  };

const Link: FC<Props> = ({ href, className, children, dangerouslySetInnerHTML, ...otherProps }) => {
  const isExternalLink = /https?:\/\//.test(href.toString());
  const hrefDependentProps = isExternalLink
    ? {
        rel: 'noreferrer noopener',
        target: '_blank',
      }
    : {};

  const link = (
    <a
      href={href.toString()}
      className={clsx(styles.link, className)}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...hrefDependentProps}
    >
      {children}
    </a>
  );

  if (isExternalLink) {
    return link;
  }

  return (
    <NextLink href={href} passHref={true} {...otherProps}>
      {link}
    </NextLink>
  );
};

export default Link;
