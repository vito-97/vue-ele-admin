<template>
  <el-input
    v-model="formData[field]"
    :type="opt.input_type"
    :placeholder="col.placeholder"
    :minlength="opt.minlength"
    :maxlength="opt.maxlength"
    :show-word-limit="opt.show_word_limit"
    :clearable="opt.clearable"
    :show-password="opt.show_password"
    :disabled="opt.disabled"
    :readonly="opt.readonly"
    :prefix-icon="opt.prefix_icon"
    :suffix-icon="opt.suffix_icon"
    :min="opt.min"
    :max="opt.max"
    :step="opt.step"
    :name="field"
  >
  </el-input>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'InputEl',
  alias: '输入框',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        show_word_limit: false,
        show_password: false,
        input_type: 'text',
        prefix_icon: '',
        suffix_icon: '',
        step: 1
      }
    }
  }
}
</script>

<style scoped>

</style>
