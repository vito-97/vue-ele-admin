<template>
  <div>
    <custom-form
      :columns="columns"
      :rules="rules"
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
        {
          name: '父级',
          field: 'pid',
          opts: {
            label_field: 'name', label_value: 'id', check: (formData, it) => {
              return this.detail.id != it.id
            },
            disabled: (formData) => {
              return !!this.detail?.children?.length
            }
          },
          type: 'select',
          label: 'top',
          value: 0
        },
        { name: '名称', field: 'name', opts: { required: true, maxlength: 50 } },
        { name: '标识', field: 'index', opts: { required: true, maxlength: 20 } },
        {
          name: '排序',
          field: 'sort',
          opts: { required: true, max: 255 },
          value: 0,
          type: 'number',
          placeholder: '倒序排序'
        },
        { name: '链接', field: 'link', opts: { maxlength: 255 } },
        { name: '单文章', field: 'single', type: 'switch', opts: { required: true }, value: 0, placeholder: '只显示一篇文章' },
        { name: '展示', field: 'is_show', type: 'switch', opts: { required: true }, value: 1 },
        { name: '状态', field: 'status', label: true, type: 'radio', opts: { required: true }, value: 1 }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>
