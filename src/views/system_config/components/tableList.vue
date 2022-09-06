<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      v-bind="$attrs"
      v-on="listeners"
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
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
        { name: '变量键', field: 'key', width: 150 },
        { name: '变量值', field: 'value', width: 150 },
        { name: '类型', field: 'type' },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        { name: '提示信息', field: 'desc', type: 'content' },
        { name: '添加时间', field: 'create_time', width: 150 }
      ]
    }
  },
  mixins: [
    tableMixin
  ]
}
</script>

<style lang="scss">

</style>
