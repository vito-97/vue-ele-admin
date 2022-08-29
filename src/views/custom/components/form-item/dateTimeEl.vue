<template>
  <el-date-picker
    placeholder="选择日期时间"
    v-model="formData[field]"
    :disabled="opt.disabled"
    :readonly="opt.readonly"
    :editable="opt.editable"
    :clearable="opt.clearable"
    :start-placeholder="opt.start_placeholder"
    :end-placeholder="opt.end_placeholder"
    :type="opt.type"
    :format="opt.format"
    :name="field"
    :picker-options="opt.picker_options"
    :value-format="opt.format"
    :default-time="opt.defaultTime"
    style="width: 100%;"
  >
  </el-date-picker>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'DateTimeEl',
  alias: '日期时间',
  mixins: [formItemMixin],
  data() {
    const isRange = this.column.opts.is_range
    return {
      opts: {
        start_placeholder: '请选择开始时间',
        end_placeholder: '请选择结束时间',
        type: 'datetime' + (isRange ? 'range' : ''),
        format: 'yyyy-MM-dd HH:mm:ss',
        is_range: false,
        picker_options: {},
        defaultTime: null
      }
    }
  }
}
</script>

<style scoped>

</style>
