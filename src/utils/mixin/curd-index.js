import curdIndex from '@/views/curd/index'

const indexMixin = {
  components: {
    curdIndex
  },
  props: {
    /**
     * 模式
     */
    mode: {
      type: String,
      default: 'show'
    },
    // 是否支持多选
    selectMultiple: {
      type: Boolean
    }
  },
  methods: {
    // 选择
    onSelect(args) {
      this.$emit('select', args)
    },
    // 多选
    onSelectMultiple(args) {
      this.$emit('select-multiple', args)
    }
  }
}

export default indexMixin
