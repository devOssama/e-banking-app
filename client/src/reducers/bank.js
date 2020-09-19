import { GET_BANK, BANK_ERROR } from '../actions/types';

const initialState = {
  bank: null,
  loading: true,
  error: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BANK:
      return {
        ...state,
        bank: payload,
        loading: false,
      };
    case BANK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
