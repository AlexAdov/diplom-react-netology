import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_MORE_PRODUCTS_REQUEST,
  FETCH_MORE_PRODUCTS_SUCCESS,
  FETCH_MORE_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_SALES_REQUEST,
  FETCH_SALES_SUCCESS,
  FETCH_SALES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CHANGE_SEARCH_FIELD,
  SELECT_CATEGORY,
  CHANGE_ORDER_DETAILS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  OPEN_SEARCH,
  CLOSE_SEARCH,
  CHANGE_COUNTER,
  SELECT_SIZE,
  START_SEARCH,
  SET_NO_MORE
} from './actionTypes';

export function fetchProductsRequest() {
  return { type: FETCH_PRODUCTS_REQUEST };
}
export function fetchProductsSuccess(products) {
  return { type: FETCH_PRODUCTS_SUCCESS, payload: { products } };
}
export function fetchProductsFailure(error) {
  return { type: FETCH_PRODUCTS_FAILURE, payload: { error } };
}

export function fetchMoreProductsRequest() {
  return { type: FETCH_MORE_PRODUCTS_REQUEST };
}
export function fetchMoreProductsSuccess(moreProducts) {
  return { type: FETCH_MORE_PRODUCTS_SUCCESS, payload: { moreProducts } };
}
export function fetchMoreProductsFailure(error) {
  return { type: FETCH_MORE_PRODUCTS_FAILURE, payload: { error } };
}
export function setNoMore(noMore) {
  return { type: SET_NO_MORE, payload: { noMore } };
}

export function fetchSalesRequest() {
  return { type: FETCH_SALES_REQUEST };
}
export function fetchSalesSuccess(sales) {
  return { type: FETCH_SALES_SUCCESS, payload: { sales } };
}
export function fetchSalesFailure(error) {
  return { type: FETCH_SALES_FAILURE, payload: { error } };
}

export function fetchProductRequest() {
  return { type: FETCH_PRODUCT_REQUEST };
}
export function fetchProductSuccess(product) {
  return { type: FETCH_PRODUCT_SUCCESS, payload: { product } };
}
export function fetchProductFailure(error) {
  return { type: FETCH_PRODUCT_FAILURE, payload: { error } };
}

export function fetchCategoriesRequest() {
  return { type: FETCH_CATEGORIES_REQUEST };
}
export function fetchCategoriesSuccess(categories) {
  return { type: FETCH_CATEGORIES_SUCCESS, payload: { categories } };
}
export function fetchCategoriesFailure(error) {
  return { type: FETCH_CATEGORIES_FAILURE, payload: { error } };
}

export function selectCategory(category) {
  return { type: SELECT_CATEGORY, payload: { category } };
}

export function changeSearchField(search) {
  return { type: CHANGE_SEARCH_FIELD, payload: { search } };
}

export function changeOrderDetails(phone, address, agreement) {
  return { type: CHANGE_ORDER_DETAILS, payload: { phone, address, agreement } };
}

export function sendOrderRequest() {
  return { type: SEND_ORDER_REQUEST };
}
export function sendOrderSuccess() {
  return { type: SEND_ORDER_SUCCESS };
}
export function sendOrderFailure(error) {
  return { type: SEND_ORDER_FAILURE, payload: { error } };
}

export function addToCart(item) {
  return { type: ADD_TO_CART, payload: { item } };
}
export function removeFromCart(id) {
  return { type: REMOVE_FROM_CART, payload: { id } };
}

export function openSearch() {
  return { type: OPEN_SEARCH };
}
export function closeSearch() {
  return { type: CLOSE_SEARCH };
}
export function startSearch(searchWord) {
  return { type: START_SEARCH, payload: { searchWord } };
}
export function changeCounter(counter) {
  return { type: CHANGE_COUNTER, payload: { counter } };
}
export function selectSize(size) {
  return { type: SELECT_SIZE, payload: { size } };
}
