import {
  CHANGE_SEARCH_FIELD,
  START_SEARCH,
  OPEN_SEARCH,
  CLOSE_SEARCH
} from '../actions/actionTypes';

const initialState = {
  search: '',
  isSearchOpen: false,
  searchWord: '',
};

export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      const { search } = action.payload;
      return { ...state, search };
    case START_SEARCH:
      const { searchWord } = action.payload;
      return { ...state, searchWord };
    case OPEN_SEARCH:
      return { ...state, isSearchOpen: true };
    case CLOSE_SEARCH:
      return { ...state, isSearchOpen: false };
    default:
      return state;
  }
}
