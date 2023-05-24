<template>
  <div class="content-box">
    <curd-index
      ref="curd"
      :table-com="tableList"
      :control="control"
      :curd="curd"
      v-bind="$attrs"
      v-on="$listeners"
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
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>
