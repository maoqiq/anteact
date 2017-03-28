import types from '../constants/actionTypes';

const initialFormState = {
  isFetching: false,
  error: false
};

export function shieldForm(state = initialFormState, action) {
  switch (action.type) {
    case types.SHIELD_FORM_FETCH_SUCCESS:
    case types.SHIELD_FORM_UPDATE_SUCCESS:
    case types.SHIELD_FORM_SET:
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
const initialIndustryState = {}

export function industryList(state = initialIndustryState, action) {
  switch (action.type) {
    case types.INDUSTRY_LIST_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    default:
      return state;
  }
}
