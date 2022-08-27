<template>
  <el-tag :type="val ? opt.active_type : opt.inactive_type" size="small">{{
      val ? opt.active_text : opt.inactive_text
    }}
  </el-tag>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'SwitchTextEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {
        active_text: '是',
        inactive_text: '否',
        active_type: 'primary',
        inactive_type: 'info'
      }
    }
  },
  list(opts) {
    return [opts.inactive_text || '否', opts.active_text || '是']
  },
  filters: {},
  methods: {}
}
</script>

<style scoped>

</style>
