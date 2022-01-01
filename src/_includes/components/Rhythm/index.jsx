import clsx from 'clsx';
import styles from './styles.module.scss';

const Rhythm = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.rhythm, className)}>
      {children}
    </Tag>
  );
};

export default Rhythm;
