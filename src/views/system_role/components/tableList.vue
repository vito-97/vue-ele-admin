<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      :selectable="selectable"
      :deletable="deletable"
      :editable="editable"
      :default-expand-all="true"
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
        { name: '名称', field: 'name' },
        { name: '标识', field: 'key' },
        { name: '权限', field: 'auth_tree', type: 'content', opts: { key: 'name', tree: true } },
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
  methods: {
    selectable(row, index) {
      return row.id !== 1
    },
    deletable(row, index) {
      return row.id !== 1
    },
    editable(row, index) {
      return row.id !== 1
    }
  }
}
</script>

<style lang="scss">

</style>
