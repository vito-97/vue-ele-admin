<template>
  <el-switch
    v-model="formData[col.field]"
    :disabled="col.opts.disabled"
    :active-icon-class="col.opts.active_icon"
    :inactive-icon-class="col.opts.inactive_icon"
    :active-text="col.opts.active_text"
    :inactive-text="col.opts.inactive_text"
    :active-value="col.opts.active_value"
    :inactive-value="col.opts.inactive_value"
    :active-color="col.opts.active_color"
    :inactive-color="col.opts.inactive_color"
    :width="col.opts.width"
    :name="col.field"
  >

  </el-switch>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'SwitchEl',
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
