import types from '../constants/actionTypes';

const initialFormState = {
  appName: '',
  platform: '',
  appKeyWords: '',
  appPackage: '',
  description: '',
  downloadUrl: ''
};

export function adForm(state = initialFormState, action) {
  switch (action.type) {
    case types.AD_FORM_SUBMIT:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });
    default:
      return state;
  }
}

const initialListState = {}

export function adList(state = initialListState, action) {
  switch (action.type) {
    case types.AD_LIST_FETCH:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    default:
      return state;
  }
}
