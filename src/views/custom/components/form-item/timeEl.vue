<template>
  <el-time-picker
    placeholder="选择时间"
    v-model="formData[col.field]"
    :disabled="col.opts.disabled"
    :readonly="col.opts.readonly"
    :editable="col.opts.editable"
    :clearable="col.opts.clearable"
    :start-placeholder="col.opts.start_placeholder"
    :end-placeholder="col.opts.end_placeholder"
    :value-format="col.opts.format"
    :is-range="col.opts.is_range"
    :name="col.field"
    :arrow-control="col.opts.arrow_control"
    :picker-options="col.opts.picker_options"
    style="width: 100%;"
  >

  </el-time-picker>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'TimeEl',
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
