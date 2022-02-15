import {
  CHANGE_ORDER_DETAILS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../actions/actionTypes';

const initialState = {
  owner: {
    phone: '',
    address: '',
  },
  agreement: false,
  items: (localStorage.getItem('items')) ? [...JSON.parse(localStorage.getItem('items'))] : [],
  loading: false,
  error: null,
  success: false
};

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ORDER_DETAILS:
      const { phone, address, agreement } = action.payload;
      return { ...state, owner: { ...state.owner, phone, address }, agreement };
    case SEND_ORDER_REQUEST:
      return { ...state, loading: true };
    case SEND_ORDER_SUCCESS:
      return { ...initialState, items: [], success: true };
    case SEND_ORDER_FAILURE:
      const { error } = action.payload;
      return { ...state, error, loading: false };
    case ADD_TO_CART:
      const { item } = action.payload;
      return {
        ...state,
        items:
        (state.items.find((o) => (o.id === item.id && o.size === item.size))) ?
          [...state.items.map((o) => (o.id === item.id) ? {...o, count:o.count + item.count} : o)] :
          [...state.items, item],
        success: false
      };
    case REMOVE_FROM_CART:
      const { id } = action.payload;
      return { ...state, items: [...state.items.filter((o) => o.id !== id)] };
    default:
      return state;
  }
}
