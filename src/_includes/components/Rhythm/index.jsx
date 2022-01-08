import clsx from 'clsx';
import styles from './styles.module.scss';

/**
 * @typedef RhythmProps
 * @property {React.ElementType} as - the tag name to render
 */

/**
 * Defines a vertical rhythm layout, spacing children according to their line height.
 * @type {React.FC<RhythmProps & React.HTMLProps<HTMLDivElement>}
 */
const Rhythm = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.rhythm, className)}>
      {children}
    </Tag>
  );
};

export default Rhythm;
