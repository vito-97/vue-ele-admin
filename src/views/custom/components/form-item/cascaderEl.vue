<template>
  <el-cascader
    v-model="formData[col.field]"
    :options="list"
    :disabled="col.opts.disabled"
    :clearable="col.opts.clearable"
    :multiple="col.opts.multiple"
    :filterable="col.opts.filterable"
    :placeholder="col.placeholder"
    :props="{
             value:col.opts.value,
             label:col.opts.label,
             children:col.opts.children,
             multiple:col.opts.children_multiple
             }"
  >

  </el-cascader>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'CascaderEl',
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
