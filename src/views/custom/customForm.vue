<template>
  <div>
    <!--    添加或编辑-->
    <el-dialog
      v-if="dialog"
      :title="title"
      :visible.sync="Visible"
      class="detail-form-dialog"
      @close="onClose"
      :close-on-click-modal="false"
      width="70%"
      :append-to-body="appendToBody"
      @open="onOpen">
      <el-form
        v-if="Visible"
        :model="formData"
        class="detail-form"
        :rules="formRules"
        ref="detailForm"
        @validate="onValidate"
        @submit.native.prevent="onSubmit"
      >
        <el-alert
          v-if="!formColumns.length"
          title="提示"
          type="error"
          class="empty-tip"
          description="未设置表单内容，请先设置表单内容选项"
          :closable="false"
        >
        </el-alert>
        <template v-for="(col,index) in formColumns">
          <el-form-item
            v-if="checkColVisible(col)"
            :key="index"
            :label="col.opts.label && col.name || ''"
            :prop="col.field"
            :required="col.opts.required"
            :error="error && error[col.field] || ''"
            :label-width="col.width"
          >
            <slot :name="getColSlot(col)+'-before'" :form-data="formData" :col="col"></slot>
            <!--          插槽-->
            <slot :name="getColSlot(col)" :form-data="formData" :col="col">

              <template v-if="items[col.type]">
                <component
                  :is="items[col.type]"
                  :detail="detail"
                  :column="col"
                  :form-data="formData"
                  :mode="nowMode"
                  @event="onEvent"
                >
                </component>
              </template>

              <template v-else>
                <el-alert
                  :title="'未知类型'+col.type"
                  type="error"
                  :closable="false"
                >
                </el-alert>
              </template>
            </slot>
            <slot :name="getColSlot(col)+'-after'" :form-data="formData" :col="col"></slot>
            <!--            提示信息-->
            <div
              v-if="col.placeholder && formData[col.field] !== '' && checkColVisible(col)"
              class="placeholder-tip"
            >
              {{ col.placeholder }}
            </div>
          </el-form-item>
        </template>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="columns.length && !hideButton && (!hideSubmitButton || !hideResetButton)"
      >
        <el-button type="primary" @click="onSubmit" v-if="!hideSubmitButton">确 定</el-button>
        <el-button @click="onReset" v-if="!hideResetButton">重 置</el-button>
      </div>
    </el-dialog>
    <div v-else>
      <!--  添加或编辑-->
      <el-form
        :model="formData"
        class="detail-form"
        :rules="formRules"
        ref="detailForm"
        @validate="onValidate"
        @submit.native.prevent="onSubmit"
      >
        <el-alert
          v-if="!formColumns.length"
          title="提示"
          type="error"
          class="empty-tip"
          description="未设置表单内容，请先设置表单内容选项"
          :closable="false"
        >
        </el-alert>
        <template v-for="(col,index) in formColumns">
          <el-form-item
            v-if="checkColVisible(col) && (isEdit ? (col.editable) : col.addable)"
            :key="index"
            :label="col.opts.label && col.name || ''"
            :prop="col.field"
            :required="col.opts.required"
            :error="error && error[col.field] || ''"
            :label-width="col.width"
          >
            <slot :name="getColSlot(col)+'-before'" :form-data="formData" :col="col"></slot>
            <!--          插槽-->
            <slot :name="getColSlot(col)" :form-data="formData" :col="col">

              <template v-if="items[col.type]">
                <component
                  :is="items[col.type]"
                  :detail="detail"
                  :column="col"
                  :form-data="formData"
                  :mode="nowMode"
                  @event="onEvent"
                >
                </component>
              </template>

              <template v-else>
                <el-alert
                  :title="'未知类型'+col.type"
                  type="error"
                  :closable="false"
                >
                </el-alert>
              </template>
            </slot>
            <slot :name="getColSlot(col)+'-after'" :form-data="formData" :col="col"></slot>
            <!--            提示信息-->
            <div
              v-if="col.placeholder && formData[col.field] !== '' && checkColVisible(col)"
              class="placeholder-tip"
            >
              {{ col.placeholder }}
            </div>
          </el-form-item>
        </template>
        <el-form-item v-if="columns.length && !hideButton && (!hideSubmitButton || !hideResetButton)">
          <el-button type="primary" native-type="submit" v-if="!hideSubmitButton">确 定</el-button>
          <el-button @click="onReset" v-if="!hideResetButton">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import visible from '@/utils/mixin/visible'
