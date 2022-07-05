import request from '@/utils/request'

export function dashboard() {
  return request({
    url: 'v1/dashboard',
    method: 'get'
  })
}
