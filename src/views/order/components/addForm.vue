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
        { name: '标题', field: 'title', opts: { maxlength: 100, required: true } },
        { name: '订单号', field: 'order_no', opts: { required: true, maxlength: 30 }, edit_opts: { readonly: true } },
        {
          name: '第三方订单号',
          field: 'outer_trade_no',
          opts: { required: true, maxlength: 30 },
          edit_opts: { readonly: true }
        },
        // { name: '充值金额', field: 'money', opts: { required: true, precision: 2 }, type: 'number' },
        { name: '充值时间', field: 'second', opts: { required: false }, type: 'number' },
        { name: '充值流量', field: 'flow', opts: { required: true }, type: 'number' },
        { name: '订单金额', field: 'price', opts: { required: true, precision: 2 }, type: 'number' },
        { name: '支付金额', field: 'pay_price', opts: { required: true, precision: 2 }, type: 'number' },
        { name: '退款金额', field: 'refund_money', opts: { required: true, precision: 2 }, type: 'number' },
        { name: '套餐', field: 'product_id', opts: { required: true, control: 'product', name: 'name' }, type: 'select_table' },
        { name: '用户', field: 'user_id', opts: { required: true, control: 'user', name: 'nickname' }, type: 'select_table' },
        { name: '运营商', field: 'agent_id', opts: { required: true, control: 'agent', name: 'nickname' }, type: 'select_table', edit_opts: { disabled: false } },
        { name: '类型', field: 'type', label: true, type: 'radio', opts: { required: true } },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true } },
        { name: '备注', field: 'mark', opts: { maxlength: 120 }, type: 'textarea' },
        { name: '退款备注', field: 'refund_mark', opts: { maxlength: 100 }, type: 'textarea' },
        { name: '退款失败备注', field: 'refund_error_mark', opts: { maxlength: 100 }, type: 'textarea' }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
