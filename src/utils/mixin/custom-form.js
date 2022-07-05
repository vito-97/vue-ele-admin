import customForm from '@/views/custom/customForm'

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
    }
  }
}

export default customFromMixin
