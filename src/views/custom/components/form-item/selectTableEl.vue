<template>
  <div class="select-table-box">
    <template v-if="control">
      <el-tag v-show="labelName" size="medium" class="label-name" @click="onClickChoose">{{ labelName }}</el-tag>
      <el-button class="select-btn" type="primary" size="mini" @click="onClickChoose" :disabled="disabled">
        {{ btnText }}
      </el-button>
      <el-dialog
        :title="title"
        :visible.sync="visible"
        class="detail-form-dialog"
        @close="onClose"
        @open="onOpen"
        :modal="true"
        width="60%"
        top="10vh"
        append-to-body
      >
        <component
          :is="com"
          mode="select"
          :query="opt.query"
          :select-multiple="opt.multiple"
          @select="onSelect"
          @select-multiple="onSelectMultiple">
        </component>
      </el-dialog>
    </template>
    <template v-else>
      <el-alert
        title="未设置control"
        type="error"
        :closable="false">
      </el-alert>
    </template>
  </div>
</template>

<script>
import formItemMixin from './form-item-mixin'
import { deepVal } from '@/utils'

const com = {}

export default {
  name: 'SelectTableEl',
  mixins: [formItemMixin],
  computed: {
    // 获取控制器名称
    control() {
      return this.opt.control || this.opt.field.endsWith('_id') && this.opt.field.substr(0, this.opt.field.length - 3) || ''
    },
    // 获取组件
    com() {
      if (this.control && !com[this.control]) {
        com[this.control] = require('@/views/' + this.control + '/index').default
      }
      return com[this.control]
    },
    key() {
      return this.opt.key || this.control
    },
    // 获取label名称
    labelName() {
      if (!this.opt.name) {
        console.warn(this.col.field, 'select table not set label name')
      }
      const key = `${this.key}.${this.opt.name}`
      return deepVal(key, this.detail)
    },
    // 是否禁用选择按钮
    disabled() {
      return !!(this.labelName && this.opt.disabled)
    },
    title() {
      return this.getText(this.opt.title)
    },
    btnText() {
      return this.getText(this.opt.btn_text)
    }
  },
  data() {
    return {
      visible: false,
      opts: {
        control: '',
        multiple: false,
        btn_text: '选择',
        title: '选择%s',
        name: '', // 展示的名称
        pk: 'id', // 主键
        key: '', // 对象的KEY
        query: {}
      }
    }
  },
  methods: {
    onClickChoose() {
      if (!this.disabled) {
        this.visible = true
      }
    },
    onOpen() {

    },
    onClose() {

    },
    getText(string) {
      return string.replace(/%s/g, this.controlName(this.control))
    },
    // 选择
    onSelect({ row, index }) {
      console.log(row)
      this.$set(this.formData, this.field, row[this.opt.pk])
      this.$set(this.detail, this.key, row)
      this.visible = false
    },
    // 多选
    onSelectMultiple({ selection, ids }) {
      // console.log('select multiple', ids, selection)
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
.select-table-box {
  display: flex;
  align-items: center;

  .label-name {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
