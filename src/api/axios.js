import axios from 'axios'
import {push} from 'react-router-redux'

export default function axiosGet(url, params, options) {

  return axios.get(url, {
    params: params
  })
    .then(response => {
      const data = response.data
      let _data
      if (typeof data === 'string') {
        _data = JSON.parse(data)
      } else {
        _data = data
      }

      if (_data.code) {
        if (_data.code === 206) {
          // location.replace('/')
          return
        }
      }
      return _data
    })
}
