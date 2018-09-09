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
  GET_WEIXIN_INFO
} from '../types/people';
import { createAction } from 'redux-actions';
import {
  searchByNames,
  getChildren,
  updateMyWeixin
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

export const getWeixinInfo = createAction(
  GET_WEIXIN_INFO,
  userinfo => userinfo
);
