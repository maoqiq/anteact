import types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch'
import axios from 'axios'

fetch('//rap.taobao.org/mockjsdata/15637/ssp/app/list')
  .then(response => response)

export function fetchList() {
  return dispatch =>
    axios.get('//rap.taobao.org/mockjsdata/15637/ssp/app/list')
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: types.MEDIA_LIST_FETCH,
          payload: data
        })
      })

}
