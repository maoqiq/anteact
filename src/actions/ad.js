import {push} from 'react-router-redux'
import {message} from 'antd'

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'
import {axiosGet} from '../api/axios'

const url = {
  list: apiUrl('/ssp/app/pit/list'),
  add: apiUrl('/ssp/app/pit/create'),
  detail: apiUrl('/ssp/app/pit/detail'),
  update: apiUrl('/ssp/app/pit/update'),
  delete: apiUrl('/ssp/app/pit/delete'),

  enable: apiUrl('/ssp/app/pit/enable'),
  disable: apiUrl('/ssp/app/pit/disable'),
  specList: apiUrl('/ssp/media/spec/list'),

}

export function fetchList(params) {
  return dispatch =>
    axiosGet(url.list, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.AD_LIST_FETCH_SUCCESS,
            payload: data.data
          })
        }
      })
}

export function deleteItem(params) {
  return dispatch => {
    axiosGet(url.delete, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.DELETE_AD_ITEM,
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

// 编辑广告位
export function fetchDetail(params) {
  return dispatch =>
    axiosGet(url.detail, {data: params})
      .then(data => {
        console.log(data)
        dispatch({
          type: types.AD_FORM_FETCH_SUCCESS,
          payload: data.data
        })
      })
}

// 新建广告位
export function submitForm(params) {
  return dispatch =>
    axiosGet(url.add, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.AD_FORM_SUBMIT_SUCCESS,
          })
        } else {
          dispatch({
            type: types.AD_FORM_SUBMIT_FAILURE,
          })
        }
        return data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('新建成功')
          dispatch(push('/page/ad'))
        }
      })
      .catch(error => {
        console.log(error);
      });
}

// 更新广告位
export function updateForm(params) {
  return dispatch =>
    axiosGet(url.update, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch({
            type: types.AD_FORM_UPDATE_SUCCESS,
            payload: data
          })
        } else {
          dispatch({
            type: types.AD_FORM_UPDATE_FAILURE,
          })
        }
        return data
      })
      .then(data => {
        if (data.success) {
          message.success('更新成功')
          dispatch(push('/page/ad'))
        }
      })
      .catch(error => {
        console.log(error);
      });
}


export function enableStatus(params) {
  console.log(params)

  return dispatch => {
    axiosGet(url.enable, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('更新成功')
          dispatch({
            type: types.AD_LIST_SET,
            payload: {status: 1, index: params.index, id: params.id}
          })
        }
      })
  }
}
// 禁用
export function disableStatus(params) {
  console.log(params)
  return dispatch => {
    axiosGet(url.disable, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('更新成功')
          dispatch({
            type: types.AD_LIST_SET,
            payload: {status: 0, index: params.index, id: params.id}
          })
        }
      })
  }
}

// 广告规格
export function fetchSpecList() {
  return dispatch =>
    axiosGet(url.specList)
      .then(data => {
        console.log(data)
        dispatch({
          type: types.SPEC_LIST_FETCH_SUCCESS,
          payload: data
        })
      })
      .catch(error => {
        console.log(error);
      });
}
