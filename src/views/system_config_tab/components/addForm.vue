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
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '名称', field: 'name', opts: { required: true, maxlength: 50 } },
        { name: '键名', field: 'key', opts: { required: true, maxlength: 30 } },
        { name: '图标', field: 'icon', opts: { required: false, maxlength: 30 }, type: 'icon' },
        { name: '排序', field: 'sort', type: 'number' },
        {
          name: '上级分类',
          field: 'pid',
          opts: { required: false, control: 'system_config_tab', name: 'name', key: 'parent', query: { without: 'children' } },
          type: 'select_table',
          edit_opts: { disabled: false },
          value: 0
        },
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
