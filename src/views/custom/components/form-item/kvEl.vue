<template>
  <div class="kv-box">
    <div
      :key="key"
      v-for="(item,key) in tags"
      class="group-item"
    >
      <el-tag
        type="primary"
        effect="dark"
        :disabled="opt.disabled"
        :disable-transitions="opt.disable_transitions"
      >
        {{ opt.key_name }}：{{ key }}
      </el-tag>
      <el-tag
        :type="opt.type"
        :hit="opt.hit"
        :color="opt.color"
        :size="opt.size"
        :effect="opt.effect"
        :disabled="opt.disabled"
        :disable-transitions="opt.disable_transitions"
      >
        {{ opt.value_name }}：{{ item }}
      </el-tag>
      <div class="close" v-if="!opt.disabled" @click="onDelete(key)">
        <el-icon name="close"></el-icon>
      </div>
    </div>
    <template v-if="!opt.disabled">
      <el-button type="primary" size="small" v-if="!append" @click="onClickAppend">添加</el-button>
      <div class="append-box" v-else>
        <el-input
          class="name-input"
          ref="newNameInput"
          v-model.trim="newName"
          size="small"
          autofocus
          :placeholder="opt.key_name"
          v-bind="opt.key_input_attrs"
        >
        </el-input>
        <el-input
          class="name-input"
          ref="newValueInput"
          v-model.trim="newValue"
          size="small"
          :placeholder="opt.value_name"
          @keyup.enter.native="onSaveNew"
          v-bind="opt.value_input_attrs"
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

export default {
  name: 'KvEl',
  mixins: [formItemMixin],
  alias: '键值对',
  format: (value) => {
    if (typeof value !== 'object') {
      return {}
    }
    return value || {}
  },
  data() {
    return {
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
        key_name: '键',
        value_name: '值',
        key_input_attrs: {},
        value_input_attrs: {},
        key_valid: null,
        value_valid: null,
        // 是否禁用渐变动画
        disable_transitions: false
      }
    }
  },
  computed: {
    tags: {
      get() {
        return this.val || {}
      },
      set(val) {
        this.updateValue(val, false)
      }
    }
  },
  methods: {
    onDelete(key) {
      var tags = { ...this.tags }
      delete tags[key]
      this.tags = tags

      console.log(key, tags)
    },
    onClickAppend() {
      this.append = true
    },
    onSaveNew() {
      var { newName, newValue, opt } = this
      this.errorAppend = ''
      if (!newName) {
        this.errorAppend = `请输入${opt.key_name}`
        return
      } else if (!newValue) {
        this.errorAppend = `请输入${opt.value_name}`
        return
      }

      var keyValid = this.opt.key_valid
      var valueValid = this.opt.value_valid
      if (keyValid) {
        let s = keyValid(newName, newValue)
        if (s !== true) {
          this.errorAppend = typeof s === 'string' && s.replaceAll(':attribute', opt.key_name) || `请输入正确的${opt.key_name}`
          return
        }
      }
      if (valueValid) {
        let s = valueValid(newName, newValue)
        if (s !== true) {
          this.errorAppend = typeof s === 'string' && s.replaceAll(':attribute', opt.value_name) || `请输入正确的${opt.value_name}`
          return
        }
      }

      this.tags = { ...this.tags, [newName]: newValue }
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
.kv-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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

.close {
  cursor: pointer;
  margin-left: 10px;
  font-size: 18px;
}
</style>
