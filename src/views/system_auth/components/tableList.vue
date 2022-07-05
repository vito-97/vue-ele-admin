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
      :head-btn="headBtn"
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
import { showLoading, hideLoading } from '@/utils'
import CURD from '@/api/curd'

export default {
  data() {
    return {
      headBtn: [
        {
          name: '刷新权限',
          // 类型
          type: 'success',
          // 图标
          icon: 'el-icon-refresh-right',
          // 权限
          auth: this.getFullAuth('flush'),
          key: 'flushAuth'
        }
      ],
      columns: [
        { name: '名称', field: 'name' },
        { name: '路由', field: 'route' },
        { name: '模块', field: 'module', label: true },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag' },
        { name: '备注', field: 'mark', type: 'content' },
        { name: '添加时间', field: 'create_time', width: 150 }
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
  props: {
    pagination: {
      type: Boolean,
      default: false
    }
  },
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
