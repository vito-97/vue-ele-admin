<template>
  <div class="custom-form-box">
    <!--    添加或编辑-->
    <el-dialog
      v-if="dialog"
      :title="title"
      :visible.sync="Visible"
      class="detail-form-dialog"
      @close="onClose"
      :close-on-click-modal="false"
      :width="width"
      :append-to-body="appendToBody"
      :destroy-on-close="destroyOnClose"
      @open="onOpen">
      <custom-form-render
        v-model="formData"
        :detail="detail"
        :error="error"
        :rules="formRules"
        :mode="nowMode"
        :columns="formColumns"
        v-bind="$attrs"
        ref="customForm"
        @submit="onSubmit"
        @event="onEvent"
      >
        <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name"/>
        </template>
        <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </custom-form-render>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="showButton"
      >
        <el-button type="primary" @click="onClickSubmit" v-if="!hideSubmitButton">{{ submitBtnText }}</el-button>
        <el-button @click="onReset" v-if="!hideResetButton">{{ resetBtnText }}</el-button>
      </div>
    </el-dialog>
    <template v-else>
      <!--  添加或编辑-->
      <custom-form-render
        v-model="formData"
        :detail="detail"
        :error="error"
        :rules="formRules"
        :mode="nowMode"
        :columns="formColumns"
        v-bind="$attrs"
        ref="customForm"
        @submit="onSubmit"
        @event="onEvent"
      >
        <template v-slot>
          <el-form-item v-if="showButton">
            <el-button type="primary" native-type="submit" v-if="!hideSubmitButton">{{ submitBtnText }}</el-button>
            <el-button @click="onReset" v-if="!hideResetButton">{{ resetBtnText }}</el-button>
          </el-form-item>
        </template>
        <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name"/>
        </template>
        <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </custom-form-render>
    </template>
  </div>
</template>

<script>
import visible from '@/utils/mixin/visible'
import { deepVal } from '@/utils'
import itemsCom from '@/utils/form-item'
import customFormMixin from '@/views/custom/mixin/custom-form'
import CustomFormRender from './customFormRender'

