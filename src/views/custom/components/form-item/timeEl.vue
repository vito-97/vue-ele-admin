<template>
  <el-time-picker
    placeholder="选择时间"
    v-model="formData[field]"
    :disabled="opt.disabled"
    :readonly="opt.readonly"
    :editable="opt.editable"
    :clearable="opt.clearable"
    :start-placeholder="opt.start_placeholder"
    :end-placeholder="opt.end_placeholder"
    :value-format="opt.format"
    :is-range="opt.is_range"
    :name="field"
    :arrow-control="opt.arrow_control"
    :picker-options="opt.picker_options"
    style="width: 100%;"
  >

  </el-time-picker>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'TimeEl',
  alias: '时间',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        start_placeholder: '请选择开始时间',
        end_placeholder: '请选择结束时间',
        format: 'HH:mm:ss',
        is_range: false,
        arrow_control: false,
        picker_options: {}
      }
    }
  }
}
</script>

<style scoped>

</style>
