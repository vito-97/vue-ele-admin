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
        { name: '标题', field: 'title', opts: { required: true, maxlength: 100 }},
        { name: '费用', field: 'amount', type: 'number', opts: { required: true }, value: 0 },
        { name: '运营商', field: 'agent_id', opts: { required: true, control: 'agent', name: 'nickname' }, type: 'select_table', edit_opts: { disabled: true }},
        { name: '是否支付', field: 'status', label: true, type: 'switch', opts: { required: true }},
        { name: '日期', field: 'time', type: 'date' },
        { name: '备注', field: 'mark', type: 'textarea', opts: { required: true, maxlength: 100 }}
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
