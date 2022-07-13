<template>
  <el-input-number
    v-model.number="formData[field]"
    :placeholder="col.placeholder"
    :disabled="opt.disabled"
    :readonly="opt.readonly"
    :min="opt.min"
    :max="opt.max"
    :step="opt.step"
    :precision="opt.precision"
    :step-strictly="opt.step_strictly"
    :controls="opt.controls"
    :name="field"
  >
  </el-input-number>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'NumberEl',
  alias: '计数器',
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
