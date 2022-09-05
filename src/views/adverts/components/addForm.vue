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
import { isSuperAdmin } from '@/utils'

export default {
  name: 'AddForm',
  mixins: [visible, customFromMixin],
  data() {
    var siteID = this.$store.getters.userinfo.site_id
    var isMain = siteID == 1
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
          name: isMain ? '运营商' : '水厂',
          field: 'agent_id',
          opts: { required: true, control: isMain ? 'agent' : 'waterworks', name: 'nickname', key: 'agent' },
          type: 'select_table',
          edit_opts: { disabled: false },
          visible(formData) {
            return !formData.site_id || formData.site_id === 1
          }
        },
        (isSuperAdmin(this.$store.getters.role) ? {
          name: '水厂',
          field: 'agent_id',
          opts: { required: true, control: 'waterworks', name: 'nickname', key: 'agent' },
          type: 'select_table',
          edit_opts: { disabled: false },
          visible(formData) {
            return formData.site_id === 2
          }
        } : null),
        {
          field: 'site_id',
          name: '站点',
          list: { 1: '居科乐', 2: '市政' },
          type: 'radio',
          opts: { required: true },
          edit_opts: { disabled: true },
          value: 1,
          visible(formData, detail) {
            return isSuperAdmin(this.$store.getters.role)
          }
        },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }, value: 1 }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
