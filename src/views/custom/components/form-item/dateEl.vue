<template>
  <el-date-picker
    placeholder="选择日期"
    v-model="formData[field]"
    :disabled="opt.disabled"
    :readonly="opt.readonly"
    :editable="opt.editable"
    :clearable="opt.clearable"
    :start-placeholder="opt.start_placeholder"
    :end-placeholder="opt.end_placeholder"
    :type="col.type"
    :format="opt.format"
    :name="field"
    :picker-options="opt.picker_options"
    :value-format="opt.format"
    style="width: 100%;"
  >

  </el-date-picker>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'DateEl',
  alias: '日期',
  mixins: [formItemMixin],
  data() {
    const isRange = this.column.opts.is_range
    return {
      opts: {
        start_placeholder: '请选择开始时间',
        end_placeholder: '请选择结束时间',
        type: 'date' + (isRange ? 'range' : ''),
        format: 'yyyy-MM-dd',
        is_range: false,
        picker_options: {}
      }
    }
  }
}
</script>

<style scoped>

</style>
