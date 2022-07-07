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
        { name: '卡号', field: 'card_no', width: 150, type: 'tag' },
        { name: '余额', field: 'money', type: 'tag', opts: { type: 'danger' }, before: '￥' },
        { name: '用户', field: 'agent.nickname' },
        { name: '使用时间', field: 'use_time', type: 'time' },
        { name: '状态', field: 'status', label: true, type: 'tag', opts: {} },
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
