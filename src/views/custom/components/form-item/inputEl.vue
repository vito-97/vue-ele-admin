<template>
  <el-input
v-model="formData[col.field]"
            :type="col.input_type"
            :placeholder="col.placeholder"
            :minlength="col.opts.minlength"
            :maxlength="col.opts.maxlength"
            :show-word-limit="col.opts.show_word_limit"
            :clearable="col.opts.clearable"
            :show-password="col.opts.show_password"
            :disabled="col.opts.disabled"
            :readonly="col.opts.readonly"
            :min="col.opts.min"
            :max="col.opts.max"
            :name="col.field"
  >
  </el-input>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'InputEl',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        show_word_limit: false,
        show_password: false
      }
    }
  }
}
</script>

<style scoped>

</style>
