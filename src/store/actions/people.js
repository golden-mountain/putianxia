import {
  ACTIVE_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SELECT_SEARCH_PEOPLE,
  SET_SEARCH_KEYWORDS
} from '../types/people';
import { createAction } from 'redux-actions';
import { searchByNames } from '../../services/people';

export const activePeople = createAction(
  ACTIVE_SEARCH_PEOPLE,
  activeID => activeID
);

export const setSearchKeywords = createAction(
  SET_SEARCH_KEYWORDS,
  keywords => ({ keywords })
);

// console.log(result);
// return {
//   people: {
//     keyword1: [
//       { num: 1, name: '远灌', group: '至香堂' },
//       { num: 2, name: '世枢', group: '' },
//       { num: 3, name: '运炳', group: '' },
//       { num: 4, name: '统壬', group: '' },
//       { num: 5, name: '会金', group: '秉坚堂' },
//       { num: 6, name: '良系', group: '' },
//       { num: 7, name: '作芬', group: '' }
//     ],
//     keyword2: [
//       { num: 1, name: '远灌', group: '至香堂' },
//       { num: 2, name: '世枢', group: '' },
//       { num: 3, name: '运炳', group: '' },
//       { num: 4, name: '统壬', group: '' },
//       { num: 5, name: '会金', group: '秉坚堂' },
//       { num: 6, name: '良系', group: '' },
//       { num: 7, name: '作平', group: '' }
//     ]
//   }
// };
export const searchPeople = createAction(
  SEARCH_PEOPLE,
  names => {
    const result = searchByNames(names);
    return result;
  },
  { any: 'values' }
);

export const selectSearchPeople = createAction(SELECT_SEARCH_PEOPLE, names => {
  const result = searchByNames(['作平', '作苏']);
  return result;
});
