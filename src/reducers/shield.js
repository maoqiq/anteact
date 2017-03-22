import types from '../constants/actionTypes';

const initialFormState = {
  title: '',
  shieldIndustryIds: [],
  shieldUrls: [],
};

export function shieldForm(state = initialFormState, action) {
  switch (action.type) {
    case types.SHIELD_FORM_SUBMIT:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });
    default:
      return state;
  }
}

const initialListState = {}

export function shieldList(state = initialListState, action) {
  switch (action.type) {
    case types.SHIELD_LIST_FETCH:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    default:
      return state;
  }
}
