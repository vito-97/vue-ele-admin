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
        { name: '账号', field: 'username', width: 150 },
        { name: '昵称', field: 'nickname', width: 150 },
        { name: '头像', field: 'avatar', type: 'image' },
        { name: '手机号', field: 'tel', width: 120 },
        { name: '报障电话', field: 'phone' },
        { name: '邮箱', field: 'email' },
        { name: '维护员注册二维码', field: 'extend.repair_register_qrcode', type: 'image' },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        // { name: '使用套餐类型', field: 'product_type', label: true, type: 'tag', opts: {}, width: 120 },
        { name: '最后登录时间', field: 'last_login_time', width: 150 },
        { name: '最后登录IP', field: 'last_login_ip', width: 150 },
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
