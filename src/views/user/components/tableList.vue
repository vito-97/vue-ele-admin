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
        { name: '账号', field: 'username', width: 150 },
        { name: '昵称', field: 'nickname', width: 150 },
        { name: '头像', field: 'avatar', type: 'image' },
        { name: '手机号', field: 'tel', width: 120 },
        { name: '邮箱', field: 'email' },
        { name: '购买次数', field: 'pay_count' },
        { name: '余额', field: 'money', before: '￥' },
        { name: '流量', field: 'flow', after: 'L' },
        { name: '已使用', field: 'used_flow', after: 'L' },
        // { name: '类型', field: 'type', label: true, type: 'tag', opts: {},width: 100 },
        { name: '运营商', field: 'agent.nickname' },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
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
