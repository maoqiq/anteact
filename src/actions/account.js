import {push} from 'react-router-redux'
import axios from 'axios'
import {message} from 'antd';
import cookie from 'react-cookie';

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'
import axiosGet from '../api/axios'


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

    axiosGet(url.signIn, {data: params})
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
          cookie.save('esid', data.data.returnToken, {path: '/',})
        } else if (data.success === false) {
          message.error(data.msg);
        }
      })
  }
}

export function signUp(params) {
  return dispatch => {
    dispatch({
      type: types.REGISTER_REQUEST
    })


    axiosGet(url.signUp, {data: params})
      .then(data => {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        const _data = data
        if (_data.success) {
          dispatch({
            type: types.REGISTER_SUCCESS,
            payload: _data
          })
        } else {
          dispatch({
            type: types.REGISTER_FAILURE,
            payload: _data
          })
        }

        return _data;
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(push('/signin'))
          message.success('注册成功！')
        } else if (data.success === false) {
          message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: types.REGISTER_FAILURE,
        })
      })
  }

}


export function sendCode(params) {
  return dispatch =>
    axiosGet(url.sendCode, {data: params})
      .then(data => {
        console.log(data.data)
        dispatch({
          type: types.SEND_CODE_SUCCESS,
          payload: data.data
        })
      })
}
