import api from '../utils/api';
import { setAlert } from './alert';
import { getCurrentProfile } from './profile';

import {
  GET_ALL_TRANSACTIONS,
  GET_ALL_PERSONAL_TRANSACTIONS,
  TRANSACTION_ERROR,
  MAKE_TRANSACTION,
  MAKE_TRANSACTION_ERROR,
} from './types';

//GET ALL users Transactions
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

//GET ALL own user Transactions
export const getAllPersonalTransactions = () => async (dispatch) => {
  try {
    const res = await api.get('/transaction/personal');
    dispatch({
      type: GET_ALL_PERSONAL_TRANSACTIONS,
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
    dispatch(setAlert('Transfert est succès  !', 'success'));
    dispatch(getCurrentProfile());
    dispatch(getAllPersonalTransactions());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: MAKE_TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
