import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bank from './bank';
import profile from './profile';
import transaction from './transaction';

export default combineReducers({
  alert,
  auth,
  bank,
  profile,
  transaction,
});
