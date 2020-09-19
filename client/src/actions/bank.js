import api from '../utils/api';

import { GET_BANK, BANK_ERROR } from './types';

//GET banque populaire bank profile
export const getCurrentBank = () => async (dispatch) => {
  try {
    const res = await api.get('/bank/info');
    dispatch({
      type: GET_BANK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BANK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
