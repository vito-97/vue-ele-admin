<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      :head-btn="headBtn"
      v-bind="$attrs"
      v-on="listeners"
      :pagination="false"
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
    >
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'
import { showLoading, hideLoading } from '@/utils'

export default {
  data() {
    return {
      params: { module: 'admin' },
      headBtn: [
        {
          name: '刷新权限',
          // 类型
          type: 'primary',
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
  computed: {},
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
      this.curd.post('flush').then(res => {
        hideLoading()
        this.onTapHeadBtnFlush({})
      }, hideLoading)
    }
  }
}
</script>

<style lang="scss">

</style>
