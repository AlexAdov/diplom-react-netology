import { createStore, combineReducers } from 'redux';
import CatalogReducer from '../reducers/CatalogReducer';
import SalesReducer from '../reducers/SalesReducer';
import DetailsReducer from '../reducers/DetailsReducer';
import SearchReducer from '../reducers/SearchReducer';
import CartReducer from '../reducers/CartReducer';

const reducer = combineReducers({
  Catalog: CatalogReducer,
  Sales: SalesReducer,
  Details: DetailsReducer,
  Search: SearchReducer,
  Cart: CartReducer
});

const store = createStore(reducer);

export default store;
