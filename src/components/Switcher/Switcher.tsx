import type { ElementType, FC, HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './Switcher.module.scss';

type SwitcherProps = HTMLProps<HTMLDivElement> & {
  /** The tag name to render. Defaults to `'div'`. */
  as?: ElementType;
};

/**
 * A generic gapped layout that stacks on mobile and splits into a two-column view on desktop.
 */
const Switcher: FC<SwitcherProps> = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.switcher, className)}>
      {children}
    </Tag>
  );
};

export default Switcher;
