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
  // build wifes
  const buildWifes = n => {
    if (!n[1].data.妻) {
      n[1].data.妻 = [];
    }
    for (var i in data) {
      const v = data[i];
      if (v[4] && v[4].end === n[1].self && v[3].data) {
        n[1].data.妻.push(v[3].data);
      }
    }
  };
  // console.log(data);
  // find child nodes
  const childNodes = [];
  const groups = {};
  data.forEach(n => {
    const finded = childNodes.find(v => {
      return v.self === n[1].self;
    });
    if (n[2].length === 0 && !finded) {
      childNodes.push(n[1]);
      buildWifes(n);
      groups[n[1].self] = [n[1].data];
    }
  });
  // console.log(childNodes);
  // find parents
  const buildParents = (n, root) => {
    // find relations to find it's parent
    let parentNode = null;
    for (var i in data) {
      const v = data[i];
      if (v[2].length) {
        const node = v[2].find(p => p.start === n.self);
        if (node) {
          parentNode = v;
          break;
        }
      }
    }
    // console.log(parentNode);
    if (parentNode) {
      groups[root.self].push(parentNode[1].data);
      buildWifes(parentNode);
      buildParents(parentNode[1], root);
    }
  };
  childNodes.forEach(n => {
    buildParents(n, n);
  });

  // reverse and set level
  let newGroups = {};
  for (var k in groups) {
    let group = groups[k];
    const [son, father] = group;
    let groupName;
    if (father) {
      groupName = `${father.名} > ${son.名}`;
    } else {
      groupName = `${son.名}`;
    }
    newGroups[groupName] = group.reverse().map((v, i) => {
      v.level = i + 1;
      return v;
    });
  }
  // console.log(groups);
  return newGroups;
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
