<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      v-bind="$attrs"
      v-on="listeners"
      :deletable="deletable"
      :default-expand-all="true"
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
        { name: '名称', field: 'name', width: 200 },
        { name: '文章数', field: 'posts_count' },
        { name: '标识', field: 'index', width: 180 },
        { name: '排序', field: 'sort', type: 'number', opts: { max: 255, min: 0 }, width: 150 },
        { name: '链接', field: 'link', type: 'link' },
        { name: '单文章', field: 'single', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        { name: '展示', field: 'is_show', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
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
    deletable(row) {
      for (let child of row.children) {
        if (child.posts_count) {
          return false
        }
      }

      return !row.posts_count
    }
  }
}
</script>

<style lang="scss">

</style>
