import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  list: apiUrl('/ssp/app/list'),
  add: apiUrl('/ssp/app/add')
}

export function fetchList(params) {
  return dispatch =>
    axios.get(url.list, {
      params: {
        data: params
      },
    })
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.MEDIA_LIST_FETCH,
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
          type: types.MEDIA_FORM_SUBMIT,
          payload: data
        })
      })
      .catch(error => {
        console.log(error);
      });
}
