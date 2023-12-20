import Axios from 'axios'
// import {encrypt, decrypt, getSign} from './secret'
// import {ApiCodeDefine} from './api.define'
import {USER_TOKEN_KEY, REQUEST_AUTHORIZATION, REQUEST_AUTHORIZATION_PREFIX, USER_INFO} from './const'
import {Store} from './store'
import router from '../router'

// TODO:全局默认设置
Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
Axios.defaults.headers['Content-Type'] = 'application/json'
// 请求拦截器,统一处理参数
Axios.interceptors.request.use((config) => {
  // 注入token
  const token = Store.get(USER_TOKEN_KEY)
  if (token) {
    config.headers[REQUEST_AUTHORIZATION] = REQUEST_AUTHORIZATION_PREFIX + token
  }
  // // 参数加密
  // if (!config.originData) {
  //   config.originData = config.data;
  //   let reqData = JSON.stringify(config.originData)
  //   reqData = encrypt(reqData)
  //   let sign = getSign(config.originData)
  //   config.data = {}
  //   config.data[REQUEST_REQDATA] = reqData
  //   config.data[REQUEST_SIGN] = sign
  // }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default Axios
