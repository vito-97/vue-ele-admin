<template>
  <el-slider
    v-model="formData[field]"
    :disabled="opt.disabled"
    :min="opt.min"
    :max="opt.max"
    :step="opt.step"
    :show-stops="opt.show_stops"
    :range="opt.range"
    :vertical="opt.vertical"
    :show-input="opt.show_input"
    :show-input-controls="opt.show_input_controls"
    :show-tooltip="opt.show_tooltip"
    :height="opt.height"
  >

  </el-slider>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'SliderEl',
  alias: '滑块',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        min: 0,
        max: 100,
        step: 1,
        // 是否显示输入框，仅在非范围选择时有效
        show_input: false,
        // 在显示输入框的情况下，是否显示输入框的控制按钮
        show_input_controls: true,
        // 是否显示间断点
        show_stops: false,
        // 是否显示 tooltip
        show_tooltip: true,
        // 是否为范围选择
        range: false,
        // 是否竖向模式
        vertical: false,
        // Slider 高度，竖向模式时必填
        height: 100
      }
    }
  }
}
</script>

<style scoped>

</style>
