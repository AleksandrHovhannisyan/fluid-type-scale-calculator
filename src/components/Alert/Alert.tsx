import type { FC, HTMLProps } from 'react';

const Alert: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <span role="alert" {...otherProps}>
      {children}
    </span>
  );
};

export default Alert;