import { deepVal, toArray } from '@/utils'
import itemsCom from '@/utils/form-item'

export default {
  name: 'CustomForm',
  mixins: [visible],
  components: {},
  data() {
    return {
      formData: {},
      formRules: {},
      formColumns: [],
      isInitFormRules: false,
      items: itemsCom,
      lock: false
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
    }
  },
  watch: {
    // 是否展示
    Visible: {
      // immediate: true,
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
    // 监听表单内容修改
    formData: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log('form', val)

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
        console.log('value', val)

        if (!this.lock) {
          this.lock = true
          this.formData = { ...this.formData, ...val }

          setTimeout(() => {
            this.lock = false
          }, 10)
        }
      }
    }
  },
  computed: {
    title() {
      return (this.isEdit ? '编辑' : '添加')
    },
    isEdit() {
      return this.id
    },
    nowMode() {
      return this.isEdit ? 'edit' : 'add'
    }
  },
  created() {
  },
  methods: {
    init() {
      this.initColumns()
      if (!this.isInitFormRules) {
        this.isInitFormRules = true
        this.formRules = this.initFormRules()
      }
    },
    // 初始化表内容
    initColumns() {
      this.setFormData({})
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
        item = Object.assign({}, column, item)
        if (typeof item.field === 'undefined' && item.key) {
          item.field = item.key
        }
        // 设置表单数据
        if (item.field && (typeof this.formData[item.field] === 'undefined' || this.formData[item.field] === '')) {
          const value = typeof item.value === 'undefined' ? '' : item.value
          let formDataValue = deepVal(item.field, this.detail, value)

          if (item.type === 'checkbox') {
            formDataValue = toArray(formDataValue).map(it => {
              return isNaN(Number(it)) ? it : Number(it)
            })
          }

          this.setFormData(item.field, formDataValue)
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
        if (item.label && this.formData[item.field] === '' && Object.keys(item.list).length) {
          if (item.type === 'checkbox') {
            this.setFormData(item.field, [])
          } else {
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
              this.setFormData(item.field, value)
            }
          }
        }

        columns[index] = item
      }

      console.log('form columns', columns, this.formData)

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

      return rules
    },
    /**
     * 检测元素是否显示
     * @param col
     * @returns {boolean|*}
     */
    checkColVisible(col) {
      let status = this.isEdit ? col.editable : col.addable
      if (typeof col.visible === 'boolean') {
        status = status && col.visible
      } else if (typeof col.visible === 'function') {
        status = status && col.visible.call(this, this.formData, this.detail, col)
      }

      return status
    },
    // 提交
    onSubmit() {
      this.$refs.detailForm.validate((valid, obj) => {
        const formData = this.formData
        console.log('formData', formData)
        if (valid) {
          this.$emit('submit', formData)
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入的内容'
          })
        }
      })
    },
    // 重置表单
    onReset() {
      this.$refs.detailForm.resetFields()
      this.clearValidate()
    },
    onValidate(field, state, msg) {
      // console.log('validate', field,state,msg)
    },
    onClose() {
      this.$refs.detailForm.resetFields()
      this.clearValidate()
    },
    onOpen() {
      this.clearValidate()
    },
    // 监听表单元素触发的事件
    onEvent(e) {
      this.$emit(e.field + '-' + e.type, e.payload)
      this.$emit(e.field + '-event', { type: e.type, payload: e.payload })
      this.$emit('event', e)
    },
    clearValidate() {
      setTimeout(() => {
        this.$refs.detailForm && this.$refs.detailForm.clearValidate()
      }, 10)
    },
    /**
     * 获取列的插槽名称
     */
    getColSlot(col) {
      return col.slot || col.field
    },
    /**
     * 设置表单内容
     * @param key
     * @param value
     */
    setFormData(key, value = null) {
      if (typeof key === 'object') {
        this.formData = key
      } else {
        this.$set(this.formData, key, value)
      }
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

.empty-tip {
  margin-bottom: 20px;
}

.placeholder-tip {
  color: #999;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>
