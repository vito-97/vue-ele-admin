import Cookies from 'js-cookie'

const setting = require('@/settings')
const LIST_LIMIT_KEY = 'list_limit'

export function getLimit(name = '') {
  const key = getKey(name)
  const limit = Number(Cookies.get(key))
  return !isNaN(limit) && limit > 0 && limit || setting.listLimit
}

export function setLimit(limit, name = '') {
  const key = getKey(name)
  return Cookies.set(key, limit)
}

function getKey(name = '') {
  return LIST_LIMIT_KEY + (name ? '_' + name : '')
}

export const pageSizes = setting.pageSizes
