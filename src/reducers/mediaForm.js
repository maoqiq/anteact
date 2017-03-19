import types from '../constants/actionTypes';

const initialState = {
  appName: '',
  platform: '',
  appKeyWords: '',
  appPackage: '',
  description: '',
  downloadUrl: ''
};

export default function mediaForm(state = initialState, action) {
  switch (action.type) {
    case types.MEDIA_FORM_SUBMIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.MEDIA_FORM_SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
      });
    case types.MEDIA_FORM_SUBMIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
      });
    default:
      return state;
  }
}
