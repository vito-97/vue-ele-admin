<template>
  <div class="custom-form-box">
    <!--    添加或编辑-->
    <component
      :is="dialog ? 'el-dialog' : 'div'"
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
        :id="id"
        :detail="detail"
        :error="error"
        :rules="formRules"
        :mode="nowMode"
        :tabs="tabs"
        :lang-status="langStatus"
        :lang-field="langField"
        :lang-list="langList"
        :visible.sync="Visible"
        v-bind="$attrs"
        ref="customForm"
        @submit="onSubmitEmit"
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
        <template v-slot v-if="!dialog && showButton">
          <el-form-item>
            <el-button type="primary" native-type="submit" v-if="!hideSubmitButton">{{ submitBtnText }}</el-button>
            <el-button @click="onReset" v-if="!hideResetButton">{{ resetBtnText }}</el-button>
          </el-form-item>
        </template>
      </custom-form-render>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="dialog && showButton"
      >
        <el-button size="small" type="primary" @click="onSubmit" v-if="!hideSubmitButton">
          {{ submitBtnText }}
        </el-button>
        <el-button size="small" @click="onReset" v-if="!hideResetButton">{{ resetBtnText }}</el-button>
      </div>
    </component>
  </div>
</template>

<script>
import visible from '@/utils/mixin/visible'
import { deepClone, deepVal, isDefaultLang } from '@/utils'
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
      formRules: {},
      tabs: [],
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
    },
    // 多语言状态
    langStatus: { type: Boolean, default: false },
    // 多语言列表
    langList: { type: Object, default: () => ({}) },
    // 多语言字段
    langField: { type: Array, default: () => [] }
  },
  watch: {
    // 是否展示
    Visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.init()
        } else {
          this.clearValidate()
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
    },
    langStatus() {
      this.init()
    }
  },
  computed: {
    width() {
      return this.isMobile ? '95%' : '70%'
    },
    title() {
      return this.isEdit ? (this.editTitle || '编辑') : (this.addTitle || '添加')
    },
    nowMode() {
      return this.isEdit ? 'edit' : 'add'
    },
    showButton() {
      return this.columns.length && !this.hideButton && (!this.hideSubmitButton || !this.hideResetButton)
    },
    // 获取所有的字段
    columnFields() {
      return this.columns.map(it => it && it.field)
    }
  },
  created() {
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
      var langList = this.langList
      var langField = this.langField
      var langStatus = this.langStatus && Object.keys(langList).length
      var fieldsCount = {}

      if (!columns.length) {
        return []
      }

      // 判断是否为tab形式
      var isTab = columns[0].columns || false

      if (isTab) {
        // 多语言则展开字段
        if (langStatus) {
          var newColumns = []
          for (let item of columns) {
            if (Array.isArray(item.columns)) {
              newColumns.push(...item.columns)
            }
          }
          columns = newColumns
          isTab = false
        } else {
          var k = 0
          for (let item of columns) {
            if (!item.key) {
              item.key = k.toString()
              k++
            }

            // 设置字段键
            for (let row of item.columns) {
              if (!row.field && row.key) {
                row.field = row.key
              }
            }
          }
        }
      }

      if (!isTab) {
        if (langStatus) {
          var langColumns = []
          for (let [lang, name] of Object.entries(langList)) {
            var key = lang.replace(/-/g, '_')
            var cols = []

            // 不是默认语言则匹配语言字段的列
            if (!isDefaultLang(lang)) {
              for (let col of columns) {
                col.opts = col.opts || {}
                col.field = col.field || col.key || ''
                // 有包含语言字段
                if (langField.includes(col.field)) {
                  var it = deepClone(col)

                  if (it.label === true) {
                    it.label = it.field
                  }
                  it.slot = it.slot || it.field
                  it.detail_field = `${key}.${it.field}`
                  it.required = it.opts.required = false
                  it.field = `${key}_${it.field}`

                  cols.push(it)
                }
              }
            } else {
              cols = columns
            }

            langColumns.push({
              name: name,
              key,
              columns: cols
            })
          }
          columns = langColumns
        } else {
          columns = [{
            name: '表单',
            key: 'default',
            columns
          }]
        }
      }

      var addDefaultOpt = {}
      // 默认单个的配置
      var column = {
        name: 'Name', // 名称
        field: '', // 表单字段
        detail_field: '', // 读取详情的字段
        type: 'input',
        list: [], // 列表数据
        value: '',
        // placeholder: '',
        addable: true, // 添加显示
        editable: true, // 编辑显示
        required: false, // 是否必选
        visible: true, // 是否显示
        hide_append: true, // 不显示后是否加入数据
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

      for (let i = 0; i < columns.length; i++) {
        var tab = columns[i]
        var tabColumns = tab?.columns
        // 不是数组则删除
        if (!Array.isArray(tabColumns)) {
          columns.splice(i, 1)
          i--
          continue
        }
        for (let index = 0; index < tabColumns.length; index++) {
          var item = tabColumns[index]

          var { field } = item

          item = Object.assign({}, column, item)

          if (typeof field === 'undefined' && item.key) {
            item.field = item.key
            field = item.field
          }

          // 未设置字段名直接删除
          if (!field) {
            tabColumns.splice(index, 1)
            index--
            continue
          }

          fieldsCount[field] = (fieldsCount[field] || 0) + 1

          // 设置表单数据
          if (typeof formData[field] === 'undefined' || formData[field] === '') {
            var value = typeof item.value === 'undefined' ? '' : item.value

            if (typeof value === 'function') {
              value = value()
            }

            let key = item.detail_field || field
            let formDataValue = deepVal(key, this.detail, value)

            if (typeof itemsCom[item.type]?.format === 'function') {
              formDataValue = itemsCom[item.type].format(formDataValue)
            }

            formData[field] = formDataValue
          }

          // 需要获取详情的标签数据
          if (item.label) {
            const detailLabel = this.list[item.label === true ? field : item.label] || {}
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
          if (item.label && formData[field] === '' && Object.keys(item.list).length) {
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
              formData[field] = value
            }
          }

          tabColumns[index] = item
        }
      }

      // 判断字段是否只出现一次并且需要显示出来修改
      for (let tab of columns) {
        for (let item of tab.columns) {
          let { field } = item
          if (fieldsCount[field] === 1 && !item.hide_append && !this.checkColVisible(item, formData)) {
            delete formData[field]
          }
        }
      }

      this.setFormData(formData)
      this.initFormData = { ...formData }
      console.log('form columns', columns, formData)
      this.tabs = columns

      return columns
    },
    // 获取表单验证规则
    initFormRules() {
      const rules = { ...this.rules }

      this.tabs.forEach(tab => {
        tab.columns.forEach(it => {
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
      })

      console.log('rules', rules)
      this.formRules = rules
      return rules
    },
    onSubmit() {
      this.submit().catch(() => {})
    },
    submit() {
      return this.$refs.customForm.submit(false).then(formData => {
        this.onSubmitEmit(formData)
        return formData
      }, err => {
        console.log('err', err)
        return Promise.reject(err)
      })
    },
    // 提交
    onSubmitEmit(formData) {
      this.$emit('submit', formData)
    },
    onReset() {
      this.reset()
    },
    // 重置表单
    reset() {
      this.resetFormData()
    },
    onClose() {
      this.formRules = {}
    },
    onOpen() {
      this.clearValidate()
      // this.resetFormData()
    },
    // 监听表单元素触发的事件
    onEvent(e) {
      // this.$emit(e.field + '-' + e.type, e.payload)
      // this.$emit(e.field + '-event', { type: e.type, payload: e.payload })
      this.$emit('event', e)
    },
    resetFormData() {
      // 赋值初始化的数据
      this.setFormData({ ...this.initFormData })
    },
    clearValidate() {
      this.$refs.customForm?.clearValidate()
    },
    /**
     * 获取语言对应的字段
     * @param field
     * @param lang
     * @param join
     * @returns {*|string}
     */
    getField(field, lang, join = '_') {
      return isDefaultLang(lang) ? field : `${lang}${join}${field}`
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
