<template>
  <el-checkbox-group
    v-model="formData[field]"
    :indeterminate="opt.indeterminate"
    :disabled="opt.disabled"
    :min="opt.min"
    :max="opt.max"
    :text-color="opt.text_color"
  >
    <el-checkbox
      :label="getListItemValue(it,i)"
      :name="field"
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
