import {
  ACTIVE_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SELECT_SEARCHED_PEOPLE,
  SET_SEARCH_KEYWORDS,
  SEARCHING_PEOPLE,
  SHOW_PEOPLE_DETAIL,
  UPDATE_CURRENT_PEOPLE_INDEX,
  GET_CHILDREN_BY_ID,
  UPDATE_WEIXIN,
  UPDATE_PEOPLE,
  GET_MY_MAP,
  GET_MY_NODES,
  DELETE_PEOPLE,
  GET_WEIXIN_INFO,
  GET_USER_INFO_BY_ID
} from '../types/people';
import { createAction } from 'redux-actions';
import {
  searchByNames,
  getChildren,
  updateMyWeixin,
  updatePeopleInfo,
  getInfoById,
  getMyRoots,
  deletePeople,
  getMyCreatedNodes
} from '../../services/people';

export const activePeople = createAction(
  ACTIVE_SEARCH_PEOPLE,
  selectedPeople => selectedPeople
);

export const showPeopleDetail = createAction(
  SHOW_PEOPLE_DETAIL,
  selectedPeople => selectedPeople
);

export const updateCurrentPeopleIndex = createAction(
  UPDATE_CURRENT_PEOPLE_INDEX,
  currentIndex => currentIndex
);

export const searchingPeople = createAction(SEARCHING_PEOPLE);

export const setSearchKeywords = createAction(
  SET_SEARCH_KEYWORDS,
  keywords => ({ keywords })
);

export const searchPeople = createAction(SEARCH_PEOPLE, names => {
  const result = searchByNames(names);
  return result;
});

export const selectSearchedPeople = createAction(
  SELECT_SEARCHED_PEOPLE,
  people => people
);

export const getChildrenByParentId = createAction(GET_CHILDREN_BY_ID, id =>
  getChildren(id)
);

export const updateWeixinInfo = createAction(UPDATE_WEIXIN, (id, wx) =>
  updateMyWeixin(id, wx)
);

export const updatePeople = createAction(UPDATE_PEOPLE, (info, id = null) =>
  updatePeopleInfo(info, id)
);

export const getUserInfoById = createAction(GET_USER_INFO_BY_ID, id =>
  getInfoById(id)
);

export const getWeixinInfo = createAction(
  GET_WEIXIN_INFO,
  userinfo => userinfo
);

export const getMyAnccestors = createAction(GET_MY_MAP, id => getMyRoots(id));
export const getMyNodes = createAction(GET_MY_NODES, id =>
  getMyCreatedNodes(id)
);

export const deleteMyPeople = createAction(DELETE_PEOPLE, id =>
  deletePeople(id)
);
