<template>
  <div>
    <custom-form
      :visible.sync="Visible"
      :columns="columns"
      :detail.sync="detail"
      :id="id"
      :list="list"
      :rules="rules"
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
        { field: 'name', name: '名称', opts: { maxlength: 50, required: true } },
        { field: 'route', name: '路由', opts: { maxlength: 60, required: true } },
        {
          field: 'pid',
          name: '父级',
          opts: { required: false, control: 'system_auth', name: 'name', query: { pid: 0 } },
          type: 'select_table'
        },
        { field: 'module', name: '模块', label: true, opts: { required: true }, type: 'select' },
        { field: 'sort', name: '排序', type: 'number', opts: { max: 255, required: true } },
        { field: 'status', name: '状态', label: true, type: 'radio', opts: { required: true }, value: 1 },
        { field: 'mark', name: '备注', opts: { maxlength: 120, required: false } }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
