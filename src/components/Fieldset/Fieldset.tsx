import type { FC, HTMLProps } from 'react';
import styles from './Fieldset.module.scss';

type FieldsetProps = Omit<HTMLProps<HTMLFieldSetElement>, 'title'> & {
  /** A title to display prominently above the label group. */
  title: string;
  /** An extended description for the label group. */
  description?: string;
};

const Fieldset: FC<FieldsetProps> = ({ className, children, title, description, ...otherProps }) => {
  return (
    <fieldset {...otherProps}>
      <legend>
        <span className={styles['legend']}>
          {title && <span className={styles['legend-title']}>{title}</span>}
          {description && <span>{description}</span>}
        </span>
      </legend>
      <div className={styles['label-group']}>{children}</div>
    </fieldset>
  );
};

export default Fieldset;
