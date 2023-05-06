import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  /** Whether the button should occupy the full width of its containing block/formatting context. By default,
   * buttons will only occupy as much space as their content.
   */
  isFullWidth?: boolean;
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  isFullWidth,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(styles.button, { [styles['full-width']]: isFullWidth }, className)}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
