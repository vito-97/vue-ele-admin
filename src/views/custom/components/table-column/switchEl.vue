<template>
  <el-switch
    :value="val"
    :active-icon-class="opt.active_icon"
    :inactive-icon-class="opt.inactive_icon"
    :active-text="opt.active_text"
    :inactive-text="opt.inactive_text"
    :active-value="opt.active_value"
    :inactive-value="opt.inactive_value"
    :active-color="opt.active_color"
    :inactive-color="opt.inactive_color"
    :disabled="opt.disable"
    :width="opt.width"
    @change="onChange"
  >
  </el-switch>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'SwitchEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {
        width: 40,
        // 图标
        active_icon: null,
        inactive_icon: null,

        disable: false,

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
  },
  created() {

  },
  methods: {
    onChange(value) {
      this.$emit('update-item',
        {
          id: this.id,
          field: this.field,
          index: this.index,
          value
        })
    }
  }
}
</script>

<style scoped>

</style>
