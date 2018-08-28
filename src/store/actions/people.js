import { ACTIVE_SEARCH_PEOPLE, SEARCH_PEOPLE } from '../types/people';
import { createAction } from 'redux-actions';
import { searchByNames } from '../../services/people';

export const activePeople = createAction(ACTIVE_SEARCH_PEOPLE, activeID => {
  // console.log('active id', activeID);
  return {
    activeID
  };
});

export const searchPeople = createAction(SEARCH_PEOPLE, names => {
  // console.log('active id', activeID);
  const result = searchByNames(['作平', '作苏']);
  return result;
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
});
