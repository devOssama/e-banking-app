import api from '../utils/api';
import { setAlert } from './alert';
import { getCurrentBank } from './bank';

import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_ERROR,
  CREDIT,
  CREDIT_ERROR,
  DEBIT,
  DEBIT_ERROR,
} from './types';

//GET current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET ALL users profile
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await api.get('/profile');
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//MAKE credit
export const credit = (formData) => async (dispatch) => {
  try {
    const res = await api.put('profile/credit', formData);
    dispatch({
      type: CREDIT,
      payload: res.data,
    });
    dispatch(setAlert('Succès du crédit!', 'success'));
    dispatch(getCurrentBank());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//MAKE debit
export const debit = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/profile/debit', formData);
    dispatch({
      type: DEBIT,
      payload: res.data,
    });
    dispatch(setAlert('Débit réussi!', 'success'));
    dispatch(getCurrentBank());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: DEBIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
