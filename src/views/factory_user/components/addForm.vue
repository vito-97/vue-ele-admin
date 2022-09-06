<template>
  <div>
    <custom-form
      :columns="columns"
      :detail.sync="detail"
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
  data: () => {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '账号', field: 'username', opts: { required: true, maxlength: 20 } },
        { name: '密码', field: 'password', add_opts: { required: true } },
        { name: '昵称', field: 'nickname', opts: { required: true, maxlength: 20 } },
        { name: '姓名', field: 'real_name', opts: { required: false, maxlength: 20 } },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }, value: 1 },
        { name: '备注', field: 'mark', type: 'textarea', opts: { maxlength: 120 } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
