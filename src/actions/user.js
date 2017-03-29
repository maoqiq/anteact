import types from '../constants/actionTypes';
import axios from 'axios'
import {apiUrl} from '../utils/apiHelper'

const url = {
  list: apiUrl('/ssp/media/account/info'),
  edit: apiUrl('/ssp/media/modify')
}

export function fetchInfo(params) {
  return dispatch =>
    axios.get(url.list)
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        dispatch({
          type: types.USER_INFO_FETCH,
          payload: _data.data
        })
      })
}
