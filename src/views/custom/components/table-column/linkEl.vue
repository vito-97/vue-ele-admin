<template>
  <div>
    <el-link :type="opt.type" :href="formatVal" target="_blank">{{ val }}</el-link>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'LinkEl',
  data() {
    return {
      opts: {
        type: 'primary'
      }
    }
  },
  mixins: [tableColumnMixin],
  filters: {
  }
}
</script>

<style scoped>

</style>
