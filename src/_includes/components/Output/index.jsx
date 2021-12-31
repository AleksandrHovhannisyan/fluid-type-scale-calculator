import CopyToClipboardButton from '../CopyToClipboardButton';
import styles from './styles.module.scss';

const Output = ({ namingConvention, typeScale }) => {
  const code = Object.entries(typeScale)
    .map(([step, { min, max, preferred }]) => {
      return `--${namingConvention}-${step}: clamp(${min}, ${preferred}, ${max});`;
    })
    .join('\n');

  return (
    <aside className={styles.output}>
      <div className={styles['output-wrapper']}>
        <output className={styles['output-code']}>
          <noscript>This app relies on JavaScript. Please enable it if you can.</noscript>
          {code}
        </output>
      </div>
      <CopyToClipboardButton text={code} />
    </aside>
  );
};

export default Output;
