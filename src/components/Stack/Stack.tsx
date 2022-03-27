import { ElementType, FC, HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

/**
 * @typedef StackProps
 * @property {React.ElementType} as The tag name to render
 */

type StackProps = HTMLProps<HTMLDivElement> & {
  /** The tag name to render. Defaults to `'div'`. */
  as?: ElementType;
};

/**
 * A generic gapped layout that stacks on mobile and splits into a two-column view on desktop.
 */
const Stack: FC<StackProps> = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.stack, className)}>
      {children}
    </Tag>
  );
};

export default Stack;
