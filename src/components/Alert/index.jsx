/**
 * @type {React.FC<React.HTMLProps<HTMLDivElement>>}
 */
export const Alert = (props) => {
  const { children, ...otherProps } = props;
  return (
    <div role="alert" {...otherProps}>
      {children}
    </div>
  );
};
