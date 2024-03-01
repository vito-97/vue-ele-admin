<template>
  <div class="content-box">
    <crud-index
      ref="crud"
      :table-com="tableList"
      :control="control"
      :crud="crud"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </crud-index>
  </div>
</template>

<script>
import tableList from './components/tableList'
import indexMixin from '@/utils/mixin/crud-index'

export default {
  data() {
    return {
      tableList,
      control: 'system_log',
      crud: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>
