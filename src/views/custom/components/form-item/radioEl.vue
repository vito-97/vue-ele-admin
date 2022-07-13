<template>
  <el-radio-group
    v-model="formData[field]"
    :disabled="opt.disabled"
    :text-color="opt.text_color"
  >
    <el-radio
      :label="getListItemValue(it,i)"
      :name="field"
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
  alias: '单选框',
  list: true,
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
