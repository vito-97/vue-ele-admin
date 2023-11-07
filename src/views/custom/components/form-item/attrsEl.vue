<template>
  <div class="attrs-box">
    <div
      :key="index"
      v-for="(item,index) in tags"
      class="group-item"
    >
      <el-tag
        type="primary"
        effect="dark"
        :closable="opt.closable && !opt.disabled"
        :disabled="opt.disabled"
        :disable-transitions="opt.disable_transitions"
        @close="onDelete(index)"
      >
        {{ item.name }}
      </el-tag>
      <el-tag
        :key="idx"
        v-for="(name,idx) in item.list"
        :closable="opt.closable && !opt.disabled"
        :type="opt.type"
        :hit="opt.hit"
        :color="opt.color"
        :size="opt.size"
        :effect="opt.effect"
        :disabled="opt.disabled"
        :disable-transitions="opt.disable_transitions"
        @close="onClose(index,idx)"
      >
        {{ name }}
      </el-tag>
      <template v-if="!opt.disabled">
        <el-input
          class="input-new-tag"
          v-show="visible === index"
          v-model.trim="value"
          ref="input"
          size="small"
          @keyup.enter.native="onInputKeyup(index)"
          @blur="onInputConfirm(index)"
        >
        </el-input>
        <el-button
          v-show="visible !== index && item.list.length < opt.max"
          class="button-new-tag"
          size="small"
          @click="showInput(index)">
          {{ opt.text }}
        </el-button>
        <span v-show="error && visible === index" class="error">{{ error }}</span>
      </template>
    </div>
    <template v-if="!opt.disabled && tags.length < opt.length">
      <el-button type="primary" size="small" v-if="!append" @click="onClickAppend">添加</el-button>
      <div class="append-box" v-else>
        <el-input
          class="name-input"
          ref="newNameInput"
          v-model.trim="newName"
          size="small"
          :placeholder="opt.name"
        >
        </el-input>
        <el-input
          class="name-input"
          ref="newValueInput"
          v-model.trim="newValue"
          size="small"
          :placeholder="opt.value_name"
          @keyup.enter.native="onSaveNew"
        >
        </el-input>
        <el-button-group>
          <el-button type="primary" size="small" @click="onSaveNew">保存</el-button>
          <el-button size="small" plain @click="onCancelNew">取消</el-button>
        </el-button-group>
        <span v-show="errorAppend" class="error">{{ errorAppend }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import formItemMixin from './form-item-mixin'
import { toArray } from '@/utils'

export default {
  name: 'AttrsEl',
  mixins: [formItemMixin],
  alias: '属性',
  format: (value) => {
    return toArray(value)
  },
  data() {
    return {
      visible: -1,
      value: '',
      newName: '',
      newValue: '',
      error: '',
      errorAppend: '',
      append: false,
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
        name: '名称',
        value_name: '值',
        text: '+ 新标签',
        // 是否禁用渐变动画
        disable_transitions: false,
        // 最多个数
        length: Infinity,
        // 每项最多个数
        max: Infinity
      }
    }
  },
  computed: {
    tags: {
      get() {
        return this.toArray(this.val)
      },
      set(val) {
        this.updateValue(val, false)
      }
    }
  },
  methods: {
    onDelete(index) {
      var tags = [...this.tags]
      tags.splice(index, 1)
      this.tags = tags
    },
    onClose(index, idx) {
      var tags = [...this.tags]
      tags[index]?.list.splice(idx, 1)
      this.tags = tags
    },

    showInput(index) {
      this.visible = index
      this.$nextTick(_ => {
        this.$refs.input[index].focus()
      })
    },
    onInputKeyup(index) {
      this.onInputConfirm(index)
      if (this.tags[index]?.list.length < this.opt.max) {
        this.visible = index
      }
    },
    onInputConfirm(index) {
      let value = this.value
      this.error = ''
      if (value) {
        if (this.opts.repeat || !this.tags[index]?.list.includes(value)) {
          var tags = [...this.tags]
          tags[index]?.list.push(value)
          this.tags = tags
        } else {
          this.error = '不可添加重复内容'
        }
      }
      this.visible = -1
      this.value = ''
    },
    /**
     * 名称改动
     * @param value
     * @param index
     */
    onNameChange(value, index) {
      var tags = [...this.tags]
      tags[index].name = value

      if (!value && !tags[index].list.length) {
        tags.splice(index, 1)

        /*         this.$nextTick(_ => {
                  this.$refs.newNameInput.focus()
                }) */
      }

      this.tags = tags
    },
    onClickAppend() {
      this.append = true
    },
    onSaveNew() {
      var { newName, newValue, opt } = this
      this.errorAppend = ''
      if (!newName) {
        this.errorAppend = `请输入${opt.name}`
        return
      } else if (!newValue) {
        this.errorAppend = `请输入${opt.value_name}`
        return
      }

      for (let item of this.tags) {
        if (item.name === newName) {
          this.errorAppend = '不可添加重复的名称'
          return
        }
      }

      var tags = [...this.tags]

      tags.push({ name: newName, list: [newValue] })

      this.tags = tags

      this.onCancelNew()
    },
    onCancelNew() {
      this.newName = ''
      this.newValue = ''
      this.errorAppend = ''
      this.append = false
    }
  }
}
</script>

<style lang="scss" scoped>
.attrs-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

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

.name-input {
  width: 90px;
  vertical-align: bottom;
  padding: 0;

  &.new-line {
    display: flex;
  }
}

.group-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;

  .name-input {
    margin-right: 10px;
  }
}

.append-box {
  display: flex;
  align-items: center;

  > * {
    margin-right: 10px;
  }
}
</style>
