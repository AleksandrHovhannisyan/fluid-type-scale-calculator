import type { AppState, TypeScale } from '../../../types';
import CopyToClipboardButton from '../../CopyToClipboardButton/CopyToClipboardButton';
import styles from './Output.module.scss';

type Props = Pick<AppState, 'namingConvention'> & {
  /** The output type scale. */
  typeScale: TypeScale;
};

const Output = (props: Props) => {
  const { namingConvention, typeScale } = props;

  const code = Array.from(typeScale.entries())
    .map(([step, { min, max, preferred }]) => {
      return `--${namingConvention}-${step}: clamp(${min}, ${preferred}, ${max});`;
    })
    .join('\n');

  return (
    <aside className={styles.output}>
      <div className={styles['output-wrapper']}>
        <output className={styles['output-code']}>
          <code className={styles.code}>{code}</code>
        </output>
      </div>
      <CopyToClipboardButton text={code} />
    </aside>
  );
};

export default Output;
