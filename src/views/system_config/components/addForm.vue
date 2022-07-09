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
import ENUM from '@/utils/enum'

export default {
  name: 'AddForm',
  mixins: [visible, customFromMixin],
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '名称', field: 'name', opts: { required: true, maxlength: 50 } },
        {
          name: '类型',
          field: 'type',
          opts: { required: true },
          list: ENUM.form_item,
          type: 'select'
        },
        { name: '变量键', field: 'key', add_opts: { required: true, maxlength: 50 }, edit_opts: { readonly: true } },
        { name: '变量值', field: 'value', opts: { required: false } },
        {
          name: '分类',
          field: 'system_config_tab_id',
          opts: { required: true, control: 'system_config_tab', name: 'title' },
          type: 'select_table',
          edit_opts: { disabled: false }
        },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true } },
        { name: '提示信息', field: 'desc', type: 'textarea', opts: { maxlength: 120 } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
