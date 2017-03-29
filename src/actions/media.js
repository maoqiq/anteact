import {push} from 'react-router-redux'
import {message} from 'antd'
import axios from 'axios'

import types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch'

import {apiUrl} from '../utils/apiHelper'


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
        if (_data.success) {
          dispatch({
            type: types.MEDIA_FORM_FETCH_SUCCESS,
            payload: _data.data
          })
        }
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
        const _data = JSON.parse(data)

        if (_data.success) {
          dispatch({
            type: types.MEDIA_FORM_SUBMIT_SUCCESS,
          })
        }
        return _data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('新建成功')
          dispatch(push('/page/media'))
        } else {
          message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function updateForm(params) {
  return dispatch =>
    axios.get(url.update, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        if (_data.success) {
          dispatch({
            type: types.MEDIA_FORM_UPDATE_SUCCESS,
            payload: _data
          })
        }

        return _data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('更新成功')
          dispatch(push('/page/media'))
        } else {
          message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error);
      });
}

export function deleteItem(params) {
  return dispatch => {
    // axios.get(url.delete, {
    //   params: {
    //     data: params
    //   }
    // })
    //   .then(response => response.data)
    //   .then(data => {
    //     const _data = JSON.parse(data)
    //     console.log(params)
    //     if (_data.success) {
    //
    //     }
    //   })
    console.log(params)
    dispatch({
      type: types.DELETE_ITEM,
      payload: params
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
    axios.get(url.enable, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          message.success('更新成功')
          dispatch({
            type: types.MEDIA_FORM_SET,
            payload: {status: 1}
          })
        }
      })
  }
}
export function disableStatus(params) {
  return dispatch => {
    axios.get(url.disable, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          message.success('更新成功')
          dispatch({
            type: types.MEDIA_FORM_SET,
            payload: {status: 0}
          })
        }
      })
  }
}

