import clsx from 'clsx';
import styles from './styles.module.scss';

const Stack = ({ className, children, as: Tag = 'div', ...otherProps }) => {
  return (
    <Tag {...otherProps} className={clsx(styles.stack, className)}>
      {children}
    </Tag>
  );
};

export default Stack;
