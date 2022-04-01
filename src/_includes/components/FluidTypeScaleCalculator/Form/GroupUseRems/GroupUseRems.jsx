import Checkbox from '../../../Checkbox/Checkbox';
import { Action } from '../../../constants';

/**
 * @param {Pick<import("../../typedefs").AppState, 'shouldUseRems'> & { dispatch: import("../../typedefs").AppDispatcher } } props
 */
const GroupUseRems = (props) => {
  const { shouldUseRems, dispatch } = props;
  return (
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
  );
};

export default GroupUseRems;
