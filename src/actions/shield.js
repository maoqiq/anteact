import {message} from 'antd'
import {push} from 'react-router-redux'
import axios from 'axios'

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'

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
    axios.get(url.list, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data);
        console.log(_data);
        dispatch({
          type: types.SHIELD_LIST_FETCH,
          payload: _data
        })
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}

export function deleteShield(params) {
  return dispatch =>
    axios.get(url.delete, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data);
        console.log(_data);
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      })
}

// 屏蔽策略详情
export function fetchDetail(params) {
  return dispatch =>
    axios.get(url.detail, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
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
export function submitForm(formValues) {
  return dispatch =>
    axios.get(url.add, {
      params: {
        data: formValues
      }
    })
      .then(response => response.data)
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
export function updateForm(formValues) {
  console.log(formValues)
  return dispatch =>
    axios.get(url.update, {
      params: {
        data: formValues
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          dispatch({
            type: types.SHIELD_FORM_UPDATE_SUCCESS,
            payload: _data
          })
        } else {
          dispatch({
            type: types.SHIELD_FORM_UPDATE_FAILURE,
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

// 设置屏蔽策略表单
export function setForm(value) {
  return dispatch => {
    dispatch({
      type: types.SHIELD_FORM_SET,
      payload: value
    })
  }
}


export function fetchIndustryList(formValues) {
  return dispatch =>
    axios.get(url.industryList)
      .then(response => response.data)
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
