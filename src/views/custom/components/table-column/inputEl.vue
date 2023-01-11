<template>
  <el-input v-model="old" v-bind="opt" @blur="onBlur" @click.stop=""></el-input>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'InputEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {},
      old: ''
    }
  },
  created() {
    this.old = this.val
  },
  methods: {
    onBlur() {
      var value = this.old
      if (this.old != this.val) {
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
}
</script>

<style scoped>

</style>
