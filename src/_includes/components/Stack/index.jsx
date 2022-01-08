import clsx from 'clsx';
import styles from './styles.module.scss';

/**
 * @typedef StackProps
 * @property {React.ElementType} as - the tag name to render
 */

/**
 * A generic gapped layout that stacks on mobile and splits into a two-column view on desktop.
 * @type {React.FC<StackProps & React.HTMLProps<HTMLDivElement>}
 */
const Stack = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.stack, className)}>
      {children}
    </Tag>
  );
};

export default Stack;
