import Input from '../Input';
import styles from './styles.module.scss';

const RangeInput = ({ id, label, ...otherProps }) => {
  return (
    <div className={styles.range}>
      <label htmlFor={id}>
        <span className="label-title">{label}</span>
      </label>
      <div className={styles['range-display']}>
        <Input type="range" id={id} step={1} {...otherProps} />
        <label className="label" data-flow="horizontal">
          Custom <Input type="number" step={1} {...otherProps} />
        </label>
      </div>
    </div>
  );
};

export default RangeInput;
