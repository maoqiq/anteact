import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  signIn: apiUrl('/1.0/user/login.action'),
  signUp: apiUrl('/public/ssp/media/register'),
  sendCode: apiUrl('/user/mail/sendActivationCode.action')
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
    axios.post(url.sendCode, {
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
