import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <button className={clsx(styles.button, className)} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
