import customForm from '@/views/custom/customForm'
import checkPermission from '@/utils/permission'
import { word2studly } from '@/utils'

const customFromMixin = {
  props: {
    // 数据详情
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    id: {
      type: Number,
      default: 0
    },
    list: {
      type: Object,
      default: () => {
        return {}
      }
    },
    appendToBody: {
      type: Boolean
    },
    error: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: { customForm },
  methods: {
    onSubmit(detail) {
      this.$emit('submit', detail)
    },
    flush() {
      this.$emit('flush')
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
    }
  }
}

export default customFromMixin
