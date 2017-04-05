import axios from 'axios'
import {browserHistory} from 'react-router';


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
        if (_data.code === 206 && browserHistory.getCurrentLocation().pathname.includes('page')) {
          browserHistory.push('/signin')
          return
        }
      }
      return _data
    })
}
