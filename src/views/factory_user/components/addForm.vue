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
  data: () => {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '账号', field: 'username', opts: { required: true, maxlength: 20 }},
        { name: '密码', field: 'password', add_opts: { required: true }},
        { name: '昵称', field: 'nickname', opts: { required: true, maxlength: 20 }},
        { name: '姓名', field: 'real_name', opts: { required: false, maxlength: 20 }},
        /*        {
          name: '性别',
          field: 'sex',
          label: true,
          type: 'radio',
          opts: { required: true },
          edit_opts: { required: false }
        },*/
        // { name: '头像', field: 'avatar', type: 'upload_image' },
        // { name: '手机号', field: 'tel' },
        // { name: '邮箱', field: 'email' },
        // {
        //   name: '类型',
        //   field: 'type',
        //   label: true,
        //   type: 'select',
        //   value: ENUM.user.type.agent.toString(),
        //   hidden:true,
        //   opts: { disabled: true }
        // },
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
