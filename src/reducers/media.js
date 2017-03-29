import types from '../constants/actionTypes';

const initialFormState = {
  appName: '',
  platform: '',
  appKeyWords: '',
  appPackage: '',
  description: '',
  downloadUrl: ''
};

export function mediaForm(state = initialFormState, action) {
  switch (action.type) {
    case types.MEDIA_FORM_SUBMIT_SUCCESS:
    case types.MEDIA_FORM_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    default:
      return state;
  }
}

const initialListState = {}

export function mediaList(state = initialListState, action) {
  switch (action.type) {
    case types.MEDIA_LIST_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    default:
      return state;
  }
}
