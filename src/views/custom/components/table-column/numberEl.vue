<template>
  <el-input-number v-model="old" @blur="onBlur" @change="onChange" v-bind="opt" size="small" @click.stop="onClick"></el-input-number>
</template>

<script>
import tableColumnMixin from './table-column-mixin'
import { debounce } from '@/utils'

export default {
  name: 'NumberEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {},
      old: 0
    }
  },
  created() {
    this.old = this.val
  },
  computed: {
    updateDebounce() {
      return debounce(this.updateItem, 1000)
    }
  },
  methods: {
    onBlur() {
      this.updateDebounce()
    },
    onChange() {
      this.updateDebounce()
    },
    updateItem() {
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
    },
    onClick() {

    }
  }
}
</script>

<style scoped>

</style>
