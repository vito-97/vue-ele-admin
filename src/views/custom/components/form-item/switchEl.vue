<template>
  <el-switch
    v-model="formData[field]"
    :disabled="opt.disabled"
    :active-icon-class="opt.active_icon"
    :inactive-icon-class="opt.inactive_icon"
    :active-text="opt.active_text"
    :inactive-text="opt.inactive_text"
    :active-value="opt.active_value"
    :inactive-value="opt.inactive_value"
    :active-color="opt.active_color"
    :inactive-color="opt.inactive_color"
    :width="opt.width"
    :name="field"
  >

  </el-switch>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'SwitchEl',
  alias: '开关',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        width: 40,
        // 图标
        active_icon: null,
        inactive_icon: null,

        // 文字描述
        active_text: null,
        inactive_text: null,

        // 值
        active_value: 1,
        inactive_value: 0,

        // 颜色
        active_color: '#409EFF',
        inactive_color: '#C0CCDA'
      }
    }
  }
}
</script>

<style scoped>

</style>
