<template>
  <div>
    <custom-form
      :columns="columns"
      :rules="rules"
      v-bind="$attrs"
      v-on="$listeners"
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
        {
          name: '现金券',
          field: 'coupon_id',
          opts: { required: true, control: 'cash_coupon', name: 'name', key: 'coupon' },
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
