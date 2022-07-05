<template>
  <div>
    <custom-table
      :columns="columns"
      :query="query"
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
        { name: 'APP ID', field: 'app_id' },
        { name: 'CUS ID', field: 'cus_id' },
        { name: '已收款', field: 'amount', before: '￥' },
        { name: '已退款', field: 'refund_amount', before: '￥' },
        { name: '运营商', field: 'agent.nickname' },
        { name: '公钥', field: 'public_key', type: 'content', opts: { title: '公钥' }},
        { name: '私钥', field: 'private_key', type: 'content', opts: { title: '私钥' }},
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {}},
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
