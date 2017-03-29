import types from '../constants/actionTypes';
import axios from 'axios'
import fetch from 'isomorphic-fetch'

import {apiUrl} from '../utils/apiHelper'


const url = {
  list: apiUrl('/ssp/app/list'),
  add: apiUrl('/ssp/app/add'),
  detail: apiUrl('/ssp/app/detail')
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
          type: types.MEDIA_LIST_FETCH_SUCCESS,
          payload: _data
        })
      })
}

export function fetchDetail(params) {
  console.log(params)
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
          type: types.MEDIA_FORM_FETCH_SUCCESS,
          payload: _data.data
        })
      })
}

export function submitForm(params) {
  console.log(params)
  return dispatch =>
    axios.get(url.add, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.MEDIA_FORM_SUBMIT_SUCCESS,
          payload: data
        })
      })
      .catch(error => {
        console.log(error);
      });
}
