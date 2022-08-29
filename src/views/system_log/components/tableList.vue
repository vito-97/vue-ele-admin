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
      <!--      获取登录的用户昵称-->
      <template v-slot:user="{row}">
        {{ row.user && row.user.nickname || row.admin && row.admin.nickname || '未登录' }}
      </template>
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'
import { showLoading, hideLoading } from '@/utils'
import CURD from '@/api/curd'

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
    api() {
      return CURD(this.control)
    }
  },
  props: {},
  filters: {},
  created() {
  },
  methods: {
    onTapHeadBtnFlushAuth(args) {
      showLoading('刷新权限中...')
      this.api.post('flush').then(res => {
        hideLoading()
        this.onTapHeadBtnFlush({})
      }, hideLoading)
    }
  }
}
</script>

<style lang="scss">

</style>
