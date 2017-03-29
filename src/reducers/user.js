import types from '../constants/actionTypes';

const initialUserState = {};

export function userInfo(state = initialUserState, action) {
  switch (action.type) {
    case types.USER_INFO_FETCH:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });
    default:
      return state;
  }
}
