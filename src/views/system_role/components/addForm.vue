<template>
  <div>
    <custom-form
:visible.sync="Visible"
              :columns="columns"
              :detail.sync="detail"
              :id="id"
              :list="list"
              :rules="rules"
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
        { field: 'name', name: '名称', opts: { maxlength: 30, required: true }},
        { field: 'key', name: '标识', opts: { maxlength: 15, required: true }},
        { field: 'auth_ids', name: '权限', label: 'auth', opts: { required: true, control: 'system_auth', label_field: 'name', label_value: 'id' }, type: 'checkbox' },
        { field: 'mark', name: '备注', opts: { maxlength: 120, required: true }}
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
