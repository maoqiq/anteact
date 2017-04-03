import types from '../constants/actionTypes';

// 登陆
const initialLoginState = {
  account: '',
  password: '',
  isFetching: false,
  error: false
};

export function login(state = initialLoginState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: false
      })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: true
      })
    default:
      return state;
  }
}

// 注册
const initialRegisterState = {
  mail: '',
  code: '',
  password: '',
  companyName: '',
  registerCode: '',
  name: '',
  contactTel: '',
  isFetching: false,
  error: false
}

export function register(state = initialRegisterState, action) {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    case types.REGISTER_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: false
      });
    case types.REGISTER_FAILURE:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: true
      });
    default:
      return state;
  }
}

// 忘记密码
const initialForgetState = {
  mail: '',
  code: '',
  password: '',
  isFetching: false,
  error: false
}

export function forget(state = initialForgetState, action) {
  switch (action.type) {
    case types.FORGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    case types.FORGET_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: false
      });
    case types.FORGET_FAILURE:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: true
      });
    default:
      return state;
  }
}

// 发送验证码
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

