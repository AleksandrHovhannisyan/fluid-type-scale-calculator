import clsx from 'clsx';
import styles from './styles.module.scss';

/** @type {React.FC<React.HTMLProps<HTMLDivElement>>} */
const LabelGroup = ({ className, children, ...otherProps }) => {
  return (
    <div className={clsx(styles['label-group'], className)} {...otherProps}>
      {children}
    </div>
  );
};

export default LabelGroup;
