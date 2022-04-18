import type { TypeScale } from '../../../types';
import CopyToClipboardButton from '../../CopyToClipboardButton/CopyToClipboardButton';
import { useFormState } from '../FluidTypeScaleCalculator.context';
import styles from './Output.module.scss';

type Props = {
  /** The output type scale. */
  typeScale: TypeScale;
};

const Output = (props: Props) => {
  const { state } = useFormState();
  const { typeScale } = props;

  const code = Array.from(typeScale.entries())
    .map(([step, { min, max, preferred }]) => {
      return `--${state.namingConvention}-${step}: clamp(${min}, ${preferred}, ${max});`;
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
