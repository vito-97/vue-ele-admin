<template>
  <el-radio-group
    v-model="formData[col.field]"
    :disabled="col.opts.disabled"
    :text-color="col.opts.text_color"
  >
    <el-radio
      :label="getListItemValue(it,i)"
      :name="col.field"
      v-for="(it,i) in col.list"
      :key="i">
      {{ getListItemLabel(it, i) }}
    </el-radio>
  </el-radio-group>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'RadioEl',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        text_color: null
      }
    }
  }
}
</script>

<style scoped>

</style>
