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
import { isSuperAdmin } from '@/utils'

export default {
  name: 'AddForm',
  mixins: [customFromMixin],
  data() {
    var siteID = this.$store.getters.userinfo.site_id
    var isMain = siteID == 1

    return {
      rules: {},
      // 列配置
      columns: [
        { name: '名称', field: 'name', opts: { maxlength: 50 } },
        { name: '价格', field: 'price', opts: { required: true, precision: 2 }, type: 'number' },
        {
          name: '流量', field: 'flow', opts: { required: true }, type: 'number', visible(formData) {
            return formData.type === 1
          }
        },
        {
          name: '赠送流量', field: 'give_flow', opts: { required: true }, type: 'number', visible(formData) {
            return formData.type === 1
          }
        },
        {
          name: '时间（秒）', field: 'second', opts: { required: true }, type: 'number', visible(formData) {
            return formData.type === 2
          }
        },
        { name: '购买次数', field: 'buy_total', opts: { required: true }, type: 'number' },
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
        { name: 'VIP', field: 'is_vip', type: 'switch', opts: { required: true } },
        { name: '是否可退', field: 'allow_refund', type: 'switch', opts: { required: true } },
        { name: '类型', field: 'type', type: 'radio', opts: { required: true }, label: true },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }, value: 1 },
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
