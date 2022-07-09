<template>
  <el-color-picker
    v-model="formData[col.field]"
    :disabled="col.opts.disabled"
    :show-alpha="col.opts.show_alpha"
    :color-format="col.opts.color_format"
  >
  </el-color-picker>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'ColorEl',
  mixins: [formItemMixin],
  alias: '颜色选择器',
  data() {
    return {
      opts: {
        show_alpha: false,
        color_format: 'hex'
      }
    }
  }
}
</script>

<style scoped>

</style>
