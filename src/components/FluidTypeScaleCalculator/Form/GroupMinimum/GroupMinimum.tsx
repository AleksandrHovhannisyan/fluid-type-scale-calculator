import type { AppState, WithDispatch } from '../../../../types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import LabelGroup from '../../../Label/LabelGroup/LabelGroup';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

type Props = Pick<AppState, 'min'> &
  WithDispatch & {
    /** The maximum breakpoint's screen width. */
    maxScreenWidth: AppState['max']['screenWidth'];
  };

const GroupMinimum = (props: Props) => {
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
                type: 'setMin',
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
                type: 'setMin',
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
          onChange={(e) => dispatch({ type: 'setMin', payload: { modularRatio: Number(e.target.value) } })}
        />
      </LabelGroup>
    </Label>
  );
};

export default GroupMinimum;
