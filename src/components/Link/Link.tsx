import type { FC, HTMLProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import styles from './Link.module.scss';

type Props = Pick<LinkProps, 'href'> &
  Pick<HTMLProps<HTMLAnchorElement>, 'aria-label'> & {
    /** Optional styling for the link. */
    className?: string;
  };

const Link: FC<PropsWithChildren<Props>> = ({ href, className, children, ...otherProps }) => {
  const isExternalLink = /https?:\/\//.test(href.toString());

  const link = (
    <a
      href={href.toString()}
      className={clsx(styles.link, className)}
      rel={isExternalLink ? 'noopener' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );

  if (isExternalLink) {
    return link;
  }

  return (
    <NextLink href={href} passHref={true}>
      {link}
    </NextLink>
  );
};

export default Link;
