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
    // 查询参数
    query: {
      type: Object
    }
  },
  methods: {}
}

export default indexMixin
