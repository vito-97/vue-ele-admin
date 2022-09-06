<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      v-bind="$attrs"
      v-on="$listeners"
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
      @update-item="onUpdateItem"
      @load="onLoad"
    >
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'

export default {
  data() {
    return {
      columns: [
        { name: '标题', field: 'title', width: 150 },
        { name: '费用', field: 'amount', type: 'tag', opts: { type: 'danger' }, before: '￥' },
        { name: '运营商', field: 'agent.nickname' },
        { name: '日期', field: 'time', type: 'time' },
        { name: '支付时间', field: 'pay_time', type: 'time' },
        { name: '是否支付', field: 'is_pay', type: 'bool' },
        { name: '备注', field: 'mark', type: 'content' },
        { name: '添加时间', field: 'create_time', width: 150 }
      ]
    }
  },
  components: {},
  mixins: [
    tableMixin
  ],
  computed: {},
  props: {},
  filters: {},
  created() {
  },
  methods: {}
}
</script>

<style lang="scss">

</style>
