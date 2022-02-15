import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SELECT_CATEGORY,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_MORE_PRODUCTS_REQUEST,
  FETCH_MORE_PRODUCTS_SUCCESS,
  FETCH_MORE_PRODUCTS_FAILURE,
  SET_NO_MORE
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  categoriesError: null,
  products: [],
  category: 0,
  error: null,
  loading: false,
  noMore: false,
  moreProductsError: null,
  moreProductsLoading: false
};

export default function CatalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, categoriesError: null };
    case FETCH_CATEGORIES_SUCCESS:
      const { categories } = action.payload;
      return { ...state, categories, categoriesError: null };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, categoriesError: action.payload.error };
    case SELECT_CATEGORY:
      const { category } = action.payload;
      return { ...state, category, error:null };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, products:[], loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      const { products } = action.payload;
      return {
        ...state,
        products,
        loading: false,
        error: null
      };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case FETCH_MORE_PRODUCTS_REQUEST:
      return { ...state, moreProductsLoading: true, moreProductsError: null };
    case FETCH_MORE_PRODUCTS_SUCCESS:
      const { moreProducts } = action.payload;
      return {
        ...state,
        products: [...state.products, ...moreProducts],
        moreProductsLoading: false,
        moreProductsError: null
      };
    case FETCH_MORE_PRODUCTS_FAILURE:
      return { ...state, moreProductsLoading: false, moreProductsError: action.payload.error };
    case SET_NO_MORE:
      const { noMore } = action.payload;
      return { ...state, noMore };
    default:
      return state;
  }
}
