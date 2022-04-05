import type { FC, HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './LabelGroup.module.scss';

const LabelGroup: FC<HTMLProps<HTMLDivElement>> = ({ className, children, ...otherProps }) => {
  return (
    <div className={clsx(styles['label-group'], className)} {...otherProps}>
      {children}
    </div>
  );
};

export default LabelGroup;
