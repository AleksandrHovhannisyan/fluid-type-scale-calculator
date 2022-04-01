import clsx from 'clsx';
import styles from './Banner.module.scss';

/**
 * @typedef BannerProps
 * @property {React.ElementType} as?: an optional tag name to render. Defaults to `'div'`.
 */

/** @type React.FC<BannerProps & React.HTMLAttributes<HTMLOrSVGElement> */
const Banner = ({ as: Tag = 'div', className, children, ...otherProps }) => {
  return (
    <Tag className={clsx(styles.banner, className)} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Banner;
