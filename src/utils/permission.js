import store from '@/store'

const setting = require('@/settings')

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (typeof value === 'string') {
    value = value.split(',')
  }
  if (value && value instanceof Array && value.length > 0) {
    const role = store.getters && store.getters.role
    const auths = value

    const hasPermission = auths.reduce((last, v) => {
      return last && role.auth[setting.authPrefix + v.trim()] && true
    }, true)

    return hasPermission
  } else {
    console.error(`need auth! Like v-permission="['admin','admin/index']"`)
    return false
  }
}
