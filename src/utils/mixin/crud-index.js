import crudIndex from '@/views/crud/index'

const indexMixin = {
  components: {
    crudIndex
  },
  props: {},
  methods: {
    // 刷新页面
    flush() {
      this.$refs.crud && this.$refs.crud.onFlush()
    }
  }
}

export default indexMixin
