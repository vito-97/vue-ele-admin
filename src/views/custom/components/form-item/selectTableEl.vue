<template>
  <div class="select-table-box">
    <template v-if="control">
      <div class="form-item">
        <template v-if="isFormat('image')">
          <input-el :detail="detail" :form-data="formData" :column="column" :mode="mode" :attr="{clearable:true}" class="item"></input-el>
        </template>
        <el-button class="select-btn" type="primary" size="small" @click="onClickChoose" :disabled="disabled">
          {{ btnText }}
        </el-button>
      </div>

      <el-dialog
        :title="title"
        :visible.sync="visible"
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
      <!--      显示内容-->
      <div v-if="isFormat('image')" class="label-name">
        <image-el :val="labelName" :col="{opts:{size:opt.imageSize}}" v-if="formData[field]"></image-el>
      </div>
      <el-tag v-show="labelName" size="medium" class="label-name" @click="onClickChoose" v-else>
        {{ labelName }}
      </el-tag>
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
import imageEl from '@/views/custom/components/table-column/imageEl'
import inputEl from '@/views/custom/components/form-item/inputEl'

const com = {}

export default {
  name: 'SelectTableEl',
  alias: '数据选择器',
  mixins: [formItemMixin],
  components: {
    imageEl,
    inputEl
  },
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
        console.warn(this.field, 'select table not set label name')
      }
      const key = `${this.key}.${this.opt.name}`

      return deepVal(key, this.detail) || deepVal(this.field, this.formData)
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
        query: {},
        format: '',
        imageSize: 300
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
    isFormat(s) {
      return s === this.opt.format
    },
    getText(string) {
      return string.replace(/%s/g, this.controlName(this.control))
    },
    // 选择
    onSelect({ row, index }) {
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
  //display: flex;
  //align-items: center;
  .form-item {
    display: flex;
    align-items: center;
    .item{
      margin-right: 10px;
    }
    //align-items: flex-start;
  }

  .label-name {
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
