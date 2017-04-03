import axios from 'axios'
import {push} from 'react-router-redux'

export default function axiosGet(url, params, options) {

  return axios.get(url, {
    params: params
  })
    .then(response => {
      const data = response.data
      if (data.code === 206) {
        location.replace('/')
        return
      }
      return data
    })
}
