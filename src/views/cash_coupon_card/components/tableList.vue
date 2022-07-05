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
        { name: '现金券', field: 'coupon.name', width: 150, type: 'tag' },
        { name: '用户', field: 'user.nickname', type: 'tag' },
        { name: '运营商', field: 'agent.nickname', type: 'tag' },
        { name: '使用时间', field: 'use_time', type: 'time' },
        { name: '过期时间', field: 'expire_time', type: 'time' },
        { name: '是否使用', field: 'is_use', type: 'bool', opts: { active_text: '已使用', inactive_text: '未使用' }},
        { name: '状态', field: 'status', label: true, type: 'tag', opts: {}},
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
