import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';
import placeholder from '../img/placeholder.jpg';
import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  addToCart,
  changeCounter,
  selectSize
} from '../actions/actionCreators';

export const fetchProduct = async (id, dispatch) => {
  try {
    dispatch(fetchProductRequest());
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/items/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const prod = await response.json();
    dispatch(fetchProductSuccess(prod));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};

export function ProductPage() {
  const history = useHistory();
  const { id } = useParams();
  const {
    product,
    error,
    loading,
    counter,
    sizeSelected
  } = useSelector((state) => state.Details);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct(id, dispatch);
  }, [id, dispatch]);

  const counterUp = () => {
    if (counter < 10) {
      dispatch(changeCounter(counter + 1));
    } else {
      dispatch(changeCounter(10));
    }
  };

  const counterDown = () => {
    if (counter > 1) {
      dispatch(changeCounter(counter - 1));
    } else {
      dispatch(changeCounter(1));
    }
  };

  const onSelectSize = (size) => {
    dispatch(selectSize(size));
  };

  const item = {
    id: product.id,
    title: product.title,
    size: sizeSelected,
    count: counter,
    price: product.price
  };
console.log(product)
  const goToCart = () => {
    dispatch(addToCart(item));
    history.push('/cart');
  };

  const onImageError = (event) => {
    if (event.target.src !== placeholder) {
      event.target.src = placeholder;
    }
  };

  return (
    (error) ? <ErrorAlert onRetry={() => fetchProduct(id, dispatch)} /> :
      <section className="catalog-item">
        {(loading) ? <Loader /> : <>
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={product.images ? product.images[0] : ''}
                className="img-fluid"
                alt={product.title}
                onError={(event) => onImageError(event)}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{product.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{product.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{product.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{product.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{product.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии: {(product.sizes) ? product.sizes.map((o) => o.avalible ? <span
                    className={(sizeSelected === o.size) ? "catalog-item-size selected":"catalog-item-size"}
                    onClick={() => onSelectSize(o.size)}
                  >
                    {o.size}
                  </span> : null) : null}
                </p>
                {product.sizes && (product.sizes.map((o)=> o.availible ? o : null)) ? <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      onClick={counterDown}
                      disabled={counter === 1}
                      className="btn btn-secondary"
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{counter}</span>
                    <button
                      onClick={counterUp}
                      disabled={counter === 10}
                      className="btn btn-secondary"
                    >
                      +
                    </button>
                  </span>
                </p> : null}
              </div>
              {product.sizes && (product.sizes.map((o)=> o.availible ? o : null)) ?
              <button
                onClick={goToCart}
                disabled={sizeSelected === ''}
                className="btn btn-danger btn-block btn-lg"
              >
                В корзину
              </button> : null}
            </div>
          </div>
        </>}
      </section>
  );
}
