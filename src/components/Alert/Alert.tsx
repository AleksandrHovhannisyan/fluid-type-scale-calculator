import type { FC, HTMLProps } from 'react';

const Alert: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <div role="alert" {...otherProps}>
      {children}
    </div>
  );
};

export default Alert;
