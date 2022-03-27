import { FC, HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './Label.module.scss';

export type LabelProps = Omit<HTMLProps<HTMLLabelElement & HTMLFieldSetElement>, 'title'> & {
  /* Optional tag name to render as. Defaults to `'label'`. */
  as?: 'label' | 'fieldset';
  /* An optional prominent title to render for the label. */
  title?: string;
  /** An optional extended description for the label. */
  description?: string;
  /** The direction in which the label flows. Defaults to `'vertical'`. */
  direction?: 'vertical' | 'horizontal';
};

const Label: FC<LabelProps> = ({
  as: Tag = 'label',
  className,
  children,
  title,
  description,
  direction = 'vertical',
  ...otherProps
}) => {
  const labelText = (
    <>
      {title && <span className={styles['label-title']}>{title}</span>}
      {description && <span className={styles['label-description']}>{description}</span>}
    </>
  );

  return (
    <Tag className={clsx(styles.label, className)} data-direction={direction} {...otherProps}>
      {Tag === 'fieldset' ? <legend>{labelText}</legend> : labelText}
      {children}
    </Tag>
  );
};

export default Label;
