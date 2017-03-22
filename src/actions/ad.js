import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  list: apiUrl('/ssp/app/pit/list'),
  add: apiUrl('/ssp/app/pit/add')
}

export function fetchList(params) {
  return dispatch =>
    axios.get(url.list, {
      params: params
    })
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.AD_LIST_FETCH,
          payload: data
        })
      })
}

export function submitForm(formValues) {
  console.log(formValues)
  return dispatch =>
    axios.post(url.add, formValues)
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.AD_FORM_SUBMIT,
          payload: data
        })
      })
      .catch(error => {
        console.log(error);
      });
}
