<template>
  <div>
    <custom-form
      :columns="columns"
      :id="id"
      :list="list"
      :rules="rules"
      :dialog="false"
      :error="error"
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
        { name: '账号', field: 'username', opts: { maxlength: 20, disabled: true } },
        { name: '密码', field: 'password', opts: { maxlength: 20 }, type: 'password', placeholder: '不修改留空' },
        {
          name: '头像',
          field: 'avatar',
          opts: {
            required: false,
            control: 'attachment',
            name: 'link',
            pk: 'url',
            query: { category: 'image' },
            format: 'image'
          },
          type: 'select_table'
        },
        { name: '昵称', field: 'nickname', opts: { required: true, maxlength: 20 } },
        { name: '手机号', field: 'tel', opts: { required: false, input_type: 'tel' } },
        { name: '邮箱', field: 'email', opts: { required: false, input_type: 'email' } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
