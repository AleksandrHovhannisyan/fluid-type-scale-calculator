import { modularRatios } from './constants';
import Input from './Input';

const Form = (props) => {
  const {
    baseFontSizePx,
    shouldUseRems,
    modularRatio,
    modularSteps,
    baseModularStep,
    breakpoints,
    namingConvention,
    roundingDecimalPlaces,
    dispatch,
  } = props;

  return (
    <fieldset className="form">
      <div className="label">
        <span className="label-title">Baseline minimum font size</span>
        <span className="label-description">
          The minimum font size of your baseline step. Multiplied by the modular ratio to generate all other font sizes
          in your type scale.
        </span>
        <div className="label-group">
          <label>
            Font size (pixels)
            <Input
              type="number"
              required={true}
              min={0}
              defaultValue={baseFontSizePx}
              onChange={(e) =>
                dispatch({
                  type: 'setBaseFontSize',
                  payload: Number(e.target.value),
                })
              }
            />
          </label>
          <label>
            Show output in rems
            <Input
              type="checkbox"
              checked={shouldUseRems}
              onChange={(e) =>
                dispatch({
                  type: 'setShouldUseRems',
                  payload: e.target.checked,
                })
              }
            />
          </label>
        </div>
      </div>
      <label className="label">
        <span className="label-title">Modular scale</span>
        <span className="label-description">
          The larger the ratio, the faster your font sizes will grow/shrink in each step up/down from the baseline.
        </span>
        <select
          defaultValue={modularRatio}
          onChange={(e) => dispatch({ type: 'setModularRatio', payload: e.target.value })}
        >
          {Object.entries(modularRatios).map(([key, { name, ratio }]) => {
            return (
              <option key={key} value={ratio}>
                {name} ({ratio})
              </option>
            );
          })}
        </select>
      </label>
      <div className="label">
        <span className="label-title">Viewport range (pixels)</span>
        <span className="label-description">
          Between the start and end breakpoints, every step in your type scale will take on a responsive font size.
        </span>
        <div className="label-group">
          <label data-flow="horizontal">
            Start
            <Input
              type="number"
              required={true}
              min={0}
              max={breakpoints.max - 1}
              defaultValue={breakpoints.min}
              onChange={(e) =>
                dispatch({
                  type: 'setBreakpoints',
                  payload: {
                    min: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <label data-flow="horizontal">
            End
            <Input
              type="number"
              required={true}
              min={breakpoints.min + 1}
              defaultValue={breakpoints.max}
              onChange={(e) =>
                dispatch({
                  type: 'setBreakpoints',
                  payload: {
                    max: Number(e.target.value),
                  },
                })
              }
            />
          </label>
        </div>
      </div>
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
          pattern="^[a-zA-Z0-9](?:,?[a-zA-Z0-9])*$"
          defaultValue={modularSteps.join(',')}
          onChange={(e) =>
            dispatch({
              type: 'setModularSteps',
              payload: e.target.value
                .split(',')
                .filter((step) => !!step.length)
                .map((step) => step.trim()),
            })
          }
        />
      </label>
      <label className="label">
        <span className="label-title">Base modular step</span>
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
              type: 'setBaseModularStep',
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
              type: 'setNamingConvention',
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
          min={0}
          required={true}
          defaultValue={roundingDecimalPlaces}
          onChange={(e) =>
            dispatch({
              type: 'setRoundingDecimalPlaces',
              payload: Number(e.target.value),
            })
          }
        />
      </label>
    </fieldset>
  );
};

export default Form;
