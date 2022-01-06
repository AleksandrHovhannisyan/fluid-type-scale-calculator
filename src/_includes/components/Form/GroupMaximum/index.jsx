import { Action } from '../../constants';
import Input from '../../Input';
import TypeScalePicker from '../../TypeScalePicker';

/**
 * @param {Pick<import("../../typedefs").AppState, 'max'> & { dispatch: import("../../typedefs").AppDispatcher; minScreenWidth: number }} props
 */
const GroupMaximum = (props) => {
  const { max, dispatch, minScreenWidth } = props;

  return (
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
            min={minScreenWidth + 1}
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
  );
};

export default GroupMaximum;
