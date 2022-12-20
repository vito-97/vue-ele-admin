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
        { name: '标题', field: 'title' },
        { name: '图片', field: 'image', type: 'image' },
        { name: '链接', field: 'link', type: 'link' },
        { name: '管理员', field: 'admin.nickname' },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        { name: '添加时间', field: 'create_time' }
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
