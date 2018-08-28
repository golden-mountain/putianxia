import { handleActions } from 'redux-actions';
import {
  ACTIVE_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SET_SEARCH_KEYWORDS
} from '../types/people';

export default handleActions(
  {
    [SET_SEARCH_KEYWORDS](state, action) {
      // console.log('searching...', action.payload.keywords);
      return {
        ...state,
        keywords: action.payload.keywords
      };
    },
    [ACTIVE_SEARCH_PEOPLE](state, action) {
      return {
        ...state,
        activeID: action.payload.activeID
      };
    },
    [SEARCH_PEOPLE](state, action) {
      // console.log(state, action);
      // construct data like
      /*
      {
        '作平': [
          {名：'作平'},
          {名：'良系', 妻: [
            {名: '郭氏'}
          ]},
          {{名：'会金', 妻: [
            {名: '吴氏'}
          ]}
        ],
        '作苏': [
         ...
        ]
      }
      */
      let array = {};
      action.payload.data.data.forEach((v, i) => {
        const son = v[0].data,
          parent = v[1].data,
          wife = v[2].data;
        let name = son.名;
        if (!array[name]) {
          array[name] = [son];
        }
        const itemInArray = array[name].find(s => {
          return s.名 === parent.名;
        });
        let newItem = {};
        if (!itemInArray) {
          newItem = parent;
          newItem.妻 = [wife];
          array[name].push(newItem);
        } else {
          newItem = itemInArray;
          if (!newItem.妻) {
            newItem['妻'] = [];
          }
          newItem.妻.push(wife);
        }
      });
      return {
        ...state,
        searchedPeople: array
      };
    }
  },
  {
    activeID: 0
  }
);
