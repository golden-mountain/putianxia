import { handleActions } from 'redux-actions';
import {
  SEARCH_PEOPLE,
  SET_SEARCH_KEYWORDS,
  SEARCHING_PEOPLE,
  SELECT_SEARCHED_PEOPLE,
  UPDATE_WEIXIN,
  UPDATE_PEOPLE,
  GET_MY_MAP,
  DELETE_PEOPLE,
  GET_WEIXIN_INFO,
  GET_USER_INFO_BY_ID,
  GET_MY_NODES
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
    [SEARCH_PEOPLE](state, action) {
      // construct data like
      if (!action.payload.data.data) return state;
      // console.log('searched people', action.payload.data.data);
      return {
        ...state,
        searching: false,
        compareingPeople: [],
        searchedPeople: action.payload.data.data,
        children: []
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