export default {
  name: 'CustomForm',
  mixins: [visible, customFormMixin],
  components: {
    CustomFormRender
  },
  data() {
    return {
      // 初始化后表单数据的默认值
      initFormData: {},
      formData: {},
      formRules: {},
      formColumns: [],
      items: itemsCom,
      lock: false,
      isInit: false
    }
  },
  props: {
    // 列配置
    columns: {
      type: Array
    },
    // 数据详情
    detail: {
      type: Object
    },
    id: {
      type: Number,
      default: 0
    },
    // 可选项列表
    list: {
      type: Object
    },
    // 验证规则
    rules: {
      type: Object
    },
    // 错误信息
    error: {
      type: Object
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 是否使用dialog显示表单
    dialog: {
      type: Boolean,
      default: true
    },
    // 隐藏按钮
    hideButton: {
      type: Boolean
    },
    // 隐藏提交按钮
    hideSubmitButton: {
      type: Boolean
    },
    // 隐藏重置按钮
    hideResetButton: {
      type: Boolean
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    submitBtnText: {
      type: String,
      default: '确 定'
    },
    resetBtnText: {
      type: String,
      default: '重 置'
    },
    addTitle: {
      type: String
    },
    editTitle: {
      type: String
    }
  },
  watch: {
    // 是否展示
    Visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.init()
        }
      }
    },
    // 监听是否使用dialog
    dialog: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.init()
        }
      }
    },
    error(val) {
      console.log('error', val)
    },
    // 监听表单内容修改
    formData: {
      immediate: true,
      deep: true,
      handler(val) {
        // console.log('form', val)

        if (!this.lock) {
          this.lock = true
          // 更新value的值
          this.$emit('input', val)

          setTimeout(() => {
            this.lock = false
          }, 10)
        }
      }
    },
    // 监听传入的表单数据修改
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        // console.log('value', val)

        if (!this.lock) {
          this.lock = true
          this.formData = { ...this.formData, ...val }

          setTimeout(() => {
            this.lock = false
          }, 10)
        }
      }
    },
    columns: {
      deep: true,
      handler(val) {
        if (val) {
          this.init()
        }
      }
    }
  },
  computed: {
    width() {
      return this.isMobile ? '95%' : '70%'
    },
    title() {
      return this.isEdit ? (this.editTitle || '编辑') : (this.addTitle || '添加')
    },
    isEdit() {
      return this.id
    },
    nowMode() {
      return this.isEdit ? 'edit' : 'add'
    },
    showButton() {
      return this.columns.length && !this.hideButton && (!this.hideSubmitButton || !this.hideResetButton)
    }
  },
  created() {
    // console.log('slot', this.$slots)
    // console.log('slot scope', this.$scopedSlots)
    // 开发状态下修改了代码会重新渲染组件不重新初始化不会渲染
    if (process.env.NODE_ENV === 'development') {
      this.init()
    }
  },
  methods: {
    init() {
      // 判断是否正在初始化
      if (!this.isInit) {
        this.isInit = true
        this.initColumns()
        this.initFormRules()
        this.isInit = false
      }
    },
    // 初始化表内容
    initColumns() {
      var formData = {}
      // this.setFormData({})
      var columns = [...this.columns]
      var addDefaultOpt = {}
      // 默认单个的配置
      var column = {
        type: 'input',
        list: [], // 列表数据
        value: '',
        // placeholder: '',
        addable: true, // 添加显示
        editable: true, // 编辑显示
        required: false, // 是否必选
        visible: true, // 是否显示
        width: '',
        slot: '',
        // 配置项
        opts: {
          label: true, // 是否显示label
          label_name: '', // label显示的字段
          label_value: '', // label值的键
          clearable: false, // 是否可清空
          readonly: false,
          editable: true,
          disable: false,
          required: false
        },
        // 添加选项
        add_opts: { ...addDefaultOpt },
        // 编辑选项
        edit_opts: { ...addDefaultOpt }
      }

      for (let [index, item] of columns.entries()) {
        // 不是对象则删除
        if (typeof item !== 'object') {
          columns.splice(index, 1)
          continue
        }
        item = Object.assign({}, column, item)
        if (typeof item.field === 'undefined' && item.key) {
          item.field = item.key
        }
        // 未设置字段名直接删除
        if (!item.field) {
          columns.splice(index, 1)
          continue
        }
        // 设置表单数据
        if (item.field && (typeof formData[item.field] === 'undefined' || formData[item.field] === '')) {
          const value = typeof item.value === 'undefined' ? '' : item.value
          let formDataValue = deepVal(item.field, this.detail, value)

          if (typeof itemsCom[item.type]?.format === 'function') {
            formDataValue = itemsCom[item.type].format(formDataValue)
          }

          formData[item.field] = formDataValue
        }
        // 需要获取详情的标签数据
        if (item.label) {
          const detailLabel = this.list[item.label === true ? item.field : item.label] || {}
          if (detailLabel.option) {
            item.list = detailLabel.option
          }
        }
        // 添加的参数
        item.add_opts = Object.assign({}, column.add_opts, item.add_opts || {})
        // 编辑的参数
        item.edit_opts = Object.assign({}, column.edit_opts, item.edit_opts || {})
        // 合并参数
        item.opts = Object.assign({}, column.opts, item.opts || {}, this.isEdit ? item.edit_opts : item.add_opts)

        // 默认选中第一个
        if (item.label && formData[item.field] === '' && Object.keys(item.list).length) {
          let keys = Object.keys(item.list)

          if (Array.isArray(item.list)) {
            keys = keys.map(v => Number(v))
          }

          const key = keys.length ? keys[0] : null

          if (key !== null) {
            let value = item.opts.label_value ? item.list[key][item.opts.label_value] : key
            if (Number.isInteger(Number(value))) {
              value = Number(value)
            }
            formData[item.field] = value
          }
        }

        columns[index] = item
      }

      this.setFormData(formData)
      this.initFormData = { ...formData }
      console.log('form columns', columns, formData)
      this.formColumns = columns

      return columns
    },
    // 获取表单验证规则
    initFormRules() {
      const rules = { ...this.rules }

      this.formColumns.forEach(it => {
        if (it.required || it.opts?.required) {
          if (typeof rules[it.field] === 'undefined') {
            rules[it.field] = []
          }

          let hasRequiredRule = false

          for (const [, rule] of rules[it.field].entries()) {
            if (rule.required) {
              hasRequiredRule = true
              break
            }
          }

          if (!hasRequiredRule) {
            rules[it.field].unshift({ required: true, message: `请设置${it.name}`, trigger: ['blur', 'change'] })
          }
        }
      })

      console.log('rules', rules)
      this.formRules = rules
      return rules
    },
    onClickSubmit() {
      this.$refs.customForm.submit(false).then(formData => {
        this.onSubmit(formData)
      }, err => {
        console.log('err', err)
      })
    },
    // 提交
    onSubmit(formData) {
      this.$emit('submit', formData)
    },
    // 重置表单
    onReset() {
      this.reset()
    },
    onClose() {
      this.formRules = {}
    },
    onOpen() {
      this.clearValidate()
      // this.reset()
    },
    // 监听表单元素触发的事件
    onEvent(e) {
      // this.$emit(e.field + '-' + e.type, e.payload)
      // this.$emit(e.field + '-event', { type: e.type, payload: e.payload })
      this.$emit('event', e)
    },
    reset() {
      // 赋值初始化的数据
      this.setFormData({ ...this.initFormData })
    },
    clearValidate() {
      this.$refs.customForm?.clearValidate()
    }
  }
}
</script>

<style scoped lang="scss">
.detail-form-dialog {
  //height: 85%;

  .detail-form {
  }
}
</style>
