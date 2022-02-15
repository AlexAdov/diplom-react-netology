import React from 'react';
import { PropTypes } from 'prop-types';
import { Product } from './Product';

export function Products(props) {
  const { products } = props;
  return (
    <div className="row">
      {(products) ? products.map((o) => <Product key={o.id} {...o} />) : null}
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.array
};
