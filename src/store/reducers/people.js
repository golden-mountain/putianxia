import { handleActions } from 'redux-actions';
import { ACTIVE_SEARCH_PEOPLE, SEARCH_PEOPLE } from '../types/people';

export default handleActions(
  {
    [ACTIVE_SEARCH_PEOPLE](state, action) {
      return {
        ...state,
        activeID: action.payload.activeID
      };
    },
    [SEARCH_PEOPLE](state, action) {
      console.log(state, action);
      return {
        ...state,
        ...action.payload.people
      };
    }
  },
  {
    activeID: 0
  }
);
