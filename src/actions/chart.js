import {message} from 'antd'
import {push} from 'react-router-redux'
import axios from 'axios'

import types from '../constants/actionTypes';
import {apiUrl} from '../utils/apiHelper'
import axiosGet from '../api/axios'

const url = {
  app: apiUrl('/ssp/data/appAction'),
  pit: apiUrl('/ssp/data/pitAction')
}

// 媒体数据
export function fetchApp(params) {
  return dispatch =>
    axiosGet(url.app, {data: params, mediaId: 1})
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

// 广告位数据
export function fetchPit(params) {
  return dispatch =>
    axiosGet(url.app, {data: params, mediaId: 1})
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

