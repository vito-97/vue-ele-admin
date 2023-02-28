<template>
  <div>
    <div v-for="(item,index) in val2array" :key="index">
      <el-tag type="primary" effect="dark" size="mini">{{ item[opt.label] }}</el-tag>
      <el-tag type="primary" size="mini" v-for="(it,idx) in item[opt.value]" :key="idx">{{ it }}</el-tag>
    </div>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'TagEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {
        label: 'name',
        value: 'list'
      }
    }
  },
  filters: {},
  methods: {}
}
</script>

<style scoped>

</style>
