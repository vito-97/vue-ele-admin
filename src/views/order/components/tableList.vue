<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      :selectable="selectable"
      :deletable="deletable"
      :row-btn="rowBtn"
      v-bind="$attrs"
      v-on="listeners"
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
    >
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'
import ENUM from '@/utils/enum'
import { showLoading, hideLoading } from '@/utils'

export default {
  data() {
    return {
      columns: [
        // { name: '标题', field: 'title', width: 120 },
        { name: '用户', field: 'user.nickname', width: 150 },
        { name: '运营商', field: 'agent.nickname', width: 150 },
        { name: '套餐名称', field: 'product_snap.name', width: 150 },
        { name: '设备号', field: 'device.device_no' },
        // { name: '充值金额', field: 'money', before: '￥', type: 'tag', opts: { type: 'primary' } },
        { name: '充值流量', field: 'flow', after: 'L', type: 'tag', opts: { type: 'success' } },
        { name: '充值时间', field: 'second', after: '秒', type: 'tag', opts: { type: 'success' } },
        { name: '订单金额', field: 'price', before: '￥', type: 'tag', opts: { type: 'primary' }, width: 100 },
        { name: '支付金额', field: 'pay_price', before: '￥', type: 'tag', opts: { type: 'danger' }, width: 100 },
        { name: '状态', field: 'status', label: true, type: 'tag', opts: {} },
        // { name: '待退金额', field: 'refund_money', before: '￥', type: 'tag', opts: { type: 'warning' } },
        { name: '已退金额', field: 'refund_amount', before: '￥', type: 'tag', opts: { type: 'warning' } },
        { name: '订单号', field: 'order_no', width: 200 },
        { name: '第三方订单号', field: 'outer_trade_no', width: 200 },
        { name: '订单类型', field: 'type', label: true, width: 100 },
        { name: '支付类型', field: 'channel_type', label: true, width: 100 },
        { name: '备注', field: 'mark', width: 150, type: 'content' },
        { name: '退款备注', field: 'refund_mark', width: 150, type: 'content' },
        { name: '退款失败备注', field: 'refund_error_mark', width: 150, type: 'content' },
        { name: '支付时间', field: 'pay_time', width: 150, type: 'time' },
        { name: '添加时间', field: 'create_time', width: 150 }
      ]
    }
  },
  components: {},
  mixins: [
    tableMixin
  ],
  computed: {
    rowBtn() {
      const btn = [
        {
          name: '退款',
          auth: this.getFullAuth('refund'),
          key: 'refund',
          confirm: '请输入退款原因！',
          // placeholder: '退款原因',
          // input: 'textarea',
          input: function (row) {
            let max = Number((row.pay_price - row.refund_amount).toFixed(2))
            return [
              {
                name: '退款金额', field: 'refund_money', type: 'number', opts: {
                  precision: 2,
                  min: 0.01,
                  max,
                  required: true
                },
                value: max
              },
              { name: '退款原因', field: 'mark', type: 'textarea' }
            ]
          },
          show: function (row, index) {
            let orderStatus = ENUM.order.status
            return row.status == orderStatus.paid || (row.status == orderStatus.refund && row.pay_price > row.refund_amount)
          }
        }
      ]

      console.log(btn)

      return btn
    }
  },
  props: {},
  filters: {},
  created() {
  },
  methods: {
    deletable(row, index) {
      return ![1, 4, 5].includes(row.status)
    },
    selectable(row, index) {
      return ![1, 4, 5].includes(row.status)
    },
    // 退款
    onTapRowBtnRefund(row, index, data) {
      showLoading('退款中...')
      this.curd.post('refund', { id: row.id, ...data }).then(res => {
        hideLoading()
        this.onTapHeadBtnFlush()
        this.$message({
          message: res.msg,
          type: 'success'
        })
      }, hideLoading)
    }
  }
}
</script>

<style lang="scss">

</style>
