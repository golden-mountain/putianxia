import {
  ACTIVE_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SELECT_SEARCHED_PEOPLE,
  SET_SEARCH_KEYWORDS,
  SEARCHING_PEOPLE
} from '../types/people';
import { createAction } from 'redux-actions';
import { searchByNames } from '../../services/people';

export const activePeople = createAction(
  ACTIVE_SEARCH_PEOPLE,
  selectedPeople => selectedPeople
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
