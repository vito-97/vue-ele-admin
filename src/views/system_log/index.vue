<template>
  <div class="content-box">
    <curd-index
      :table-com="tableList"
      :control="control"
      :searchable="searchable"
      :curd="curd"
      :mode="mode"
    >
    </curd-index>
  </div>
</template>

<script>
import tableList from './components/tableList'
import indexMixin from '@/utils/mixin/curd-index'

export default {
  data() {
    return {
      tableList,
      control: 'system_log',
      searchable: true,
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>
