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
        :model="formData"
        class="detail-form"
        :rules="formRules"
        ref="detailForm"
        @validate="onValidate"
        v-if="Visible">
        <el-alert
          v-if="!formColumns.length"
          title="提示"
          description="未设置表单内容，请先设置表单内容选项">
        </el-alert>
        <template v-for="(col,index) in formColumns">
          <el-form-item
            v-if="!col.hidden && (isEdit ? (col.editable) : col.addable)"
            :key="index"
            :label="col.name"
            :prop="col.field"
            :required="col.opts.required"
            :error="error && error[col.field] || ''"
            :label-width="col.width"
          >
            <!--          插槽-->
            <slot :name="col.slot || col.field" :form-data="formData" :col="col">

              <template v-if="items[col.type]">
                <component
                  :is="items[col.type]"
                  :detail="detail"
                  :column="col"
                  :form-data="formData"
                  :mode="isEdit ? 'edit' : 'add'"
                >
                </component>
              </template>

              <template v-else>
                <el-alert
                  :title="'未知类型'+col.type"
                  type="error"
                  :closable="false">
                </el-alert>
              </template>
            </slot>
          </el-form-item>
        </template>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
        <el-button @click="onReset">重 置</el-button>
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
      >
        <el-alert
          v-if="!formColumns.length"
          title="提示"
          description="未设置表单内容，请先设置表单内容选项">
        </el-alert>
        <template v-for="(col,index) in formColumns">
          <el-form-item
            v-if="!col.hidden && (isEdit ? (col.editable) : col.addable)"
            :key="index"
            :label="col.name"
            :prop="col.field"
            :required="col.opts.required"
            :error="error && error[col.field] || ''"
            :label-width="col.width"
          >
            <!--          插槽-->
            <slot :name="col.slot || col.field" :form-data="formData" :col="col">

              <template v-if="items[col.type]">
                <component
                  :is="items[col.type]"
                  :detail="detail"
                  :column="col"
                  :form-data="formData"
                  :mode="isEdit ? 'edit' : 'add'"
                >
                </component>
              </template>

              <template v-else>
                <el-alert
                  :title="'未知类型'+col.type"
                  type="error"
                  :closable="false">
                </el-alert>
              </template>
            </slot>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
          <el-button @click="onReset">重 置</el-button>
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
      items: itemsCom
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
    }
  },
  computed: {
    title() {
      return (this.isEdit ? '编辑' : '添加')
    },
    isEdit() {
      return this.id
    }
    // 设置必填的规则

    /*    formData(){
          let data = {}

          this.columns.forEach((it,i)=>{
            data[it.field] = this.detail[it.field]
          })

          return data
        },*/
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
      this.formData = {}
      var columns = [...this.columns]
      var addDefaultOpt = {}
      // 默认单个的配置
      var column = {
        type: 'input',
        input_type: 'text',
        list: [], // 列表数据
        value: '',
        placeholder: '',
        addable: true, // 添加显示
        editable: true, // 编辑显示
        required: false, // 是否必选
        hidden: false, // 是否隐藏
        width: '',
        slot: '',
        // 配置项
        opts: {
          label_name: '', // label显示的字段
          label_value: '', // label值的键
          clearable: false, // 是否可清空
          readonly: false,
          editable: true,
          disable: false,
          required: false
        },
        // 组件的事件
        events: {},
        // 添加选项
        add_opts: { ...addDefaultOpt },
        // 编辑选项
        edit_opts: { ...addDefaultOpt }
      }

      for (let [index, item] of columns.entries()) {
        item = Object.assign({}, column, item)
        // 设置表单数据
        if (item.field && (typeof this.formData[item.field] === 'undefined' || this.formData[item.field] === '')) {
          const value = typeof item.value === 'undefined' ? '' : item.value
          let formDataValue = deepVal(item.field, this.detail, value)

          if (item.type === 'checkbox') {
            formDataValue = toArray(formDataValue).map(it => {
              return isNaN(Number(it)) ? it : Number(it)
            })
          }

          this.$set(this.formData, item.field, formDataValue)
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
            this.$set(this.formData, item.field, [])
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
              this.$set(this.formData, item.field, value)
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
    clearValidate() {
      setTimeout(() => {
        this.$refs.detailForm && this.$refs.detailForm.clearValidate()
      }, 10)
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
