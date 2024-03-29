import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import CONFIG from '@/utils/config'

// 给服务器ajax标识
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// 修改接收的响应类型 axios默认的【application/json, text/plain, */*】返回HTML会跨域失败
axios.defaults.headers.common['Accept'] = '*/*'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Access-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 0 and exclude code, it is judged as an error.
    if (res.code !== 0 && !CONFIG.exclude_error_code.includes(res.code)) {
      Message({
        dangerouslyUseHTMLString: true,
        message: res.msg || 'Error',
        type: 'error',
        duration: 5000
      })

      // 40103禁用 50104未登录  50105 token未传递
      if ([40103, 50104, 50105].includes(res.code)) {
        // to re-login
        MessageBox.confirm('登录状态已失效', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            if (location.pathname.indexOf('/login') === -1) {
              location.reload()
            }
          })
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('request err', error) // for debug
    Message({
      dangerouslyUseHTMLString: true,
      message: error.msg || error,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
