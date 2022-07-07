<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      :searchable="searchable"
      :selectable="selectable"
      :deletable="selectable"
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
        { name: '用户名', field: 'username' },
        { name: '昵称', field: 'nickname' },
        { name: '邮箱', field: 'email' },
        { name: '角色', field: 'role_id', label: 'role', list_field: 'name', list_value: 'id' },
        { name: '添加IP', field: 'add_ip' },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {/* inactive_text:'禁用',active_text:'启用'*/} },
        { name: '最后登录时间', field: 'last_login_time', width: 150 },
        { name: '最后登录IP', field: 'last_login_ip' },
        { name: '备注', field: 'mark', type: 'content' },
        { name: '禁用原因', field: 'disabled_mark', type: 'content' },
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
    }
  }
}
</script>

<style lang="scss">

</style>
