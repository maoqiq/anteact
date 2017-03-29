import {push} from 'react-router-redux'
import {message} from 'antd'
import axios from 'axios'

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'

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

export function deleteItem(params, index, list) {
  return dispatch =>
    axios.get(url.delete, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        fetchList({page: 1, pageSize: 20})
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
        console.log(_data)
        if (_data.success) {
          dispatch({
            type: types.AD_FORM_SUBMIT_SUCCESS,
          })
        } else {
          dispatch({
            type: types.AD_FORM_SUBMIT_FAILURE,
          })
        }
        return _data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success('新建成功')
          dispatch(push('/page/ad'))
        } else {
          message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error);
      });
}

// 更新广告位
export function updateForm(params) {
  console.log(params)

  return dispatch =>
    axios.get(url.update, {
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
            type: types.AD_FORM_UPDATE_SUCCESS,
            payload: _data
          })
        } else {
          dispatch({
            type: types.AD_FORM_UPDATE_FAILURE,
          })
        }
        return _data
      })
      .then(data => {
        if (data.success) {
          message.success('更新成功')
          dispatch(push('/page/ad'))
        } else {
          message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error);
        message.error(data.msg)
      });
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
            type: types.AD_FORM_SET,
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
            type: types.AD_FORM_SET,
            payload: {status: 0}
          })
        }
      })
  }
}


// 广告规格
export function fetchSpecList() {
  return dispatch =>
    axios.get(url.specList)
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        dispatch({
          type: types.SPEC_LIST_FETCH_SUCCESS,
          payload: _data
        })
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}
