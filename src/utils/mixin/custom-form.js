import customForm from '@/views/custom/customForm'
import checkPermission from '@/utils/permission'
import { word2studly } from '@/utils'

const customFromMixin = {
  data() {
    return {
      formData: {}
    }
  },
  props: {},
  components: { customForm },
  computed: {
    id() {
      return this.$attrs?.id || 0
    },
    list() {
      return this.$attrs?.list || {}
    },
    error() {
      return this.$attrs?.error || {}
    },
    detail() {
      return this.$attrs?.detail || {}
    },
    // 获取要透传的事件
    listeners() {
      var exclude = ['close', 'flush']

      var listeners = {}

      for (let [index, item] of Object.entries(this.$listeners)) {
        if (!exclude.includes(index)) {
          listeners[index] = item
        }
      }

      return listeners
    }
  },
  methods: {
    flush() {
      this.$emit('flush')
    },
    close() {
      this.$emit('close')
    },
    // 检测其他权限
    checkPermission(auth) {
      return checkPermission(auth)
    },
    onEvent(e) {
      var { type, field, payload } = e
      var typeCamel = word2studly(type)
      var fieldCamel = word2studly(field)
      var method = `onEvent${fieldCamel}`
      var singleMethod = `onEvent${fieldCamel}${typeCamel}`
      if (typeof this[method] === 'function') {
        return this[method](type, payload)
      } else if (typeof this[singleMethod] === 'function') {
        return this[singleMethod](payload)
      } else {
        this.onEventListener(e)
      }
    },
    /**
     * 表单未匹配到方法里的事件则调用此方法
     * 覆盖此方法即可
     * @param e
     */
    onEventListener(e) {
      console.log(`未定义[${e.field}]字段事件[${e.type}]`)
    },
    // 设置表单数据
    setFormData(key, value = null) {
      this.setProxyObj(this.formData, key, value)
    },
    // 设置详情
    setDetail(key, value = null) {
      this.setProxyObj(this.$attrs.detail, key, value)
    },
    /**
     * 设置对象的数据
     * @param target
     * @param key
     * @param value
     */
    setProxyObj(target, key, value = null) {
      var obj = {}
      if (typeof key === 'object') {
        obj = key
      } else {
        obj[key] = value
      }

      for (let [index, val] of Object.entries(obj)) {
        this.$set(target, index, val)
      }
    }
  }
}

export default customFromMixin
