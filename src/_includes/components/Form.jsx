import Input from './Input';
import TypeScalePicker from './TypeScalePicker';

const Form = (props) => {
  const { min, max, shouldUseRems, modularSteps, baseModularStep, namingConvention, roundingDecimalPlaces, dispatch } =
    props;

  return (
    <form className="form">
      <div className="label">
        <div className="label-title">Minimum (Mobile)</div>
        <div className="label-description">
          The baseline step in your modular scale will take on the minimum font size you&apos;ve specified at your
          chosen screen width. The min font size for all other steps is the baseline size times your chosen ratio.
        </div>
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
                  type: 'setMin',
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
                  type: 'setMin',
                  payload: {
                    screenWidth: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <TypeScalePicker
            ratio={min.modularRatio}
            onChange={(e) => dispatch({ type: 'setMin', payload: { modularRatio: Number(e.target.value) } })}
          />
        </div>
      </div>
      <div className="label">
        <div className="label-title">Maximum (Desktop)</div>
        <div className="label-description">
          The baseline step in your modular scale will take on the maximum font size you&apos;ve specified at your
          chosen screen width. The max font size for all other steps is the baseline size times your chosen ratio.
        </div>
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
                  type: 'setMax',
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
                  type: 'setMax',
                  payload: {
                    screenWidth: Number(e.target.value),
                  },
                })
              }
            />
          </label>
          <TypeScalePicker
            ratio={max.modularRatio}
            onChange={(e) => dispatch({ type: 'setMax', payload: { modularRatio: Number(e.target.value) } })}
          />
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
      <label className="label" data-flow="horizontal">
        <span className="label-title">Show output in rems</span>
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
    </form>
  );
};

export default Form;
