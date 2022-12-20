import curdIndex from '@/views/curd/index'

const indexMixin = {
  components: {
    curdIndex
  },
  props: {},
  methods: {
    // 刷新页面
    flush() {
      this.$refs.curd && this.$refs.curd.onFlush()
    }
  }
}

export default indexMixin
