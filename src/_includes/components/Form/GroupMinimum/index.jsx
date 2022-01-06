import { Action } from '../../constants';
import Input from '../../Input';
import TypeScalePicker from '../../TypeScalePicker';

/**
 * @param {Pick<import("../../typedefs").AppState, 'min'> & { dispatch: import("../../typedefs").AppDispatcher; maxScreenWidth: number }} props
 */
const GroupMinimum = (props) => {
  const { min, dispatch, maxScreenWidth } = props;
  return (
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
            max={maxScreenWidth - 1}
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
  );
};

export default GroupMinimum;
