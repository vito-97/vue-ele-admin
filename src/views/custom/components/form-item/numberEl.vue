<template>
  <el-input-number
    v-model.number="formData[col.field]"
    :type="col.input_type"
    :placeholder="col.placeholder"
    :disabled="col.opts.disabled"
    :readonly="col.opts.readonly"
    :min="col.opts.min"
    :max="col.opts.max"
    :step="col.opts.step"
    :precision="col.opts.precision"
    :step-strictly="col.opts.step_strictly"
    :controls="col.opts.controls"
    :name="col.field"
  >
  </el-input-number>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'NumberEl',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        // 数值精度
        precision: null,
        // 步长
        step: 1,
        min: -Infinity,
        max: Infinity,
        // 是否只能输入step倍数
        step_strictly: false,
        // 控制按钮
        controls: true
      }
    }
  }
}
</script>

<style scoped>

</style>
