import request from '@/utils/request'

/**
 * 数组转字符串
 * @param a
 * @returns {*}
 */
function a2s(a) {
  if (Array.isArray(a)) {
    a = a.join(',')
  }

  return a
}

function curd(control, version = 'v1') {
  return {
    /**
     * GET请求
     * @param uri
     * @param params
     * @returns {AxiosPromise}
     */
    get(uri, params = {}) {
      uri = uri ? '/' + uri : ''
      return request({
        url: `${version}/${control}${uri}`,
        method: 'GET',
        params
      })
    },
    /**
     * POST请求
     * @param uri
     * @param data
     * @returns {AxiosPromise}
     */
    post(uri, data = {}) {
      uri = uri ? '/' + uri : ''
      return request({
        url: `${version}/${control}${uri}`,
        method: 'POST',
        data
      })
    },
    /**
     * PUT请求
     * @param uri
     * @param data
     * @returns {AxiosPromise}
     */
    put(uri, data = {}) {
      uri = uri ? '/' + uri : ''
      return request({
        url: `${version}/${control}${uri}`,
        method: 'PUT',
        data
      })
    },
    /**
     * 列表数据
     * @param params
     * @returns {AxiosPromise}
     */
    index(params = {}) {
      return request({
        url: `${version}/${control}`,
        method: 'GET',
        params
      })
    },
    /**
     * 判断是否有下一页
     * @param result
     * @returns {*|number|boolean}
     */
    has_next(result) {
      return result.page && result.page < result.last_page
    },
    /**
     * 判断是否有上一页
     * @param result
     * @returns {*|number|boolean}
     */
    has_prev(result) {
      return result.page && result.page > 1
    },
    /**
     * 下一页
     * @param result
     * @param data
     * @returns {Promise<never>|AxiosPromise}
     */
    next_page(result, data = {}) {
      if (this.has_next(result)) {
        return this.index(data, data.page + 1, data.limit)
      } else {
        return Promise.reject({ code: 1, msg: '没有下一页' })
      }
    },
    /**
     * 上一页
     * @param result
     * @param data
     * @returns {Promise<never>|AxiosPromise}
     */
    prev_page(result, data = {}) {
      if (result.page && this.has_prev(result)) {
        data.page = data.page - 1
        return this.index(data)
      } else {
        return Promise.reject({ code: 1, msg: '没有上一页' })
      }
    },
    /**
     * 读取详情
     * @param id
     * @returns {AxiosPromise}
     */
    read(id) {
      return request({
        url: `${version}/${control}/${id}`,
        method: 'GET'
      })
    },
    /**
     * 修改获取详情
     * @param id
     * @param params
     * @returns {AxiosPromise}
     */
    edit(id = 0, params = {}) {
      return request({
        url: `${version}/${control}/${id}/edit`,
        method: 'GET',
        params
      })
    },
    /**
     * 新增
     * @param data
     * @returns {AxiosPromise}
     */
    save(data) {
      return request({
        url: `${version}/${control}`,
        method: 'POST',
        data
      })
    },
    /**
     * 更新
     * @param data
     * @param id
     * @returns {AxiosPromise}
     */
    update(data, id) {
      return request({
        url: `${version}/${control}/${id}`,
        data,
        method: 'PUT'
      })
    },
    /**
     * 更改字段
     * @param id
     * @param field
     * @param value
     * @returns {AxiosPromise}
     */
    change(id, field, value) {
      id = a2s(id)
      return request({
        url: `${version}/${control}/${id}/change`,
        method: 'PUT',
        data: {
          field, value
        }
      })
    },
    /**
     * 删除
     * @param id
     * @returns {AxiosPromise}
     */
    delete(id) {
      id = a2s(id)
      return request({
        url: `${version}/${control}/${id}`,
        method: 'DELETE'
      })
    }
  }
}

export default curd
