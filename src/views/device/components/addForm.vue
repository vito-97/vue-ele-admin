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
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '名称', field: 'name', opts: { required: true, maxlength: 50 } },
        { name: 'IMEI', field: 'imei', add_opts: { required: true }, edit_opts: { readonly: true } },
        { name: '经度', field: 'lng', opts: { required: false, maxlength: 20 } },
        { name: '纬度', field: 'lat', opts: { required: false, maxlength: 20 } },
        { name: '脉冲', field: 'l_to_pulse', type: 'number', opts: { required: true, max: 255 }, value: 0 },
        { name: '温度', field: 'temperature', type: 'number', opts: { required: true, max: 50 }, value: 0 },
        { name: '暂停定时停止时间', field: 'finish_timeout', type: 'number', opts: { required: true, max: 1000 }, value: 0 },
        // { name: '报障电话', field: 'tel' },
        { name: '地址', field: 'address', opts: { maxlength: 120 } },
        // { name: '全局套餐', field: 'used_global_product', type: 'switch', opts: { required: true } },
        {
          name: '运营商',
          field: 'agent_id',
          opts: { required: true, control: 'agent', name: 'nickname' },
          type: 'select_table',
          edit_opts: { disabled: false }
        },
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
        { name: '广告灯', field: 'adverts_light', label: true, type: 'switch', opts: { required: true } },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true } },
        {
          name: '禁用', field: 'disabled', label: true, type: 'switch', opts: { required: true }, visible() {
            return isSuperAdmin(this.$store.getters.role)
          }
        },
        { name: '备注', field: 'mark', type: 'textarea', opts: { maxlength: 120 } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
