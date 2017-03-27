import {routerMiddleware, push} from 'react-router-redux'
import axios from 'axios'
import {message} from 'antd';

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'


const url = {
  signIn: apiUrl('/1.0/user/login.action'),
  signUp: apiUrl('/public/ssp/media/register'),
  sendCode: apiUrl('/user/mail/sendActivationCode.action')
}


export function signIn(params) {
  return dispatch => {
    dispatch({
      type: types.LOGIN_REQUEST,
      payload: {}
    })

    axios.get(url.signIn, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        if (_data.success) {
          dispatch({
            type: types.LOGIN_SUCCESS,
            payload: _data
          })
        } else {
          dispatch({
            type: types.LOGIN_FAILURE,
            payload: _data
          })
        }
        return _data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(push('/page'))
        } else if (data.success === false) {
          message.error(data.msg);
        }
      })
  }

}
export function signUp(params) {
  return dispatch =>
    axios.get(url.signUp, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log(data.data)
        dispatch({
          type: types.REGISTER_SUCCESS,
          payload: data.data
        })
      })
}


export function sendCode(mail) {
  return dispatch =>
    axios.get(url.sendCode, {
      params: {
        data: mail
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log(data.data)
        dispatch({
          type: types.SEND_CODE_SUCCESS,
          payload: data.data
        })
      })
}
