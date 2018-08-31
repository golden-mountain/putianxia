import { handleActions } from 'redux-actions';
import {
  ACTIVE_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SET_SEARCH_KEYWORDS,
  SEARCHING_PEOPLE,
  SELECT_SEARCHED_PEOPLE,
  SHOW_PEOPLE_DETAIL,
  UPDATE_CURRENT_PEOPLE_INDEX
} from '../types/people';

function formatSearchedResult(data) {
  /*
      {
        '良係>作平': [
          {名：'作平'},
          {名：'良系', 妻: [
            {名: '郭氏'}
          ]},
          {{名：'会金', 妻: [
            {名: '吴氏'}
          ]}
        ],
        '良俊>作苏': [
         ...
        ]
      }
      */
  let obj = {},
    sons = {};
  if (data) {
    // let parentName = '', sonName = ''; //, grandName = '';
    data.forEach((v, i) => {
      const son = v[0].data,
        parent = v[1].data,
        wife = v[2].data;
      let name = son.名;

      // if (parent && !parentName && sonName != name && parentName != name) {
      //   parentName = parent.名;
      //   sonName = name;
      // }
      // else if (parent && parentName && !grandName) {
      //   grandName = parent.名;
      // }
      // if (parentName) name = parentName + ' > ' + name;
      // if (grandName) name = grandName + ' > ' + name;
      if (!obj[name]) {
        obj[name] = [];
        sons[name] = son;
      }
      const itemInArray = obj[name].find(s => {
        return s.名 === parent.名;
      });
      let newItem = {};
      if (!itemInArray) {
        newItem = parent;
        newItem.妻 = [wife];
        obj[name].push(newItem);
        newItem.id = obj[name].length;
      } else {
        newItem = itemInArray;
        if (!newItem.妻) {
          newItem['妻'] = [];
        }
        newItem.妻.push(wife);
      }
    });
  }

  for (let key in obj) {
    const itemInArray = obj[key].find(s => {
      return s.名 === sons[key].名;
    });
    if (!itemInArray) {
      sons[key].id = obj[key].length + 1;
      obj[key].push(sons[key]);
    }
  }
  return obj;
}

/**
 * 自己之父――父亲
 * 父亲之父――祖父
 * 祖父之父――曾祖
 * 曾祖之父――高祖
 * 高祖之父――天祖
 * 天祖之父――烈祖
 * 烈祖之父――太祖
 * 太祖之父――远祖
 * 远祖之父――鼻祖

 * 父亲之子――儿子
 * 儿子之子――孙子
 * 孙子之子――曾孙
 * 曾孙之子――玄孙
 * 玄孙之子――来孙
 * 来孙之子――晜孙
 * 晜孙之子――仍孙
 * 仍孙之子――云孙
 * 云孙之子――耳孙
 * 这就是祖宗十八代'
 * Return
 * {
 *     names: '作平，作苏',
 *     contents: '两代前你们共祖父', '你们是亲兄妹'
 * }
 */
function formatSelectedPeople(selectePeople) {}

export default handleActions(
  {
    [SET_SEARCH_KEYWORDS](state, action) {
      // console.log('searching...', action.payload.keywords);
      return {
        ...state,
        keywords: action.payload.keywords
      };
    },
    [SEARCHING_PEOPLE](state, action) {
      return {
        ...state,
        searching: true
      };
    },
    [SELECT_SEARCHED_PEOPLE](state, action) {
      return {
        ...state,
        compareingPeople: action.payload
      };
    },
    [ACTIVE_SEARCH_PEOPLE](state, action) {
      // console.log(state, action, '.... state changing');
      return {
        ...state,
        selectedPeople: action.payload
      };
    },
    [UPDATE_CURRENT_PEOPLE_INDEX](state, action) {
      // console.log(state, action, '.... show people detail next current');
      const currentPeople = state.selectedPeopleDetail;
      currentPeople.currentIndex = action.payload;
      return {
        ...state,
        selectedPeopleDetail: currentPeople
      };
    },
    [SHOW_PEOPLE_DETAIL](state, action) {
      // console.log(action, '.... show people detail info changing');
      return {
        ...state,
        selectedPeopleDetail: action.payload
      };
    },
    [SEARCH_PEOPLE](state, action) {
      // console.log(state, action);
      // construct data like
      if (!action.payload.data.data) return state;
      const obj = formatSearchedResult(action.payload.data.data);
      // console.log(obj, 'object from reducer');

      let selectedPeople = {};
      if (obj) {
        const values = Object.values(obj)[0];
        selectedPeople = values ? values[values.length - 1] : {};
        // console.log(selectedPeople, 'is selected obj');
      }
      return {
        ...state,
        searching: false,
        selectedPeople: selectedPeople,
        compareingPeople: [],
        searchedPeople: obj
      };
    }
  },
  {
    activeID: 0
  }
);
