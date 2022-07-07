<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      :searchable="searchable"
      :list="list"
      :list-label="listLabel"
      :pagination="pagination"
      :total="total"
      :kw="kw"
      :control="control"
      :mode="mode"
      :select-multiple="selectMultiple"
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
        { name: '名称', field: 'name', width: 150 },
        { name: '价格', field: 'price', after: '元', type: 'tag' },
        { name: '流量', field: 'flow', after: 'L', type: 'tag' },
        { name: '赠送流量', field: 'give_flow', after: 'L', type: 'tag' },
        { name: '设备号', field: 'device.device_no' },
        { name: '运营商', field: 'agent.nickname' },
        { name: '已购买数量', field: 'buy_total' },
        { name: 'VIP', field: 'is_vip', type: 'switch' },
        { name: '是否可退', field: 'allow_refund', type: 'switch' },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
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
