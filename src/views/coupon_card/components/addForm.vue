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
        {
          name: '优惠券',
          field: 'coupon_id',
          opts: { required: true, control: 'coupon', name: 'name', key: 'coupon' },
          type: 'select_table',
          edit_opts: { disabled: true }
        },
        {
          name: '用户',
          field: 'user_id',
          opts: { required: true, control: 'user', name: 'nickname' },
          type: 'select_table',
          edit_opts: { disabled: true }
        },
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
