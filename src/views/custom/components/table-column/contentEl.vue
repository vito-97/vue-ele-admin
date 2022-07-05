<template>
  <div>
    <div :class="{pointer:isOutStr}" @click="onClick">{{ subVal }}</div>
    <div class="" v-if="isOutStr">
      <el-dialog :title="opt.title" :visible.sync="visible">
        <div class="table-content-box">{{ val }}</div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'ContentEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {
        len: 30,
        join: '...',
        position: '',
        title: '详情'
      },
      visible: false
    }
  },
  computed: {
    subVal() {
      const val = this.val
      let len = this.opt.len
      let str = this.val

      if (this.isOutStr) {
        if (this.opt.sub_position === 'between') {
          len = Math.ceil(len / 2)
          str = val.substr(0, len) + this.opt.join + val.substr(-len)
        } else {
          str = val.substr(0, len) + this.opt.join
        }
      }

      return str
    },
    len() {
      return this.val.length
    },
    isOutStr() {
      return this.len > this.opt.len
    }
  },
  methods: {
    onClick() {
      if (this.isOutStr) {
        this.visible = true
      }
    }
  }
}
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}

.table-content-box {
  max-width: 100%;
  word-wrap: break-word;
  word-break: normal;
  white-space: normal;
}
</style>
