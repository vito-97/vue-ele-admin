import request from '@/utils/request'

/**
 * 獲取配置信息
 * @returns {*}
 */
export function getConfig() {
  return request({
    url: 'v1/config',
    method: 'get'
  })
}
