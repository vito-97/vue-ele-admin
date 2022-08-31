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

/**
 * 获取URI
 * @param uri
 * @returns {string|string}
 */
function getUri(uri) {
  return uri ? '/' + uri : ''
}

function curd(control, version = 'v1') {
  const req = {
    /**
     * GET请求
     * @param uri
     * @param params
     * @param args
     * @returns {AxiosPromise}
     */
    get(uri, params = {}, args = {}) {
      uri = getUri(uri)
      return request({
        url: `${version}/${control}${uri}`,
        method: 'GET',
        params,
        ...args
      })
    },
    /**
     * POST请求
     * @param uri
     * @param data
     * @param args
     * @returns {AxiosPromise}
     */
    post(uri, data = {}, args = {}) {
      uri = getUri(uri)
      return request({
        url: `${version}/${control}${uri}`,
        method: 'POST',
        data,
        ...args
      })
    },
    /**
     * PUT请求
     * @param uri
     * @param data
     * @param args
     * @returns {AxiosPromise}
     */
    put(uri, data = {}, args = {}) {
      uri = getUri(uri)
      return request({
        url: `${version}/${control}${uri}`,
        method: 'PUT',
        data,
        ...args
      })
    },
    delete(uri, args = {}) {
      uri = getUri(uri)
      return request({
        url: `${version}/${control}${uri}`,
        method: 'DELETE',
        ...args
      })
    },
    /**
     * 列表数据
     * @param params
     * @returns {AxiosPromise}
     */
    index(params = {}) {
      /* return request({
        url: `${version}/${control}`,
        method: 'GET',
        params
      }) */
      return req.get('', params)
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
     * @param args
     * @returns {AxiosPromise}
     */
    read(id, args = {}) {
      /* return request({
         url: `${version}/${control}/${id}`,
         method: 'GET'
       })*/
      return req.get(id, args)
    },
    /**
     * 修改获取详情
     * @param id
     * @param params
     * @param args
     * @returns {AxiosPromise}
     */
    edit(id = 0, params = {}, args = {}) {
      /* return request({
          url: `${version}/${control}/${id}/edit`,
          method: 'GET',
          params
        })*/
      return req.get(`${id}/edit`, params, args)
    },
    /**
     * 新增
     * @param data
     * @param args
     * @returns {AxiosPromise}
     */
    save(data, args = {}) {
      /* return request({
         url: `${version}/${control}`,
         method: 'POST',
         data
       })*/
      return req.post('', data, args)
    },
    /**
     * 更新
     * @param data
     * @param id
     * @param args
     * @returns {AxiosPromise}
     */
    update(data, id, args = {}) {
      /* return request({
         url: `${version}/${control}/${id}`,
         data,
         method: 'PUT'
       })*/
      return req.put(id, data, args)
    },
    /**
     * 更改字段
     * @param id
     * @param data
     * @param args
     * @returns {AxiosPromise}
     */
    change(id, data, args = {}) {
      id = a2s(id)
      /* return request({
         url: `${version}/${control}/${id}/change`,
         method: 'PUT',
         data: {
           field, value
         }
       })*/
      return req.put(`${id}/change`, data, args)
    },
    /**
     * 删除
     * @param id
     * @param args
     * @returns {AxiosPromise}
     */
    destroy(id, args = {}) {
      id = a2s(id)
      /* return request({
         url: `${version}/${control}/${id}`,
         method: 'DELETE'
       })*/
      return req.delete(id, args)
    }
  }

  return req
}

export default curd
