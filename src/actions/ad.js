import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  list: apiUrl('/ssp/app/pit/list'),
  add: apiUrl('/ssp/app/pit/add'),
  detail: apiUrl('/ssp/app/pit/detail'),
  update: apiUrl('/ssp/app/pit/update')
}

export function fetchList(params) {
  return dispatch =>
    axios.get(url.list, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        dispatch({
          type: types.AD_LIST_FETCH_SUCCESS,
          payload: _data
        })
      })
}

// 编辑广告位
export function fetchDetail(params) {
  return dispatch =>
    axios.get(url.detail, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        dispatch({
          type: types.AD_FORM_FETCH_SUCCESS,
          payload: _data.data
        })
      })
}

// 新建广告位
export function submitForm(formValues) {
  console.log(formValues)
  return dispatch =>
    axios.post(url.add, formValues)
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.AD_FORM_SUBMIT_SUCCESS,
          payload: data
        })
      })
      .catch(error => {
        console.log(error);
      });
}

// 更新广告位
export function updateForm(formValues) {
  return dispatch =>
    axios.post(url.add, formValues)
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.AD_FORM_UPDATE_SUCCESS,
          payload: data
        })
      })
      .catch(error => {
        console.log(error);
      });
}
