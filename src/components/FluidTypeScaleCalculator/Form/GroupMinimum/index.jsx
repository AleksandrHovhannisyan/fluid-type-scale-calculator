import { Action } from '../../../constants';
import Input from '../../../Input';
import Label from '../../../Label';
import LabelGroup from '../../../Label/LabelGroup';
import TypeScalePicker from '../../TypeScalePicker';

/**
 * @param {Pick<import("../../typedefs").AppState, 'min'> & { dispatch: import("../../typedefs").AppDispatcher; maxScreenWidth: number }} props
 */
const GroupMinimum = (props) => {
  const { min, dispatch, maxScreenWidth } = props;
  return (
    <Label
      as="fieldset"
      title="Minimum (Mobile)"
      description="Define the minimum font size and viewport width for your type scale's baseline step. The minimum font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <LabelGroup>
        <Label>
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
        </Label>
        <Label>
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
        </Label>
        <TypeScalePicker
          id="type-scale-min"
          ratio={min.modularRatio}
          onChange={(e) => dispatch({ type: Action.SET_MIN, payload: { modularRatio: Number(e.target.value) } })}
        />
      </LabelGroup>
    </Label>
  );
};

export default GroupMinimum;
