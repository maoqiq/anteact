import types from '../constants/actionTypes';

const initialFormState = {
  isFetching: false,
  error: false
};

export function adForm(state = initialFormState, action) {
  switch (action.type) {
    case types.AD_FORM_FETCH_REQUEST:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
        error: false
      });
    case types.AD_FORM_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: false
      });
    case types.AD_FORM_FETCH_FAILURE:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: true
      });
    default:
      return state;
  }
}

const initialListState = {}

export function adList(state = initialListState, action) {
  switch (action.type) {
    case types.AD_LIST_FETCH_REQUEST:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
        error: false
      });
    case types.AD_LIST_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
        error: false
      });
    case types.AD_LIST_FETCH_FAILURE:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: true
      });
    default:
      return state;
  }
}
