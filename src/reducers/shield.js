import types from '../constants/actionTypes';

const initialFormState = {
  isFetching: false,
  error: false
};

export function shieldForm(state = initialFormState, action) {
  switch (action.type) {
    case types.SHIELD_FORM_FETCH_SUCCESS:
    case types.SHIELD_FORM_UPDATE_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    case types.SHIELD_FORM_SUBMIT_SUCCESS:
      return {};
      break
    case types.SHIELD_FORM_SET:
      return Object.assign({}, state, action.payload);
    case types.CLEAR_SHIELD_FORM:
      return Object.assign({});
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
    case types.DELETE_SHIELD_ITEM:
      const _list = state.list.filter(item => item.id !== action.payload.id);
      return Object.assign({}, state, {list: _list});
    default:
      return state;
  }
}

const initialIndustryState = {
  data: []
}

export function industryList(state = initialIndustryState, action) {
  switch (action.type) {
    case types.INDUSTRY_LIST_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
