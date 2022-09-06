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
      <!--      获取登录的用户昵称-->
      <template v-slot:user="{row}">
        {{ row.user && row.user.nickname || row.admin && row.admin.nickname || '未登录' }}
      </template>
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'

export default {
  data() {
    return {
      params: { module: 'admin' },
      columns: [
        { name: '标题', field: 'title', width: 150 },
        { name: '请求方式', field: 'method', label: true },
        { name: '用户', field: 'user' },
        { name: '接口', field: 'url', width: 200 },
        { name: '模块', field: 'module', label: true },
        { name: '请求参数', field: 'query', type: 'content' },
        { name: 'IP', field: 'ip' },
        { name: 'UserAgent', field: 'ua', type: 'content' },
        { name: '请求时间', field: 'create_time', width: 150 }
      ]
    }
  },
  components: {},
  mixins: [
    tableMixin
  ],
  computed: {
  },
  props: {},
  filters: {},
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
