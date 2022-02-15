import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from './Product';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';
import {
  fetchSalesRequest,
  fetchSalesSuccess,
  fetchSalesFailure
} from '../actions/actionCreators';

export const fetchSales = async (dispatch) => {
  try {
    dispatch(fetchSalesRequest());
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/top-sales`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const sals = await response.json();
    dispatch(fetchSalesSuccess(sals));
  } catch (error) {
    dispatch(fetchSalesFailure(error.message));
  }
};

export function TopSales() {
  const { sales, loading, error } = useSelector((state) => state.Sales);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSales(dispatch);
  }, [dispatch]);

  return (
    (sales.length || loading || error) ? <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(error) ? <ErrorAlert onRetry={() => fetchSales(dispatch)} /> : null}
      {(loading) ? <Loader /> : <div className="row">
        {sales.map((o) => <Product key={o.id} {...o} />)}
      </div>}
    </section> : null
  );
}
