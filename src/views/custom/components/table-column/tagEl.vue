<template>
  <el-tag :type="statusType(val)" size="small">{{ formatVal }}</el-tag>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

const num = {}
export default {
  name: 'TagEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {
        type: '',
        types: ['info', 'primary', 'success', 'warning', 'danger']
      }
    }
  },
  filters: {},
  methods: {
    statusType(value) {
      const field = this.field
      // 有固定样式
      if (this.opt.type) {
        return this.opt.type
      }

      let index
      if (Number.isInteger(Number(value)) && Number(value) <= 10) {
        index = Number(value)
      } else {
        if (!num[field]) {
          num[field] = []
        }
        if (!num[field].includes(value)) {
          num[field].push(value)
        }
        index = num[field].indexOf(value)
      }

      const t = this.opt.types
      const n = index % t.length
      return t[n]
    }
  }
}
</script>

<style scoped>

</style>
