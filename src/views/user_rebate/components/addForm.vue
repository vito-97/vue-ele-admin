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
        { name: '名称', field: 'name', opts: { maxlength: 50 }},
        { name: '价格', field: 'price', opts: { required: true }, type: 'number' },
        { name: '流量', field: 'flow', opts: { required: true }, type: 'number' },
        { name: '赠送流量', field: 'give_flow', opts: { required: true }, type: 'number' },
        { name: '购买次数', field: 'buy_total', opts: { required: true }, type: 'number' },
        { name: '运营商', field: 'agent_id', opts: { required: true, control: 'agent', name: 'nickname' }, type: 'select_table', edit_opts: { disabled: true }},
        { name: 'VIP', field: 'is_vip', type: 'switch', opts: { required: true }},
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }},
        { name: '备注', field: 'mark', type: 'textarea', opts: { maxlength: 120 }}
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
