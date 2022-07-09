<template>
  <el-rate
    v-model="formData[col.field]"
    :disabled="col.opts.disabled"
    :max="col.opts.max"
    :low-threshold="col.opts.low_threshold"
    :high-threshold="col.opts.high_threshold"
    :allow-half="col.opts.allow_half"
    :colors="col.opts.colors"
    :name="col.field"
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
