<template>
  <el-date-picker
    placeholder="选择日期"
    v-model="formData[col.field]"
    :disabled="col.opts.disabled"
    :readonly="col.opts.readonly"
    :editable="col.opts.editable"
    :clearable="col.opts.clearable"
    :start-placeholder="col.opts.start_placeholder"
    :end-placeholder="col.opts.end_placeholder"
    :type="col.type"
    :format="col.opts.format"
    :name="col.field"
    :picker-options="col.opts.picker_options"
    :value-format="col.opts.format"
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
