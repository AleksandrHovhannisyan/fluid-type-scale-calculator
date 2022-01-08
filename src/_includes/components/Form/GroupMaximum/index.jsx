import { Action } from '../../constants';
import Input from '../../Input';
import LabelGroup from '../../Label/LabelGroup';
import Label from '../../Label';
import TypeScalePicker from '../../TypeScalePicker';

/**
 * @param {Pick<import("../../typedefs").AppState, 'max'> & { dispatch: import("../../typedefs").AppDispatcher; minScreenWidth: number }} props
 */
const GroupMaximum = (props) => {
  const { max, dispatch, minScreenWidth } = props;

  return (
    <Label
      as="fieldset"
      title="Maximum (Desktop)"
      description="Define the maximum font size and viewport width for your type scale's baseline step. The max font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <LabelGroup>
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
      </LabelGroup>
    </Label>
  );
};

export default GroupMaximum;
