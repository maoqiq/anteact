import {message} from 'antd'
import {push} from 'react-router-redux'
import axios from 'axios'

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'

const url = {
  app: apiUrl('/ssp/data/appAction'),
}

export function fetchApp(params) {
  return dispatch =>
    axios.get(url.app, {
      params: {
        data: params,
        mediaId: 1
      }
    })
      .then(response => response.data)
      .then(data => {
        const _data = JSON.parse(data)
        console.log(_data)
        if (_data.success) {
          dispatch({
            type: types.CHART_APP_FETCH_SUCCESS,
            payload: _data.data
          })

        }

      })
}
