import type { AppState, WithDispatch } from '../../../../types';
import Checkbox from '../../../Checkbox/Checkbox';

type Props = WithDispatch & Pick<AppState, 'shouldUseRems'>;

const GroupUseRems = (props: Props) => {
  const { shouldUseRems, dispatch } = props;
  return (
    <Checkbox
      checked={shouldUseRems}
      onChange={(e) =>
        dispatch({
          type: 'setShouldUseRems',
          payload: e.target.checked,
        })
      }
    >
      Show output in rems
    </Checkbox>
  );
};

export default GroupUseRems;
