<template>
  <div>
    <custom-form
      :columns="columns"
      :rules="rules"
      v-bind="$attrs"
      v-on="listeners"
    >

    </custom-form>
  </div>

</template>

<script>
import customFromMixin from '@/utils/mixin/custom-form'

export default {
  name: 'AddForm',
  mixins: [customFromMixin],
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '标题', field: 'title', opts: { required: true, maxlength: 255 } },
        { name: '作者', field: 'author', opts: { maxlength: 50 } },
        { name: '来源', field: 'source', opts: { maxlength: 50 } },
        {
          name: '封面',
          field: 'cover',
          opts: {
            required: true,
            control: 'attachment',
            name: 'link',
            pk: 'url',
            query: { category: 'image' },
            format: 'image'
          },
          type: 'select_table'
        },
        {
          name: '分类',
          field: 'category_id',
          opts: {
            required: true,
            control: 'posts_category',
            name: 'name',
            key: 'category'
          },
          type: 'select_table',
          optional(row, index, target) {
            return !row.children.length || row.pid
          }
        },
        { name: '导读', field: 'intro', opts: { maxlength: 255 }, placeholder: '不填写将从内容提取一部分', type: 'textarea' },
        { name: '置顶', field: 'is_top', type: 'switch', opts: { required: true }, value: 0 },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }, value: 1 },
        { name: '发布时间', field: 'create_time', type: 'date_time', opts: { required: false }, value: '' },
        { name: '正文', field: 'content', opts: { required: true, height: 800 }, type: 'editor' }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
