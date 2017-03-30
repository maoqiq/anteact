import types from '../constants/actionTypes';


const initialListState = {
  list: [],
  isFetching: false,
  error: false
}

export function mediaList(state = initialListState, action) {
  switch (action.type) {
    case types.MEDIA_LIST_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
      });
    case types.DELETE_ITEM:
      console.log(state, action.payload)
      const _list = state.list.filter(item => item.id !== action.payload.id);
      return Object.assign({}, state, {list: _list});
      break
    default:
      return state;
  }
}


const initialFormState = {
  isFetching: false,
  error: false
};

export function mediaForm(state = initialFormState, action) {
  switch (action.type) {
    case types.MEDIA_FORM_SUBMIT_SUCCESS:
    case types.MEDIA_FORM_UPDATE_SUCCESS:
    case types.MEDIA_FORM_FETCH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        error: false
      });
      break
    case types.MEDIA_FORM_SET:
      return Object.assign({}, state, action.payload);
      break
    case types.CLEAR_ALL:
      return {}
      break

    default:
      return state;
  }
}


