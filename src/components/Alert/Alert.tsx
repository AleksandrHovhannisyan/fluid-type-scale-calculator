import type { FC, HTMLProps, PropsWithChildren } from 'react';

const Alert: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <span role="alert" {...otherProps}>
      {children}
    </span>
  );
};

export default Alert;
