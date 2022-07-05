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
        { name: '名称', field: 'name', opts: { required: true, maxlength: 50 }},
        { name: '满减金额', field: 'full_minus', type: 'number', opts: { required: true }, value: 0 },
        { name: '优惠金额', field: 'money', type: 'number', opts: { required: true }, value: 0 },
        { name: '无限张', field: 'is_infinite', type: 'switch', opts: { required: true }, value: 0 },
        { name: '发放数量', field: 'total', type: 'number', opts: { required: true }, value: 0 },
        { name: '限制领取', field: 'limit', type: 'number', opts: { required: true }, value: 0 },
        { name: '已领取量', field: 'issued_total', type: 'number', opts: { required: true }, value: 0 },
        { name: '排序', field: 'sort', type: 'number', opts: { required: true }, value: 0 },
        { name: '套餐', field: 'product_id', opts: { required: true, control: 'product', name: 'name' }, type: 'select_table' },
        { name: '运营商', field: 'agent_id', opts: { required: true, control: 'agent', name: 'nickname' }, type: 'select_table', edit_opts: { disabled: true }},
        { name: '领取时间', field: 'get_time', opts: { required: true, is_range: true }, type: 'date_time' },
        { name: '使用时间', field: 'use_time', opts: { required: true, is_range: true }, type: 'date_time' },
        // { name: '开始领取时间', field: 'get_start_time', opts: { required: true }, type: 'date_time' },
        // { name: '结束领取时间', field: 'get_end_time', opts: { required: true }, type: 'date_time' },
        // { name: '开始使用时间', field: 'use_start_time', opts: { required: true }, type: 'date_time' },
        // { name: '结束使用时间', field: 'use_end_time', opts: { required: true }, type: 'date_time' },
        { name: '领取有效期', field: 'coupon_day', type: 'number', opts: { required: true }, value: 0 },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }}
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
