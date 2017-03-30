import types from '../constants/actionTypes';

const initialUserState = {};

export function userInfo(state = initialUserState, action) {
  switch (action.type) {
    case types.USER_BASIC_INFO_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });
    case types.USER_FORM_SET:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

const initialFinanceState = {};


export function financeInfo(state = initialFinanceState, action) {
  switch (action.type) {
    case types.USER_FINANCE_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });
    case types.FINANCE_FORM_SET:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
