import clsx from 'clsx';
import styles from './styles.module.scss';

/**
 * @typedef LabelProps
 * @property {'label' | 'fieldset'} as?: an optional tag name to render as. Defaults to `'label'`.
 * @property {string} title: the title for the label.
 * @property {string} description?: an optional extended description for the label.
 * @property {'vertical' | 'horizontal'} direction?: the direction in which the label flows. Defaults to `'vertical'`.
 */

/** @type {React.FC<LabelProps & Omit<React.HTMLProps<HTMLLabelElement>, 'title'>} */
const Label = ({
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
      <span className={styles['label-title']}>{title}</span>
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
