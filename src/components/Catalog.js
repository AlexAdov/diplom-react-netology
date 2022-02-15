import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Categories } from './Categories';
import { Products } from './Products';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchMoreProductsRequest,
  fetchMoreProductsSuccess,
  fetchMoreProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  selectCategory,
  setNoMore
} from '../actions/actionCreators';

export const fetchProducts = async (dispatch, api) => {
  try {
    dispatch(fetchProductsRequest());
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const prods = await response.json();
    dispatch(fetchProductsSuccess(prods));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchCategories = async (dispatch) => {
  try {
    dispatch(fetchCategoriesRequest());
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/categories`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const categs = await response.json();
    dispatch(fetchCategoriesSuccess(categs));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

const fetchMoreProducts = async (dispatch, api, offsetParam) => {
  try {
    dispatch(fetchMoreProductsRequest());
    const url = api + '&' + offsetParam;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const moreProds = await response.json();
    if (moreProds.length < 6) {
      dispatch(setNoMore(true));
    }
    dispatch(fetchMoreProductsSuccess(moreProds));
  } catch (error) {
    dispatch(fetchMoreProductsFailure(error.message));
  }
};

export function Catalog(props) {
  const {
    products,
    categories,
    category,
    error,
    loading,
    moreProductsError,
    moreProductsLoading,
    noMore
  } = useSelector((state) => state.Catalog);
  const { searchWord } = useSelector((state) => state.Search);
  const dispatch = useDispatch();

  const offsetParam = new URLSearchParams({ offset: products.length });
  const searchParam = new URLSearchParams({ q: searchWord });
  const categoryParam = new URLSearchParams({ categoryId: category });
  const api = `${process.env.REACT_APP_API_ENDPOINT}/items` +  '?' + searchParam +  '&' + categoryParam;

  useEffect(() => {
    fetchProducts(dispatch, api);
  }, [dispatch, api]);

  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(selectCategory(id));
    dispatch(setNoMore(false));
  };

  const loadMore = (event) => {
    event.preventDefault();
    fetchMoreProducts(dispatch, api, offsetParam);
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.children}
      {(error) ? <ErrorAlert onRetry={() => fetchProducts(dispatch, api)} /> : null}
      {(loading) ? <Loader /> : <>
        {(loading || categories.length) ? <Categories
          selected={category}
          categories={categories}
          handleSelect={handleSelect}
        /> : null}
        <Products products={products} />
        {(moreProductsLoading) ? <Loader /> : null}
        {(moreProductsError) ? <ErrorAlert onRetry={(event) => loadMore(event)} /> : null }
        {(products.length < 6 || noMore) ? null : <div className="text-center">
          <button
            className="btn btn-outline-primary"
            disabled={moreProductsLoading}
            onClick={(event) => loadMore(event)}
          >
            Загрузить ещё
          </button>
        </div>}
      </>}
    </section>
  );
}

Catalog.propTypes = {
  children: PropTypes.node
};
