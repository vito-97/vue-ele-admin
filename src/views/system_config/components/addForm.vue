<template>
  <div>
    <custom-form
      :columns="columns"
      :rules="rules"
      v-model="formData"
      v-bind="$attrs"
      v-on="listeners"
    >

    </custom-form>
  </div>

</template>

<script>
import customFromMixin from '@/utils/mixin/custom-form'
import ENUM from '@/utils/enum'
import formItemCom from '@/utils/form-item'
import validateRules from '@/views/system_config/components/validateRules'

const MUST_LIST_ITEM = []

for (let [key, item] of Object.entries(formItemCom)) {
  if (item.list) {
    MUST_LIST_ITEM.push(key)
  }
}

export default {
  name: 'AddForm',
  mixins: [customFromMixin],
  data() {
    return {
      rules: {},
      formData: {}
    }
  },
  computed: {
    defaultValueList() {
      var obj = {}
      var list = (this.formData?.list || '').replaceAll('\r\n', '\n').split('\n').filter(String)

      for (var item of list) {
        var [key = '', val = ''] = item.split('=')

        if (key !== '' && val !== '') {
          obj[key] = val
        }
      }

      return obj
    },
    columns() {
      return [
        { name: '名称', field: 'name', opts: { required: true, maxlength: 50 } },
        {
          name: '类型',
          field: 'type',
          opts: { required: true },
          list: ENUM.form_item,
          type: 'select',
          value: 'input'
        },
        {
          name: '验证规则',
          field: 'validate',
          opts: { required: false, multiple: true },
          list: validateRules,
          type: 'select'
        },
        { name: '变量键', field: 'key', add_opts: { required: true, maxlength: 50 }, edit_opts: { readonly: true } },
        {
          name: '变量值',
          field: 'value',
          opts: { required: this.formData?.validate?.includes('require') },
          type: this.formData?.type || 'input',
          list: this.defaultValueList
        },
        {
          name: '变量选项',
          field: 'list',
          opts: { required: true },
          type: 'textarea',
          placeholder: '请输入变量选项 例：\r\na=A选项\r\nb=B选项\r\nc=C选项',
          visible(formData, detail) {
            return MUST_LIST_ITEM.includes(formData.type || '')
          }
        },
        {
          name: '变量配置项',
          field: 'opts',
          opts: { required: false },
          type: 'textarea',
          placeholder: '请输入变量配置项'
        },
        {
          name: '分类',
          field: 'system_config_tab_id',
          opts: { required: true, control: 'system_config_tab', name: 'name' },
          type: 'select_table',
          edit_opts: { disabled: false }
        },
        // { name: '多语言', field: 'lang', type: 'switch', opts: { required: true }, value: 0 },
        { name: '状态', field: 'status', type: 'switch', opts: { required: true }, value: 1 },
        { name: '提示信息', field: 'placeholder', type: 'textarea', opts: { maxlength: 120 } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
