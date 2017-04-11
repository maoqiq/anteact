import {push} from 'react-router-redux'
import {message} from 'antd'

import types from '../constants/actionTypes';

import {apiUrl} from '../utils/apiHelper'
import {axiosGet} from '../api/axios'

const url = {
  list: apiUrl('/ssp/app/list'),
  add: apiUrl('/ssp/app/add'),
  detail: apiUrl('/ssp/app/detail'),
  update: apiUrl('/ssp/app/update'),
  delete: apiUrl('/ssp/app/delete'),
  enable: apiUrl('/ssp/app/enable'),
  disable: apiUrl('/ssp/app/disable'),
}

export function fetchList(params) {
  return dispatch =>
    axiosGet(url.list, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.MEDIA_LIST_FETCH_SUCCESS,
            payload: data.data
          })
        }
      })
}

export function fetchDetail(params) {
  return dispatch =>
    axiosGet(url.detail, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.MEDIA_FORM_FETCH_SUCCESS,
            payload: data.data
          })
        }
      })
}

export function submitForm(params) {
  return dispatch =>
    axiosGet(url.add, {data: params})
      .then(data => {
        if (data.success) {
          dispatch({
            type: types.MEDIA_FORM_SUBMIT_SUCCESS,
          })
        }
        return data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('新建成功')
          dispatch(push('/page/media'))
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function updateForm(params) {
  return dispatch =>
    axiosGet(url.update, {data: params})
      .then(data => {
        if (data.success) {
          dispatch({
            type: types.MEDIA_FORM_UPDATE_SUCCESS,
            payload: data
          })
        }
        return data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('更新成功')
          dispatch(push('/page/media'))
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function deleteItem(params) {
  return dispatch => {
    axiosGet(url.delete, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.DELETE_MEDIA_ITEM,
            payload: params
          })
        }
        return data
      })
      .then(data => {
        if (data.success) {
          message.success('删除成功')
        }
      })
  }
}

export function setForm() {
  return dispatch => {
    dispatch({
      type: types.MEDIA_FORM_SET,
      payload: {}
    })
  }
}

export function enableStatus(params) {
  return dispatch => {
    axiosGet(url.enable, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('更新成功')
          dispatch({
            type: types.MEDIA_LIST_SET,
            payload: {status: 1, index: params.index, id: params.id}
          })
        }
      })
  }
}
export function disableStatus(params) {
  return dispatch => {
    axiosGet(url.disable, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('更新成功')
          dispatch({
            type: types.MEDIA_LIST_SET,
            payload: {status: 0, index: params.index, id: params.id}
          })
        }
      })
  }
}

