<template>
  <el-checkbox-group
    v-model="formData[col.field]"
    :indeterminate="col.opts.indeterminate"
    :disabled="col.opts.disabled"
    :min="col.opts.min"
    :max="col.opts.max"
    :text-color="col.opts.text_color"
  >
    <el-checkbox
      :label="getListItemValue(it,i)"
      :name="col.field"
      v-for="(it,i) in col.list"
      :key="i">
      {{ getListItemLabel(it, i) }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'CheckboxEl',
  alias: '多选框',
  list: true,
  mixins: [formItemMixin],
  data() {
    return {
      formDataValueType: 'array',
      opts: {
        min: 0,
        max: Infinity,
        text_color: null,
        indeterminate: false
      }
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
