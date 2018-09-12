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
  GET_WEIXIN_INFO
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
      // console.log(action.payload.data);

      // construct data like
      if (!action.payload.data.data) return state;
      return {
        ...state,
        weixinUser: action.payload.data.data
      };
    },
    [GET_WEIXIN_INFO](state, action) {
      // console.log(action.payload);
      return {
        ...state,
        wx: action.payload
      };
    }
  },
  {
    activeID: 0
  }
);
