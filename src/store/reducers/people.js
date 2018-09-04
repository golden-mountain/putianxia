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

function formatSearchedResult1(data) {
  // console.log(data, 'all data');
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
    // find all sons
    data.forEach((v, i) => {
      const son = v[0].data,
        parent = v[1].data,
        wife = v[2] ? v[2].data : [];
      let name = son.名;

      if (!obj[name]) {
        obj[name] = [];
        sons[name] = son;
      }
      // find name from results:
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
  // console.log(obj);
  return obj;
}

function formatSearchedResult2(data) {
  // if promise returns new data from api
  const result = {};
  if (data) {
    // group all sons
    const sons = [];
    let previousIndex = 0;
    data.forEach((s, i) => {
      // console.log(s);
      const [son, parent] = s;

      if (son.data.名 === parent.data.名 && i) {
        sons.push(data.slice(previousIndex, i));
        previousIndex = i;
      }
    });

    if (!sons.length) {
      sons.push(data);
    }

    // console.log(sons);

    // on each groups, need move wife and daughters and wifes under his name,
    // refactor the data structure
    sons.forEach(group => {
      if (!group[0]) return false;
      const son = group[0][0].data,
        father = group[1] ? group[1][1].data : null;
      let groupName;
      if (father) {
        groupName = `${father.名} > ${son.名}`;
      } else {
        groupName = son.名;
      }
      let newGroup = [];
      group.forEach(v => {
        // const [son, parent, relations, relation] = v;
        const son = v[0].data,
          parent = v[1].data,
          relations = v[2] ? v[2].data : {},
          relation = v[3] ? v[3].data : {};
        // find In parents, see if same parent exists
        const thisInResultList = newGroup.find(s => {
          return s.名 === parent.名;
        });

        if (!parent.妻) parent.妻 = [];
        // if (!parent.儿) parent.儿 = [];
        // if (!parent.女) parent.女 = [];
        // if current item relation returns wife
        if (relation.role === 'wife') {
          parent.妻.push(relations);
        }
        // if current item relation returns son
        // if (relation.role === 'son') {
        //   parent.儿 = relations;
        // }

        // // if current item relation returns daughter
        // if (relation.role === 'daughter') {
        //   parent.女 = relations;
        // }

        if (!thisInResultList) {
          parent.level = newGroup.length + 1;
          newGroup.push(parent);
        }
      });
      result[groupName] = newGroup.reverse();
    });

    return result;
  }
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
      console.log('searching....');
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
      // console.log('searched', action);
      // construct data like
      if (!action.payload.data.data) return state;
      const obj = formatSearchedResult2(action.payload.data.data);
      // console.log(obj, 'object from reducer');

      // let selectedPeople = {};
      // if (obj) {
      //   const values = Object.values(obj)[0];
      //   selectedPeople = values ? values[values.length - 1] : {};
      //   // console.log(selectedPeople, 'is selected obj');
      // }
      return {
        ...state,
        searching: false,
        // selectedPeople: selectedPeople,
        compareingPeople: [],
        searchedPeople: obj
      };
    }
  },
  {
    activeID: 0
  }
);
