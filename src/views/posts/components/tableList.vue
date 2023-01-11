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
      <template v-slot:category_id="{row}">
        <el-tag>
          {{ row.category.name }}
        </el-tag>
      </template>
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'

export default {
  data() {
    return {
      columns: [
        { name: '标题', field: 'title', width: 200, type: 'content' },
        { name: '浏览量', field: 'hits', width: 100, type: 'content' },
        {
          name: '分类',
          field: 'category_id',
          type: 'tag',
          label: 'category',
          list_field: 'name',
          list_value: 'id',
          width: 120
        },
        { name: '封面', field: 'cover', type: 'image' },
        { name: '作者', field: 'author' },
        { name: '来源', field: 'source' },
        { name: '导读', field: 'intro', type: 'content', width: 150 },
        { name: '正文', field: 'content', type: 'content', opts: { html: true }, width: 150 },
        { name: '置顶', field: 'is_top', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
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
  methods: {}
}
</script>

<style lang="scss">

</style>
