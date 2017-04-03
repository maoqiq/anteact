import {message} from 'antd'
import {push} from 'react-router-redux'
import {Router, browserHistory} from 'react-router';


import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'
import axiosGet from '../api/axios'

const url = {
  list: apiUrl('/ssp/media/account/info'),
  edit: apiUrl('/ssp/media/modify'),
  upload: apiUrl('/ssp/image/upload')
}

export function fetchInfo(params) {
  return dispatch =>
    axiosGet(url.list)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          dispatch({
            type: types.USER_BASIC_INFO_FETCH_SUCCESS,
            payload: _data.data
          })
          dispatch({
            type: types.USER_FINANCE_FETCH_SUCCESS,
            payload: _data.data.finance
          })

          if (browserHistory.getCurrentLocation().pathname.includes('signin')) {
            dispatch(push('/page'))
          }
        }

      })
}

export function modifyInfo(params) {
  return dispatch =>
    axiosGet(url.edit, {data: params})
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
          message.success('保存成功');
        } else if (data.success === false) {
          message.error(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        message.error(error);
      });
}

// 设置表单
export function setFinanceForm(value) {
  return dispatch => {
    dispatch({
      type: types.FINANCE_FORM_SET,
      payload: value
    })
  }
}
