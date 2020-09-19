import {
  GET_ALL_TRANSACTIONS,
  GET_ALL_PERSONAL_TRANSACTIONS,
  TRANSACTION_ERROR,
  MAKE_TRANSACTION,
  MAKE_TRANSACTION_ERROR,
} from '../actions/types';

const initialState = {
  transaction: null,
  transactions: [],
  loading: true,
  error: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MAKE_TRANSACTION:
      return {
        ...state,
        transaction: payload,
        loading: false,
      };
    case GET_ALL_TRANSACTIONS:
    case GET_ALL_PERSONAL_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false,
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case MAKE_TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
