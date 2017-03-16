import types from '../constants/actionTypes';

const initialState = {
  account: '',
  password: '',
  isFetching: false,
  error: false,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
      });
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
      });
    default:
      return state;
  }
}
