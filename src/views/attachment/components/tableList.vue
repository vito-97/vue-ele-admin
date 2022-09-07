<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      :editable="editable"
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
import { formatFileSize } from '@/utils'

export default {
  data() {
    return {
      columns: [
        { name: '名称', field: 'name', width: 200 },
        { name: '分类', field: 'category', label: true, type: 'tag' },
        { name: '预览', field: 'link', type: 'preview', show_overflow_tooltip: false, width: 100 },
        {
          name: '链接', field: 'url', type: 'link', width: 450, format(val, row) {
            return row.link
          }
        },
        { name: '宽度', field: 'width' },
        { name: '高度', field: 'height' },
        { name: '类型', field: 'type' },
        { name: 'MIME', field: 'mime', width: 120 },
        {
          name: '大小', field: 'size', format(val) {
            return formatFileSize(val)
          },
          width: 120
        },
        // { name: '存储', field: 'storage' },
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
    editable(row, index) {
      return false
    }
  }
}
</script>

<style lang="scss">

</style>
