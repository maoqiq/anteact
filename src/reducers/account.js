import types from '../constants/actionTypes';

const initialState = {
  account: '',
  password: '',
};

export function login(state = initialState, action) {
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


const initialCodeState = {
  code: ''
}

export function code(state = initialCodeState, action) {
  switch (action.type) {
    case types.SEND_CODE_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}

const initialRegisterState = {
  mail: '',
  code: '',
  password: '',
  companyName: '',
  registerCode: '',
  name: '',
  contactTel: ''
}

export function register(state = initialRegisterState, action) {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
