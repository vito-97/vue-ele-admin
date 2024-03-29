import { Loading } from 'element-ui'

const setting = require('@/settings')

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 获取链接的参数
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.includes('?') ? url.split('?')[1] : url).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 深度获取值
 * @param key
 * @param data
 * @param def
 * @returns {string|*[]}
 */
export function deepVal(key, data, def = '') {
  if (!data || !Object.keys(data).length) {
    return def
  }

  const keys = key.split('.').filter(v => v.toString().trim() !== '')
  const len = keys.length
  if (len === 0) {
    return def
  }

  let val = deepClone(data)

  for (var k of keys) {
    if (val && typeof val[k] !== 'undefined') {
      val = val[k]
    } else {
      return def
    }
  }

  return val
}

/**
 * 格式化大小
 * @param value
 * @returns {string}
 */
export function formatFileSize(value) {
  if (!value) {
    return '0 Bytes'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var index = 0
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)
  return size + unitArr[index]
}

let loading

export function showLoading(msg = 'loading...') {
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: msg,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

export function hideLoading() {
  loading && loading.close()
}

/**
 * 获取控制器名称
 * @param index
 * @returns {*|string}
 */
export function controlName(index) {
  return setting.controlName[index] || ''
}

/**
 * 转数组
 * @param data
 * @param string char
 * @returns {*|*[]}
 */
export function toArray(data, char = ',') {
  return Array.isArray(data) ? data : (typeof data === 'undefined' || data === '' ? [] : data.toString().split(char))
}

/**
 * 转字符串
 * @param data
 * @param join
 * @returns {string|*}
 */
export function toString(data, join = ',') {
  var type = typeof data
  if (type === 'string') {
    return data
  } else if (Array.isArray(data)) {
    return data.join(join)
  } else {
    return JSON.stringify(data)
  }
}

export function isSuperAdmin(role) {
  return role && role.key === 'admin'
}

/**
 * 判断是否为正整数
 * @param n
 * @returns {boolean}
 */
export function isPositiveInteger(n) {
  return (/(^[1-9]\d*$)/.test(n))
}

// 判断当前设备是否为移动端
export function isMobile() {
  const ua = navigator.userAgent.toLowerCase()
  const t1 = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    ua
  )
  const t2 = !ua.match('iphone') && navigator.maxTouchPoints > 1
  return t1 || t2
}

/**
 * 过滤html代码
 * @param string
 * @returns {string|*}
 */
export function filterHtml(string) {
  // 过滤所有的html标签，不包括内容
  var reg = new RegExp('<[^>]+>', 'gi')

  // 不是字符串
  if (typeof string != 'string') {
    return string
  }

  return string.replace(reg, '')
}

/**
 * 下划线转驼峰（首字母小写）
 * @param value
 * @returns {*}
 */
export function word2camel(value) {
  return value.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
}

/**
 * 下划线转驼峰（首字母大写）
 * @param value
 * @returns {*}
 */
export function word2studly(value) {
  value = value.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
  return value.substring(0, 1).toUpperCase() + value.substring(1)
}

/**
 * 驼峰转下划线
 * @param value
 * @returns {string}
 */
export function word2snake(value) {
  return value.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 是否为默认语言
 * @param lang
 * @returns {boolean}
 */
export function isDefaultLang(lang) {
  return lang === setting.defaultLang || !lang
}

/**
 * 树形结构扁平化
 * @param array 数组
 * @param dataKey 获取的数据下标
 * @param subKey 子集下标
 * @returns {*[]}
 */
export function deepTree(array, dataKey = null, subKey = 'children') {
  var data = []

  var getData = function (item) {
    return dataKey === null ? item : item[dataKey]
  }

  for (let item of array) {
    let d = getData(item)
    data.push(d)
    if (item[subKey]?.length) {
      data = data.concat(deepTree(item[subKey], dataKey, subKey))
    }
  }

  return data
}

/**
 * 获取树形结构每个数据对应的位置
 * @param array
 * @param subKey
 * @param key
 * @returns {*[]}
 */
export function deepTreeIndex(array, subKey = 'children', key = '') {
  var index = []

  var getKey = function (i) {
    return key ? `${key}.${i}` : `${i}`
  }

  for (let [i, item] of array.entries()) {
    var k = getKey(i)
    index.push(k)

    if (item[subKey]?.length) {
      index = index.concat(deepTreeIndex(item[subKey], subKey, k))
    }
  }

  return index
}

/**
 * 获取树形结构展开后指定列元素
 * @param array 数据
 * @param index 索引 可以是1 或者 1.0 或更深层 使用deepTreeIndex获取到的索引
 * @param subKey
 * @returns {*|null}
 */
export function getTreeItem(array, index, subKey = 'children') {
  var keys = index.split('.')
  var first = keys.shift()

  if (!keys.length) {
    return array[first]
  }

  if (array[first][subKey]?.length) {
    return getTreeItem(array[first][subKey], keys.join('.'), subKey)
  }

  return null
}

/**
 * 判断是否为图片链接
 * @param path
 * @returns {boolean}
 */
export function isImg(path) {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path)
}

/**
 * 加载js脚本
 * @param url
 * @returns {Promise<unknown>}
 */
export function loadJs(url) {
  return new Promise((resolve, reject) => {
    var head = document.getElementsByTagName('head')[0] // 在head标签中创建创建script
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = resolve
    script.onerror = reject
    head.appendChild(script)
  })
}

var apiHost = null

export function getApiHost() {
  if (apiHost === null) {
    var u = new URL(process.env.VUE_APP_BASE_API)
    apiHost = u.host
  }

  return apiHost
}
