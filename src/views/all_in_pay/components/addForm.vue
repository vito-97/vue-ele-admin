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
        { name: '名称', field: 'name', opts: { maxlength: 50, required: true } },
        { name: 'APP ID', field: 'app_id', opts: { required: true } },
        { name: 'CUS ID', field: 'cus_id', opts: { required: true } },
        { name: '已收款', field: 'amount', opts: { required: true }, type: 'number' },
        { name: '已退款', field: 'refund_amount', opts: { required: true }, type: 'number' },
        // { name: '运营商', field: 'agent_id', opts: { required: true, control: 'agent', name: 'nickname' }, type: 'select_table', edit_opts: { disabled: false } },
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
        { name: '公钥', field: 'public_key', opts: { required: true, rows: 4 }, type: 'textarea' },
        { name: '私钥', field: 'private_key', opts: { required: true, rows: 6 }, type: 'textarea' },
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
