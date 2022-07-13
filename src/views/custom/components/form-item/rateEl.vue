<template>
  <el-rate
    v-model="formData[field]"
    :disabled="opt.disabled"
    :max="opt.max"
    :low-threshold="opt.low_threshold"
    :high-threshold="opt.high_threshold"
    :allow-half="opt.allow_half"
    :colors="opt.colors"
    :name="field"
  ></el-rate>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'RateEl',
  alias: '评分',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        max: 5,
        low_threshold: 2,
        high_threshold: 4,
        allow_half: false,
        colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A']
      }
    }
  }
}
</script>

<style scoped>

</style>
