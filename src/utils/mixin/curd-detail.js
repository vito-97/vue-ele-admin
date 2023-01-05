import curdDetail from '@/views/curd/detail'

const indexMixin = {
  components: {
    curdDetail
  },
  computed: {
    id() {
      return Number(this.$route.params?.id || 0)
    }
  },
  props: {},
  methods: {}
}

export default indexMixin
