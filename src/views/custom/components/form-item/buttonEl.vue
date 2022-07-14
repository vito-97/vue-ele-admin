<template>
  <el-button
    :disabled="opt.disabled"
    :type="opt.type"
    :size="opt.size"
    :plain="opt.plain"
    :round="opt.round"
    :circle="opt.circle"
    :loading="opt.loading"
    :icon="opt.icon"
    :autofocus="opt.autofocus"
    :native-type="opt.native_type"
    :style="opt.style"
    @click="onClick"
  >
    {{ opt.btn_text || col.name }}
  </el-button>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'ButtonEl',
  mixins: [formItemMixin],
  alias: '按钮',
  data() {
    return {
      opts: {
        disabled: false,
        btn_text: '',
        type: 'primary',
        size: '',
        plain: false,
        round: false,
        circle: false,
        loading: false,
        icon: '',
        autofocus: false,
        native_type: 'button',
        style: {}
      }
    }
  },
  methods: {
    onClick() {
      this.triggerEvent('click')
    }
  }
}
</script>

<style scoped>

</style>
