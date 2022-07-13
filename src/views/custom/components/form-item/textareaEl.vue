<template>
  <el-input
    type="textarea"
    v-model="formData[field]"
    :placeholder="col.placeholder"
    :minlength="opt.minlength"
    :maxlength="opt.maxlength"
    :show-word-limit="opt.show_word_limit"
    :clearable="opt.clearable"
    :show-password="opt.show_password"
    :disabled="opt.disabled"
    :readonly="opt.readonly"
    :name="field"
    :rows="opt.rows"
    :autosize="opt.autosize"
  >

  </el-input>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'TextareaEl',
  alias: '多行文本',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        rows: 2,
        show_word_limit: false,
        show_password: false,
        autosize: true
      }
    }
  }
}
</script>

<style scoped>

</style>
