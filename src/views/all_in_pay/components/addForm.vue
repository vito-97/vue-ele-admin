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
        { name: '名称', field: 'name', opts: { maxlength: 50, required: true } },
        { name: 'APP ID', field: 'app_id', opts: { required: true } },
        { name: 'CUS ID', field: 'cus_id', opts: { required: true } },
        { name: '已收款', field: 'amount', opts: { required: true }, type: 'number' },
        { name: '已退款', field: 'refund_amount', opts: { required: true }, type: 'number' },
        { name: '运营商', field: 'agent_id', opts: { required: true, control: 'agent', name: 'nickname' }, type: 'select_table', edit_opts: { disabled: false } },
        { name: '公钥', field: 'public_key', opts: { required: true, rows: 4 }, type: 'textarea' },
        { name: '私钥', field: 'private_key', opts: { required: true, rows: 6 }, type: 'textarea' },
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
