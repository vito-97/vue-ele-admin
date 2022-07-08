<template>
  <el-input
    type="textarea"
    v-model="formData[col.field]"
    :placeholder="col.placeholder"
    :minlength="col.opts.minlength"
    :maxlength="col.opts.maxlength"
    :show-word-limit="col.opts.show_word_limit"
    :clearable="col.opts.clearable"
    :show-password="col.opts.show_password"
    :disabled="col.opts.disabled"
    :readonly="col.opts.readonly"
    :name="col.field"
    :rows="col.opts.rows"
  >

  </el-input>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'TextareaEl',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        rows: 2,
        show_word_limit: false,
        show_password: false
      }
    }
  }
}
</script>

<style scoped>

</style>
