import {message} from 'antd'
import {push} from 'react-router-redux'

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'
import axiosGet from '../api/axios'

const url = {
  list: apiUrl('/ssp/shield/strategy/list'),
  add: apiUrl('/ssp/shield/strategy/create'),
  detail: apiUrl('/ssp/shield/strategy/detail'),
  update: apiUrl('/ssp/shield/strategy/update'),
  industryList: apiUrl('/public/tag/industry/get'),
  delete: apiUrl('/ssp/shield/strategy/delete')
}

export function fetchList(params) {
  return dispatch =>
    axiosGet(url.list, {data: params})
      .then(data => {
        const _data = JSON.parse(data);
        console.log(_data);
        if (_data.success) {
          dispatch({
            type: types.SHIELD_LIST_FETCH,
            payload: _data.data
          })
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}

export function deleteItem(params) {
  return dispatch => {
    axiosGet(url.delete, {data: params})
      .then(data => {
        const _data = JSON.parse(data);
        console.log(_data);
        if (_data.success) {
          dispatch({
            type: types.DELETE_SHIELD_ITEM,
            payload: params
          })
        }
        return _data
      })
      .then(data => {
        if (data.success) {
          message.success('删除成功')
        } else {
          message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      })
  }

}

// 屏蔽策略详情
export function fetchDetail(params) {
  return dispatch =>
    axiosGet(url.detail, {data: params})
      .then(data => {
        const _data = JSON.parse(data);
        console.log(_data);
        dispatch({
          type: types.SHIELD_FORM_FETCH_SUCCESS,
          payload: _data.data
        })
      })
}

// 提交屏蔽策略
export function submitForm(params) {
  return dispatch =>
    axiosGet(url.add, {data: params})
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          dispatch({
            type: types.SHIELD_FORM_SUBMIT_SUCCESS,
            payload: _data
          })
        } else {
          dispatch({
            type: types.SHIELD_FORM_SUBMIT_FAILURE,
            payload: _data
          })
        }
        return _data
      })
      .then(data => {
        if (data.success) {
          dispatch(push('/page/shield'))
        } else if (data.success === false) {
          message.error(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}

// 更新屏蔽策略
export function updateForm(params) {
  return dispatch =>
    axiosGet(url.update, {data: params})
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          dispatch({
            type: types.SHIELD_FORM_UPDATE_SUCCESS,
          })
        } else {
          dispatch({
            type: types.SHIELD_FORM_UPDATE_FAILURE,
          })
        }

        return _data
      })
      .then(data => {
        if (data.success) {
          dispatch(push('/page/shield'))
        } else if (data.success === false) {
          message.error(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}

// 设置屏蔽策略表单
export function setForm(value) {
  console.log(value)
  return dispatch => {
    dispatch({
      type: types.SHIELD_FORM_SET,
      payload: value
    })
  }
}

export function fetchIndustryList() {
  return dispatch =>
    axiosGet(url.industryList)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        dispatch({
          type: types.INDUSTRY_LIST_FETCH_SUCCESS,
          payload: _data
        })
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}
