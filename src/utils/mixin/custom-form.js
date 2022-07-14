import customForm from '@/views/custom/customForm'
import checkPermission from '@/utils/permission'

const customFromMixin = {
  props: {
    // 数据详情
    detail: {
      type: Object
    },
    id: {
      type: Number,
      default: 0
    },
    list: {
      type: Object
    },
    appendToBody: {
      type: Boolean
    },
    error: {
      type: Object
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
    }
  }
}

export default customFromMixin
