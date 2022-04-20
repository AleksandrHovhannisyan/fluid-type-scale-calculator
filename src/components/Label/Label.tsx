import type { FC, HTMLProps } from 'react';
import clsx from 'clsx';
import styles from './Label.module.scss';

export type LabelProps = Omit<HTMLProps<HTMLLabelElement & HTMLFieldSetElement>, 'title'> & {
  /* Optional tag name to render as. Defaults to `'label'`. */
  as?: 'label' | 'fieldset';
  /* An optional prominent title to render for the label. */
  title?: string;
  /** An optional extended description for the label. */
  description?: string;
  /** Dictates the label's layout/content arrangement. If `'to-horizontal'` is specified, the label will
   * automatically switch from a vertical arrangement to a horizontal one at a target breakpoint. Default: `'vertical'`. */
  layout?: 'vertical' | 'horizontal' | 'to-horizontal';
};

const Label: FC<LabelProps> = (props) => {
  const { as: Tag = 'label', className, children, title, description, layout = 'vertical', ...otherProps } = props;

  const isLabel = Tag === 'label';
  const hasStylizedLabelText = !!title || !!description;

  const labelText = hasStylizedLabelText && (
    <span className={styles['label-text']}>
      {title && <span className={styles['label-title']}>{title}</span>}
      {description && <span className={styles['label-description']}>{description}</span>}
    </span>
  );

  // We don't want certain classes on fieldset variants since fieldset doesn't support flex/grid anyway,
  // so enable those classes conditionally only if we're rendering a literal <label>.
  const labelClassName = clsx({ [styles.label]: isLabel, [styles[layout]]: isLabel }, className);

  return (
    <Tag className={labelClassName} {...otherProps}>
      {Tag === 'fieldset' ? <legend>{labelText}</legend> : labelText}
      {children}
    </Tag>
  );
};

export default Label;
