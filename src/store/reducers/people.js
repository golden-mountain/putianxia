import { handleActions } from 'redux-actions';
import {
  ACTIVE_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SET_SEARCH_KEYWORDS,
  SEARCHING_PEOPLE,
  SELECT_SEARCHED_PEOPLE,
  SHOW_PEOPLE_DETAIL,
  UPDATE_CURRENT_PEOPLE_INDEX,
  GET_CHILDREN_BY_ID,
  UPDATE_WEIXIN,
  UPDATE_PEOPLE,
  GET_MY_MAP,
  DELETE_PEOPLE,
  GET_WEIXIN_INFO,
  GET_USER_INFO_BY_ID,
  GET_MY_NODES
} from '../types/people';

import {
  formatSearchedResult,
  formatSelectedPeople,
  formatChildren
} from '../helpers/people';

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
      // console.log(action, '.... state changing');
      return {
        ...state,
        selectedPeople: action.payload,
        formatInfo: formatSelectedPeople(action.payload)
      };
    },
    [UPDATE_CURRENT_PEOPLE_INDEX](state, action) {
      // console.log(state, action, '.... show people detail next current');
      const currentPeople = state.selectedPeopleDetail;
      currentPeople.currentIndex = action.payload;
      return {
        ...state,
        selectedPeopleDetail: currentPeople,
        children: []
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
      console.log('obj:', obj, 'searched people', action.payload.data.data);
      return {
        ...state,
        searching: false,
        compareingPeople: [],
        searchedPeople: obj,
        children: []
      };
    },
    [GET_CHILDREN_BY_ID](state, action) {
      // console.log(action.payload.data);

      // construct data like
      if (!action.payload.data.data) return state;
      return {
        ...state,
        children: formatChildren(action.payload.data.data)
      };
    },
    [UPDATE_WEIXIN](state, action) {
      const data = action.payload.data.data;
      // construct data like
      if (!data.length) return state;
      // console.log(data[0][0].data, '<<< update weixin');
      return {
        ...state,
        weixinUser: data[0][0].data
      };
    },
    [DELETE_PEOPLE](state, action) {
      console.log(action, '<<<delete people');
      // construct data like
      if (!action.payload.data.data) return state;
      return {
        ...state,
        myNodes: action.payload.data.data
      };
    },
    [GET_MY_MAP](state, action) {
      const myRoots = action.payload.data.data;
      // console.log(myRoots, '......');

      // construct data like
      if (!myRoots.length) return state;
      return {
        ...state,
        myRoots
      };
    },
    [UPDATE_PEOPLE](state, action) {
      if (!action.payload || !action.payload.data) {
        return state;
      }
      // return state;
      // const data = action.payload.data.data;
      // // construct data like
      // if (!data.length) return state;
      // // console.log(data[0][0].data, '<<< update weixin');
      const wx = state.wx;
      const id = wx ? wx.pu.id : '';
      if (action.payload.data.data[0][0].data.id === id) {
        wx.pu = action.payload.data.data[0][0].data;
        return {
          ...state,
          userInfo: {},
          ...wx
        };
      } else {
        return state;
      }
    },
    [GET_USER_INFO_BY_ID](state, action) {
      if (!action.payload) {
        return state;
      }
      // console.log(action.payload, '<<< get info');
      const data = action.payload.data.data[0];
      return {
        ...state,
        userInfo: { id: data[1], ...data[0].data }
      };
    },
    [GET_WEIXIN_INFO](state, action) {
      if (!action.payload) {
        return state;
      }
      // console.log(action.payload, '<<< get weixin info');
      return {
        ...state,
        wx: action.payload,
        weixinUser: action.payload.pu
      };
    },
    [GET_MY_NODES](state, action) {
      // construct data like
      if (!action.payload.data.data) return state;
      return {
        ...state,
        myNodes: action.payload.data.data
      };
    }
  },
  {
    activeID: 0
  }
);
