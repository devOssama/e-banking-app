import api from '../utils/api';

import {
  GET_ALL_TRANSACTIONS,
  TRANSACTION_ERROR,
  MAKE_TRANSACTION,
  MAKE_TRANSACTION_ERROR,
} from './types';

//GET ALL users profile
export const getAllTransactions = () => async (dispatch) => {
  try {
    const res = await api.get('/transaction');
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//MAKE transaction
export const makeTransaction = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/transaction', formData);
    dispatch({
      type: MAKE_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKE_TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
