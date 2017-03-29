import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  list: apiUrl('/ssp/media/account/info'),
  edit: apiUrl('/ssp/media/modify')
}

export function fetchInfo(params) {
  return dispatch =>
    axios.get(url.list, {
      params: {
        data: params
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log(data.data)
        dispatch({
          type: types.USER_INFO_FETCH,
          payload: data.data
        })
      })
}
