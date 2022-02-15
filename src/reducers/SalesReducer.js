import {
  FETCH_SALES_REQUEST,
  FETCH_SALES_SUCCESS,
  FETCH_SALES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  sales: [],
  error: null,
  loading: false
};

export default function SalesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SALES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SALES_SUCCESS:
      const { sales } = action.payload;
      return {
        ...state,
        sales,
        loading: false,
        error: null
      };
    case FETCH_SALES_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}
