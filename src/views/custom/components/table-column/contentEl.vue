<template>
  <div>
    <div :class="{pointer:isOutStr}" @click.stop="onClick">{{ subVal }}</div>
    <div class="" v-if="isOutStr">
      <el-dialog :title="opt.title" :visible.sync="visible">
        <div class="table-content-box">
          <template v-if="opt.tree">
            <div v-for="(item,index) in val" :key="index">
              <el-divider content-position="left">{{ item[opt.key] }}</el-divider>
              <el-tag v-for="(sub,i) in item[opt.children]" :key="i" class="tag">
                {{ sub[opt.key] }}
              </el-tag>
            </div>
          </template>
          <template v-else>
            {{ string }}
          </template>
        </div>
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
        // between 两边显示，中间隐藏
        position: '',
        title: '详情',
        // 数组对象的话需要设置key
        key: '',
        // 数组的连接方式
        char: '，',
        // 展示为树形结构
        tree: false,
        children: 'children'
      },
      visible: false
    }
  },
  computed: {
    string() {
      let val = this.val
      let string
      if (Array.isArray(val)) {
        if (this.opt.key) {
          let arr = []
          for (let it of val) {
            if (typeof it[this.opt.key] !== 'undefined') {
              arr.push(it[this.opt.key])
            }
          }
          string = arr.join(this.opt.char)
        } else {
          string = val.join(this.opt.char)
        }
      } else {
        string = val
      }
      return string
    },
    subVal() {
      const val = this.string
      let len = this.opt.len
      let str = this.string

      if (this.isOutStr) {
        if (this.opt.position === 'between') {
          len = Math.ceil(len / 2)
          str = val.substr(0, len) + this.opt.join + val.substr(-len)
        } else {
          str = val.substr(0, len) + this.opt.join
        }
      }

      return str
    },
    len() {
      return this.string.length
    },
    isOutStr() {
      return this.len > this.opt.len || this.opt.tree
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

  .tag{
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
