import types from '../constants/actionTypes';
import axios from 'axios'

const url = {
  list: '//rap.taobao.org/mockjsdata/15637/ssp/app/list',
  add: '//rap.taobao.org/mockjsdata/15637/ssp/app/add'
}

export function fetchList(params) {
  return dispatch =>
    axios.get(url.list, {
      params: params,

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
