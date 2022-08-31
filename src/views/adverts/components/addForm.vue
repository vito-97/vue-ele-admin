<template>
  <div>
    <custom-form
      :visible.sync="Visible"
      :columns="columns"
      :detail.sync="detail"
      :id="id"
      :list="list"
      :rules="rules"
      :append-to-body="appendToBody"
      :error="error"
      @submit="onSubmit"
    >

    </custom-form>
  </div>

</template>

<script>
import visible from '@/utils/mixin/visible'
import customFromMixin from '@/utils/mixin/custom-form'

export default {
  name: 'AddForm',
  mixins: [visible, customFromMixin],
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '标题', field: 'title', opts: { required: true, maxlength: 50 } },
        // { name: '图片', field: 'image', opts: { required: true, maxlength: 255 }, type: 'upload_image' },
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
        // { name: '内容', field: 'content', opts: { required: true, maxlength: 255 }, type: 'editor' },
        {
          name: '运营商',
          field: 'agent_id',
          opts: { required: true, control: 'agent', name: 'nickname' },
          type: 'select_table',
          edit_opts: { disabled: false }
        },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
