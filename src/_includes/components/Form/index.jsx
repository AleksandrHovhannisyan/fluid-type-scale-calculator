import Checkbox from '../Checkbox';
import { Action } from '../constants';
import Input from '../Input';
import TypeScalePicker from '../TypeScalePicker';
import styles from './styles.module.scss';

/**
 * @param {import('../typedefs').AppState & { dispatch: React.Dispatch<AppAction> }} props
 */
const Form = (props) => {
  const { min, max, shouldUseRems, modularSteps, baseModularStep, namingConvention, roundingDecimalPlaces, dispatch } =
    props;

  return (
    <form className={styles.form}>
      <fieldset className="label">
        <legend>
          <span className="label-title">Minimum (Mobile)</span>
          <span className="label-description">
            Define the minimum font size and viewport width for your type scale&apos;s baseline step. The minimum font
            size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio.
          </span>
        </legend>
        <div className="label-group">
          <label>
            Base font size (pixels)
            <Input
              type="number"
              required={true}
              min={0}
              defaultValue={min.fontSize}
              onChange={(e) =>
                dispatch({
                  type: Action.SET_MIN,
                  payload: {
                    fontSize: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <label>
            Screen width (pixels)
            <Input
              type="number"
              required={true}
              min={0}
              max={max.screenWidth - 1}
              defaultValue={min.screenWidth}
              onChange={(e) =>
                dispatch({
                  type: Action.SET_MIN,
                  payload: {
                    screenWidth: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <TypeScalePicker
            ratio={min.modularRatio}
            onChange={(e) => dispatch({ type: Action.SET_MIN, payload: { modularRatio: Number(e.target.value) } })}
          />
        </div>
      </fieldset>
      <fieldset className="label">
        <legend>
          <span className="label-title">Maximum (Desktop)</span>
          <span className="label-description">
            Define the maximum font size and viewport width for your type scale&apos;s baseline step. The max font size
            for all other steps is this baseline font size scaled up/down by your chosen type scale ratio.
          </span>
        </legend>
        <div className="label-group">
          <label>
            Base font size (pixels)
            <Input
              type="number"
              required={true}
              min={0}
              defaultValue={max.fontSize}
              onChange={(e) =>
                dispatch({
                  type: Action.SET_MAX,
                  payload: {
                    fontSize: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <label>
            Screen width (pixels)
            <Input
              type="number"
              required={true}
              min={min.screenWidth + 1}
              defaultValue={max.screenWidth}
              onChange={(e) =>
                dispatch({
                  type: Action.SET_MAX,
                  payload: {
                    screenWidth: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <TypeScalePicker
            ratio={max.modularRatio}
            onChange={(e) => dispatch({ type: Action.SET_MAX, payload: { modularRatio: Number(e.target.value) } })}
          />
        </div>
      </fieldset>
      <label className="label">
        <span className="label-title">Type scale steps</span>
        <span className="label-description">
          A comma-separated list of names for each step in your type scale, in ascending order of size. Use any
          convention you want.
        </span>
        <Input
          type="text"
          required
          spellCheck="false"
          pattern="^[a-zA-Z0-9-](?:(,\s*)?[a-zA-Z0-9-])*$"
          defaultValue={modularSteps.join(',')}
          onChange={(e) =>
            dispatch({
              type: Action.SET_MODULAR_STEPS,
              payload: e.target.value.split(',').map((step) => step.trim()),
            })
          }
        />
      </label>
      <label className="label">
        <span className="label-title">Baseline modular step</span>
        <span className="label-description">
          Identify the name of the baseline font size step in your type scale. This must appear in the list entered
          above.
        </span>
        <Input
          type="text"
          required={true}
          defaultValue={baseModularStep}
          onChange={(e) =>
            dispatch({
              type: Action.SET_BASE_MODULAR_STEP,
              payload: e.target.value,
            })
          }
        />
      </label>
      <label className="label">
        <span className="label-title">Variable naming convention</span>
        <span className="label-description">Prefixed to each modular step to create unique variable names.</span>
        <Input
          type="text"
          required={true}
          defaultValue={namingConvention}
          onChange={(e) =>
            dispatch({
              type: Action.SET_NAMING_CONVENTION,
              payload: e.target.value,
            })
          }
        />
      </label>
      <label className="label">
        <span className="label-title">Rounding</span>
        <span className="label-description">Control how many decimal places are shown in the output.</span>
        <Input
          type="number"
          step={1}
          min={0}
          required={true}
          defaultValue={roundingDecimalPlaces}
          onChange={(e) =>
            dispatch({
              type: Action.SET_ROUNDING_DECIMAL_PLACES,
              payload: Number(e.target.value),
            })
          }
        />
      </label>
      <Checkbox
        checked={shouldUseRems}
        onChange={(e) =>
          dispatch({
            type: Action.SET_SHOULD_USE_REMS,
            payload: e.target.checked,
          })
        }
      >
        Show output in rems
      </Checkbox>
    </form>
  );
};

export default Form;
