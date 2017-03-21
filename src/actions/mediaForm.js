import types from '../constants/actionTypes';
import {createActions} from '../utils/reduxHelper';
import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const mediaFormSubmit = createActions([
  types.MEDIA_FORM_SUBMIT_REQUEST,
  types.MEDIA_FORM_SUBMIT_SUCCESS,
  types.MEDIA_FORM_SUBMIT_FAILURE,
]);


function fetchList() {
  return axios.get('//rap.taobao.org/mockjsdata/15637/ssp/app/list')
    .then(response => response)
}

export function fetchMediaList() {
  return dispatch =>
    fetch(fetchList())
      .then(response => response.data)
      .then(data => dispatch(types.MEDIA_FORM_SUBMIT_SUCCESS, data))
}
