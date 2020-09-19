import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_ERROR,
  CREDIT,
  DEBIT,
  CREDIT_ERROR,
  DEBIT_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case CREDIT:
    case DEBIT:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CREDIT_ERROR:
    case DEBIT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
