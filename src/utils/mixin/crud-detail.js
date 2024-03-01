import crudDetail from '@/views/crud/detail'

const indexMixin = {
  components: {
    crudDetail
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
