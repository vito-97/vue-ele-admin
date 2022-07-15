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
        { name: '卡号', field: 'card_no', opts: { required: true, maxlength: 20 }, value: '' },
        { name: '余额', field: 'money', type: 'number', opts: { required: true }, value: 0 },
        { name: '用户', field: 'user_id', opts: { required: true, control: 'user', name: 'nickname' }, type: 'select_table' },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true } },
        { name: '使用时间', field: 'use_time', type: 'date_time' },
        { name: '备注', field: 'mark', type: 'textarea', opts: { required: true, maxlength: 100 } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
