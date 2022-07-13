<template>
  <el-cascader
    v-model="formData[field]"
    :options="col.list"
    :disabled="opt.disabled"
    :clearable="opt.clearable"
    :multiple="opt.multiple"
    :filterable="opt.filterable"
    :placeholder="col.placeholder"
    :props="{
             value:opt.value,
             label:opt.label,
             children:opt.children,
             multiple:opt.children_multiple
             }"
  >

  </el-cascader>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'CascaderEl',
  alias: '级联选择器',
  list: true,
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        multiple: false,
        filterable: false,
        label: 'label',
        value: 'value',
        children: 'children',
        children_multiple: false
      }
    }
  }
}
</script>

<style scoped>

</style>
