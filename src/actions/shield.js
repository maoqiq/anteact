import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  list: apiUrl('/ssp/shield/strategy/list'),
  add: apiUrl('/ssp/shield/strategy/create'),
  detail: apiUrl('/ssp/shield/strategy/detail'),
  update: apiUrl('/ssp/shield/strategy/update'),
  industryList: apiUrl('/public/tag/industry/get')
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
  console.log(formValues)
  return dispatch =>
    axios.get(url.add, {
      params: {
        data: formValues
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        dispatch({
          type: types.SHIELD_FORM_SUBMIT,
          payload: _data
        })
      })
      .catch(error => {
        console.log(error);
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
        dispatch({
          type: types.SHIELD_FORM_UPDATE_SUCCESS,
          payload: _data.data
        })
      })
      .catch(error => {
        console.log(error);
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
      });
}
