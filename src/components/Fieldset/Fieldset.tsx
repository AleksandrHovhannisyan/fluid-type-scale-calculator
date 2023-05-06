import type { FC, HTMLProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Fieldset.module.scss';

type FieldsetProps = Omit<HTMLProps<HTMLFieldSetElement>, 'title'> & {
  /** A title to display prominently above the label group. */
  title: string;
  /** An extended description for the label group. */
  description?: string;
  /** Whether the legend is visually (accessibly) hidden. */
  isLegendVisuallyHidden?: boolean;
  /** Additional styling for the label group. */
  labelGroupClassName?: string;
};

const Fieldset: FC<PropsWithChildren<FieldsetProps>> = (props) => {
  const {
    className,
    children,
    title,
    description,
    isLegendVisuallyHidden,
    labelGroupClassName,
    ...otherProps
  } = props;
  return (
    <fieldset {...otherProps}>
      <legend className={clsx({ 'sr-only': isLegendVisuallyHidden })}>
        <span className={styles['legend']}>
          {title && <span className={styles['legend-title']}>{title}</span>}
          {description && <span>{description}</span>}
        </span>
      </legend>
      <div className={clsx(styles['label-group'], labelGroupClassName)}>{children}</div>
    </fieldset>
  );
};

export default Fieldset;
