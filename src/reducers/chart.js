import types from '../constants/actionTypes';

const initialAppState = {};

export function chart(state = initialAppState, action) {
  switch (action.type) {
    case types.CHART_APP_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });
    case types.CHART_PIT_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: true,
      });

    default:
      return state;
  }
}
