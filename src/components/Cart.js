import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';
import {
  changeOrderDetails,
  sendOrderRequest,
  sendOrderSuccess,
  sendOrderFailure,
  removeFromCart
} from '../actions/actionCreators';

export function Cart(props) {
  const {
    owner: { phone, address },
    agreement,
    loading,
    error,
    success,
    items
  } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const addToLocalStorage = () => {
      localStorage.setItem('items', JSON.stringify(items));
    };
    addToLocalStorage();
  }, [items]);

  const onChangePhone = (event) => {
    dispatch(changeOrderDetails(event.target.value, address, agreement));
  };
  const onChangeAddress = (event) => {
    dispatch(changeOrderDetails(phone, event.target.value, agreement));
  };
  const onChangeAgreement = (event) => {
    dispatch(changeOrderDetails(phone, address, event.target.checked));
  };

  const orderModel = { owner: { phone, address },
    items: items.map((i) => {
      const { title, size, ...orderItem } = i;
      return orderItem;
    })
  };
 
  const sendOrder = async () => {
    try {
      dispatch(sendOrderRequest());
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderModel)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(sendOrderSuccess());
    } catch (error) {
      dispatch(sendOrderFailure(error.message));
    }
  };

  const onSubmitOrder = (event) => {
    event.preventDefault();
    sendOrder();
    localStorage.clear();
  };

  const onRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">??????????????</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">????????????????</th>
              <th scope="col">????????????</th>
              <th scope="col">??????-????</th>
              <th scope="col">??????????????????</th>
              <th scope="col">??????????</th>
              <th scope="col">????????????????</th>
            </tr>
          </thead>
          <tbody>
            {props.cartItems.map((o) => <tr key={o.id}>
              <th scope="row">1</th>
              <td><Link to={`/catalog/${o.id}`}>{o.title}</Link></td>
              <td>{o.size}</td>
              <td>{o.count}</td>
              <td>{o.price} ??????.</td>
              <td>
                {Number(o.count) * Number(o.price)} ??????.
              </td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onRemove(o.id)}
                >
                  ??????????????
                </button>
              </td>
            </tr>)}
            <tr>
              <td colSpan="5" className="text-right">?????????? ??????????????????</td>
              {(props.cartItems.length) ? <td>
                {props.cartItems.map((o) => Number(o.count) * Number(o.price))
                  .reduce((total, o) => total + o)} ??????
              </td> : null}
            </tr>
          </tbody>
        </table>
      </section>
      {(success) ? <div className="alert alert-success">
        <p>?????? ?????????? ?????????????? ????????????????!</p>
      </div> : <section className="order">
        <h2 className="text-center">???????????????? ??????????</h2>
        {(loading) ? <Loader /> :
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          {(error) ? <ErrorAlert onRetry={(event) => onSubmitOrder(event)} /> : null }
          <form className="card-body" onSubmit={(event) => onSubmitOrder(event)}>
            <div className="form-group">
              <label htmlFor="phone">??????????????</label>
              <input
                className="form-control"
                name="phone"
                id="phone"
                placeholder="?????? ??????????????"
                value={phone}
                onChange={(event) => onChangePhone(event)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">?????????? ????????????????</label>
              <input
                className="form-control"
                name="address"
                id="address"
                placeholder="?????????? ????????????????"
                value={address}
                onChange={(event) => onChangeAddress(event)}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                onChange={(event) => onChangeAgreement(event)}
                checked={agreement}
              />
              <label className="form-check-label" htmlFor="agreement">???????????????? ?? ?????????????????? ????????????????</label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={!agreement}
            >
              ????????????????
            </button>
          </form>
        </div>}
      </section>}
    </>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.Cart.items
});
export const ConnectedCart = connect(mapStateToProps, {})(Cart);
Cart.propTypes = {
  cartItems: PropTypes.array
};
