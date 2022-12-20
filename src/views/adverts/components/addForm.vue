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
        { name: '标题', field: 'title', opts: { required: true, maxlength: 50 } },
        {
          name: '图片',
          field: 'image',
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
        { name: '链接', field: 'link', opts: { required: true, maxlength: 255 } },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }, value: 1 },
        { name: '正文', field: 'content', opts: { required: true, maxlength: 255 }, type: 'editor' }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
