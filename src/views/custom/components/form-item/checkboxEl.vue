<template>
  <el-checkbox-group
v-model="formData[col.field]"
                     :disabled="col.opts.disabled"
                     :min="col.opts.min"
                     :max="col.opts.max"
                     :text-color="col.opts.text_color"
  >
    <el-checkbox
:label="getListItemValue(it,i)"
                 :value="getListItemValue(it,i)"
                 :name="col.field"
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
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        min: 0,
        max: 0,
        text_color: null
      }
    }
  }
}
</script>

<style scoped>

</style>
