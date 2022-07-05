<template>
  <div v-if="val">
    {{time}}
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'
import { parseTime } from '@/utils'

export default {
  name: 'TimeEl',
  mixins: [tableColumnMixin],
  computed: {
    time() {
      const val = this.val

      if (Number.isInteger(Number(val))) {
        return parseTime(val)
      }

      return val
    }
  }
}
</script>

<style scoped>

</style>
