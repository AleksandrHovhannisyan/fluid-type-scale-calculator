import type { ElementType, FC, HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './Rhythm.module.scss';

type RhythmProps = HTMLProps<HTMLDivElement> & {
  /** The tag name to render. Defaults to `'div'`. */
  as?: ElementType;
};

/**
 * Defines a vertical rhythm layout, spacing children according to their line height.
 */
const Rhythm: FC<RhythmProps> = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.rhythm, className)}>
      {children}
    </Tag>
  );
};

export default Rhythm;
