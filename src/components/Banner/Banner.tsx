import type { ElementType, FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Banner.module.scss';

export type BannerProps = HTMLAttributes<HTMLElement> & {
  /** An optional tag name to render. Defaults to `'div'`. */
  as?: ElementType;
};

const Banner: FC<BannerProps> = ({ as: Tag = 'div', className, children, ...otherProps }) => {
  return (
    <Tag className={clsx(styles.banner, className)} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Banner;
