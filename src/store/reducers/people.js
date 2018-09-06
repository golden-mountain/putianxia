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

function formatSearchedResult1(data) {}

function formatSearchedResult(data) {
  // if promise returns new data from api
  const result = {};
  if (data) {
    let previousPeople = {};
    // remove son's wife
    data.forEach((s, i) => {
      const [son, parent, wife] = s;
      if (parent.data.名 === previousPeople.名) {
        data.splice(i, 1);
        if (!previousPeople.妻) previousPeople.妻 = [];
        if (wife) previousPeople.妻.push(wife.data);
      } else {
        if (!parent.data.妻) parent.data.妻 = [];
        if (wife) parent.data.妻.push(wife.data);
        previousPeople = parent.data;
      }
    });

    // group all sons
    const sons = [];
    let previousIndex = 0;
    data.forEach((s, i) => {
      // console.log(s);
      const [son, parent] = s;

      if ((son.data.名 === parent.data.名 && i) || i === data.length - 1) {
        if (i === data.length - 1) {
          sons.push(data.slice(previousIndex, i + 1));
        } else {
          sons.push(data.slice(previousIndex, i));
        }

        previousIndex = i;
      }
    });

    if (!sons.length) {
      sons.push(data);
    }

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
        groupName = `${son.名}`;
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

        // if (!parent.妻) parent.妻 = [];
        // // if (!parent.儿) parent.儿 = [];
        // // if (!parent.女) parent.女 = [];
        // // if current item relation returns wife
        // if (relation.role === 'wife') {
        //   parent.妻.push(relations);
        // }
        // if current item relation returns son
        // if (relation.role === 'son') {
        //   parent.儿 = relations;
        // }

        // // if current item relation returns daughter
        // if (relation.role === 'daughter') {
        //   parent.女 = relations;
        // }

        if (!thisInResultList) {
          newGroup.push(parent);
        }
      });
      newGroup = newGroup.reverse().map((v, i) => {
        // console.log(v);
        v.level = i + 1;
        return v;
      });
      result[groupName] = newGroup;
    });

    return result;
  }
}

/**
 *
 * Return
 * {
 *     names: '作平，作苏',
 *     contents: '两代前你们共祖父', '你们是亲兄妹', '李作平', '良係次子, 1982年生,xxxx年殁, 大学生, 现在北京'
 * }
 */
function formatSelectedPeople(searchedPeople, selectedPeople) {
  const [people1, people2] = selectedPeople;
  let names = '',
    info = '';
  if (people2) {
    names = `${people1.名},${people2.名}`;
    let upLevel = people1.level;
    if (upLevel === 1) {
      info = '兄弟妹关系';
    } else if (upLevel === 2) {
      info = '共一个爷爷';
    } else if (upLevel === 3) {
      info = '共一个太爷爷';
    } else {
      info = `往上数${upLevel}代,你们共一个祖父`;
    }
  } else {
    names = `${people1.名}`;
    if (people1.字) {
      names += ` (字${people1.字})`;
    }
    if (people1.生) {
      info = `生于${people1.生}`;
    }
    if (people1.殁) {
      info += ` 殁于${people1.殁}`;
    }
    if (people1.祧) {
      info += ` 兼祧${people1.祧}`;
    }
    return { info, names };
  }
}

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
      console.log(action, '.... state changing');
      return {
        ...state,
        selectedPeople: action.payload,
        formatInfo: formatSelectedPeople(state.searchedPeople, action.payload)
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
      // construct data like
      if (!action.payload.data.data) return state;
      const obj = formatSearchedResult(action.payload.data.data);

      return {
        ...state,
        searching: false,
        compareingPeople: [],
        searchedPeople: obj
      };
    }
  },
  {
    activeID: 0
  }
);
