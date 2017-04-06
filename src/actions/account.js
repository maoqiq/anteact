import {push} from 'react-router-redux'
import {message} from 'antd';
import cookie from 'react-cookie';

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'
import {axiosGet} from '../api/axios'


const url = {
  signIn: apiUrl('/1.0/user/login.action'),
  signUp: apiUrl('/public/ssp/media/register'),
  forget: apiUrl('/user/mail/changePassword.action'),
  sendCode: apiUrl('/user/mail/sendActivationCode.action'),
  logout: apiUrl('/public/logout.action')
}

export function signIn(params) {
  return dispatch => {
    dispatch({
      type: types.LOGIN_REQUEST,
      payload: {}
    })

    axiosGet(url.signIn, {data: params})
      .then(data => {
        if (data.success) {
          dispatch({
            type: types.LOGIN_SUCCESS,
            payload: data
          })
        } else {
          dispatch({
            type: types.LOGIN_FAILURE,
            payload: data
          })
        }
        return data
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(push('/page'))
          cookie.save('esid', data.data.returnToken, {path: '/',})
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
        if (data.success) {
          dispatch({
            type: types.REGISTER_SUCCESS,
            payload: data
          })
        } else {
          dispatch({
            type: types.REGISTER_FAILURE,
            payload: data
          })
        }

        return data;
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(push('/signin'))
          message.success('注册成功！')
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

export function findPassword(params) {
  return dispatch => {
    dispatch({
      type: types.FORGET_REQUEST
    })


    axiosGet(url.forget, {data: params})
      .then(data => {
        if (data.success) {
          dispatch({
            type: types.FORGET_SUCCESS,
            payload: data
          })
        } else {
          dispatch({
            type: types.FORGET_FAILURE,
            payload: data
          })
        }

        return data;
      })
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(push('/signin'))
          message.success('重置成功！')
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: types.FORGET_FAILURE,
        })
      })
  }
}

export function sendCode(params) {
  console.log(params)
  return dispatch =>
    axiosGet(url.sendCode, {data: params})
      .then(data => {
        console.log(data)
        dispatch({
          type: types.SEND_CODE_SUCCESS,
          payload: data.data
        })
      })
}

// 退出
export function logout(params) {
  console.log(params)
  return dispatch =>
    axiosGet(url.logout, {data: params})
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(push('/signin'))
          cookie.remove('esid')
        }
      })
}
