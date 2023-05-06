import type { FC, HTMLProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Label.module.scss';

export type LabelProps = Omit<HTMLProps<HTMLLabelElement & HTMLFieldSetElement>, 'title'> & {
  /** An optional title to display prominently above the input. */
  title?: string;
  /** An optional, extended description of the label's contents. */
  description?: string;
  /** Dictates the label's layout/content arrangement. If `'to-horizontal'` is specified, the label will
   * automatically switch from a vertical arrangement to a horizontal one at a target breakpoint. Default: `'vertical'`. */
  layout?: 'vertical' | 'horizontal' | 'to-horizontal';
};

const Label: FC<PropsWithChildren<LabelProps>> = (props) => {
  const { className, children, title, description, layout = 'vertical', ...otherProps } = props;

  const hasStylizedLabelText = !!title || !!description;

  const labelText = hasStylizedLabelText && (
    <span className={styles['label-text']}>
      {title && <span className={styles['label-title']}>{title}</span>}
      {description && <span>{description}</span>}
    </span>
  );

  // We don't want certain classes on fieldset variants since fieldset doesn't support flex/grid anyway,
  // so enable those classes conditionally only if we're rendering a literal <label>.
  const labelClassName = clsx(styles.label, { [styles[layout]]: layout !== 'vertical' }, className);

  return (
    <label className={labelClassName} {...otherProps}>
      {labelText}
      {children}
    </label>
  );
};

export default Label;
