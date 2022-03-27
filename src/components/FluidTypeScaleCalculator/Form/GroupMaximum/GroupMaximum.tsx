import { AppState, WithDispatch } from '../../../../types';
import Input from '../../../Input/Input';
import Label from '../../../Label/Label';
import LabelGroup from '../../../Label/LabelGroup/LabelGroup';
import TypeScalePicker from '../../TypeScalePicker/TypeScalePicker';

type Props = Pick<AppState, 'max'> &
  WithDispatch & {
    /** The minimum breakpoint's screen width. */
    minScreenWidth: AppState['min']['screenWidth'];
  };

const GroupMaximum = (props: Props) => {
  const { max, dispatch, minScreenWidth } = props;

  return (
    <Label
      as="fieldset"
      title="Maximum (Desktop)"
      description="Define the maximum font size and viewport width for your type scale's baseline step. The max font size for all other steps is this baseline font size scaled up/down by your chosen type scale ratio."
    >
      <LabelGroup>
        <Label>
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
        </Label>
        <Label>
          Screen width (pixels)
          <Input
            type="number"
            required={true}
            min={minScreenWidth + 1}
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
        </Label>
        <TypeScalePicker
          id="type-scale-max"
          ratio={max.modularRatio}
          onChange={(e) => dispatch({ type: 'setMax', payload: { modularRatio: Number(e.target.value) } })}
        />
      </LabelGroup>
    </Label>
  );
};

export default GroupMaximum;
