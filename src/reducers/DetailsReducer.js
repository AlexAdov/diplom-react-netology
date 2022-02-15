import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  CHANGE_COUNTER,
  SELECT_SIZE
} from '../actions/actionTypes';

const initialState = {
  product: {},
  error: null,
  loading: false,
  counter: 1,
  sizeSelected: ''
};

export default function DetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state,
        loading: true,
        error: null,
        counter: 1,
        sizeSelected: ''
      };
    case FETCH_PRODUCT_SUCCESS:
      const { product } = action.payload;
      return {
        ...state,
        product,
        loading: false,
        error: null
      };
    case FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case CHANGE_COUNTER:
      const { counter } = action.payload;
      return { ...state, counter };
    case SELECT_SIZE:
      const { size } = action.payload;
      return { ...state, sizeSelected: size };
    default:
      return state;
  }
}
