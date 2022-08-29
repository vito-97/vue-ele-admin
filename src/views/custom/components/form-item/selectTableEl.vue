<template>
  <div class="select-table-box">
    <template v-if="control">
      <div class="form-item">
        <template v-if="isFormat('image')">
          <input-el
            :detail="detail"
            :form-data="formData"
            :column="column"
            :mode="mode"
            :attr="{clearable:true}"
            class="item"></input-el>
        </template>
        <el-button
          class="select-btn"
          type="primary"
          :icon="opt.btn_icon"
          :size="opt.btn_size"
          @click="onClickChoose"
          :disabled="disabled">
          {{ btnText }}
        </el-button>
      </div>

      <el-dialog
        :title="title"
        :visible.sync="visible"
        @close="onClose"
        @open="onOpen"
        :modal="true"
        :width="width"
        top="10vh"
        append-to-body
      >
        <!--  可以用v-if动态挂载和移除组件-->
        <component
          v-if="com"
          :is="com"
          mode="select"
          :query="opt.query"
          :select-multiple="opt.multiple"
          :selected-value="val"
          :selected-pk="opt.pk"
          @select="onSelect"
          @select-multiple="onSelectMultiple"
        >
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
        try {
          com[this.control] = require('@/views/' + this.control + '/index').default
        } catch (e) {
          console.log(`加载控制器${this.control}出错`, e)
          return ''
        }
      }
      return com[this.control]
    },
    key() {
      return this.opt.key || this.control
    },
    // 获取label名称
    labelName() {
      if (!this.opt.name) {
        console.warn(this.field, '选择数据列表未设置label名称')
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
    },
    width() {
      return this.isMobile ? '95%' : '60%'
    }
  },
  data() {
    return {
      visible: false,
      opts: {
        control: '',
        multiple: false,
        btn_text: '选择',
        btn_size: 'small',
        btn_icon: '',
        title: '选择%s', // dialog标题，将%s替换为控制器名称
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
      this.open()
    },
    open() {
      if (!this.disabled) {
        this.visible = true
      }
    },
    close() {
      this.visible = false
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
      this.triggerEvent('select', { value: row[this.opt.pk], row })
      this.visible = false
    },
    // 多选
    onSelectMultiple({ selection, ids }) {
      // console.log('select multiple', ids, selection)
      let value = []

      selection.forEach((it) => {
        value.push(it[this.opt.pk])
      })

      this.triggerEvent('select-multiple', { value, items: selection })

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
    position: relative;
    width: 100%;

    .item {
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
