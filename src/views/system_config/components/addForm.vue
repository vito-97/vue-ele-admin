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
import formItemCom from '@/utils/form-item'

const MUST_LIST_ITEM = []

for (let [key, item] of Object.entries(formItemCom)) {
  if (item.list) {
    MUST_LIST_ITEM.push(key)
  }
}

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
          type: 'select',
          value: 'input'
        },
        {
          name: '验证规则',
          field: 'validate',
          opts: { required: false, multiple: true },
          list: {
            require: '必填',
            isNotEmpty: '不能为空',
            email: '邮箱',
            mobile: '手机号',
            idCard: '身份证',
            checkPassword: '密码',
            number: '数字',
            integer: '整数',
            isPositiveInteger: '正整数',
            float: '浮点数',
            date: '日期',
            url: '链接',
            alpha: '纯字母',
            alphaNum: '字母和数字',
            alphaDash: '字母和数字，下划线_及破折号-',
            chs: '汉字',
            chsAlpha: '汉字和字母',
            chsAlphaNum: '汉字、字母和数字',
            chsDash: '汉字、字母、数字和下划线_及破折号-',
            lower: '小写字符',
            upper: '大写字符',
            checkIDArray: '整数型数字数组',
            checkSwitch: '开关',
            activeUrl: '有效的域名或者IP',
            macAddr: 'MAC地址',
            zip: '邮政编码',
            boolean: '布尔值',
            array: '数组'
          },
          type: 'select'
        },
        { name: '变量键', field: 'key', add_opts: { required: true, maxlength: 50 }, edit_opts: { readonly: true } },
        { name: '变量值', field: 'value', opts: { required: false } },
        {
          name: '变量选项',
          field: 'list',
          opts: { required: true },
          type: 'textarea',
          placeholder: '请输入变量选项 例：\r\na|A选项\r\nb|B选项\r\nc|C选项',
          visible(formData, detail) {
            return MUST_LIST_ITEM.includes(formData.type || '')
          }
        },
        { name: '变量配置项', field: 'opts', opts: { required: false }, type: 'textarea', placeholder: '请输入变量配置项' },
        {
          name: '分类',
          field: 'system_config_tab_id',
          opts: { required: true, control: 'system_config_tab', name: 'name' },
          type: 'select_table',
          edit_opts: { disabled: false }
        },
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
