<template>
  <div>
    <el-tag
      :key="tag"
      v-for="(tag,index) in tags"
      :closable="opt.closable && !opt.disabled"
      :type="opt.type"
      :hit="opt.hit"
      :color="opt.color"
      :size="opt.size"
      :effect="opt.effect"
      :disabled="opt.disabled"
      :disable-transitions="opt.disable_transitions"
      @close="onClose(index)"
    >
      {{ tag }}
    </el-tag>
    <template v-if="!opt.disabled">
      <el-input
        class="input-new-tag"
        v-if="visible"
        v-model.trim="value"
        ref="input"
        size="small"
        @keyup.enter.native="onInputKeyup"
        @blur="onInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">{{ opt.text }}</el-button>
      <span v-show="error" class="error">{{ error }}</span>
    </template>
  </div>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'TagEl',
  mixins: [formItemMixin],
  alias: '标签',
  data() {
    return {
      visible: false,
      value: '',
      error: '',
      opts: {
        disabled: false,
        type: null,
        closable: true,
        hit: false,
        color: null,
        size: null,
        effect: 'light',
        // 是否可重复
        repeat: false,
        array: true,
        text: '+ 新标签',
        // 是否禁用渐变动画
        disable_transitions: false
      }
    }
  },
  computed: {
    tags: {
      get() {
        return this.toArray(this.val)
      },
      set(val) {
        console.log('tag', val)
        this.updateValue(this.opt.array ? this.toArray(val) : val, !this.opt.array)
      }
    }
  },
  methods: {
    onClose(index) {
      var tags = [...this.tags]
      tags.splice(index, 1)
      this.tags = tags
    },

    showInput() {
      this.visible = true
      this.$nextTick(_ => {
        this.$refs.input.$refs.input.focus()
      })
    },
    onInputKeyup() {
      this.onInputConfirm()
      this.visible = true
    },
    onInputConfirm() {
      let value = this.value
      if (value) {
        if (this.opts.repeat || !this.tags.includes(value)) {
          var tags = [...this.tags]
          tags.push(value)
          this.tags = tags
        } else {
          this.error = '不可添加重复内容'
          setTimeout(() => {
            this.error = ''
          }, 2000)
        }
      }
      this.visible = false
      this.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  width: 90px;
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
  padding: 0;
}

.error {
  color: $color-danger;
  font-size: 12px;
  margin-left: 10px;
}
</style>
