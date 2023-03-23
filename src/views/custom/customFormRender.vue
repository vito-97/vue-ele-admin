<template>
  <div class="custom-form-render-box">
    <componment :is="tabCom ? 'el-tabs' : 'div'" v-model="currentTabs">
      <componment
        :label="item.name"
        v-for="(item,index) in tabs"
        :key="index"
        :is="tabCom ? 'el-tab-pane' : 'div'"
      >
        <el-form
          :validate-on-rule-change="validateOnRuleChange"
          :model="value"
          :rules="rules"
          v-bind="$attrs"
          class="detail-form"
          ref="detailForm"
          @validate="onValidate"
          @submit.native.prevent="onSubmit"
        >
          <el-alert
            v-if="!item.columns || !item.columns.length"
            title="提示"
            type="error"
            class="empty-tip"
            description="未设置表单内容，请先设置表单内容选项"
            :closable="false"
          >
          </el-alert>
          <template v-for="(col,index) in item.columns" v-else>
            <el-form-item
              v-if="checkColVisible(col)"
              :key="index"
              :label="col.opts.label && col.name || ''"
              :prop="col.field"
              :required="col.opts.required"
              :error="error && error[col.field] || ''"
              :label-width="col.width"
            >
              <slot :name="getColSlot(col)+'-before'" :form-data="value" :col="col"></slot>
              <!--          插槽-->
              <slot :name="getColSlot(col)" :form-data="value" :col="col">
                <template v-if="items[col.type]">
                  <component
                    :is="items[col.type]"
                    :detail="detail"
                    :column="col"
                    :form-data="value"
                    :mode="mode"
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
              <slot :name="getColSlot(col)+'-after'" :form-data="value" :col="col"></slot>
              <!--            提示信息-->
              <div
                v-if="col.placeholder && (value[col.field] !== '' || (items[col.type] && items[col.type].placeholder)) && checkColVisible(col)"
                class="placeholder-tip"
              >
                {{ col.placeholder }}
              </div>
            </el-form-item>
          </template>
          <slot></slot>
        </el-form>
      </componment>
    </componment>
  </div>
</template>

<script>
import itemsCom from '@/utils/form-item'
import customFormMixin from '@/views/custom/mixin/custom-form'

export default {
  name: 'CustomFormRender',
  data() {
    return {
      items: itemsCom,
      currentTabs: '0'
    }
  },
  mixins: [customFormMixin],
  watch: {
    visible(val) {
      if (!val) {
        this.currentTabs = '0'
      }
    },
    error(obj) {
      // 自动切换后端返回错误的选项卡
      if (this.tabCom) {
        var fields = Object.keys(obj)
        if (fields.length) {
          var field = fields[0]
          this.switchTabByField(field)
        }
      }
    }
  },
  computed: {
    tabLength() {
      return this.tabs.length
    },
    tabCom() {
      return this.tabLength > 1
    },
    formRef() {
      return this.$refs.detailForm || []
    },
    currentFormRef() {
      return this.formRef[this.currentTabs] || null
    },
    /**
     * 获取每个选项卡里有什么字段名称
     * @returns {{}}
     */
    tabsField() {
      var { tabs } = this
      var data = {}

      for (let tab of tabs) {
        var { key } = tab

        data[key] = tab.columns.map(v => v.field)
      }

      return data
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    // 编辑模式
    mode: {
      type: String,
      default: 'add'
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    error: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否在更新校验规则后触发验证
    validateOnRuleChange: {
      type: Boolean
    },
    visible: {
      type: Boolean
    }
  },
  methods: {
    /**
     * 获取字段输入哪个选项卡
     * @param field
     * @returns {string}
     */
    getFieldTabKey(field) {
      let tabsField = this.tabsField

      for (let [key, items] of Object.entries(tabsField)) {
        if (items.includes(field)) {
          return key
        }
      }

      return ''
    },
    onValidate(field, state, msg) {
      // console.log('validate', field,state,msg)
    },
    // 提交表单事件
    onSubmit() {
      this.submit()
    },
    // 重置表单事件
    onReset() {
      this.reset()
    },
    // 监听表单元素触发的事件
    onEvent(e) {
      this.$emit('event', e)
    },
    // 提交表单
    submit(emit = true) {
      return new Promise((resolve, reject) => {
        var formRef = this.formRef
        var promises = []

        // 每个表单都验证
        for (let ref of formRef) {
          var p = new Promise((success, fail) => {
            ref.validate((valid, obj) => {
              if (valid) {
                success()
              } else {
                fail(obj)
              }
            })
          })

          promises.push(p)
        }

        Promise.allSettled(promises).then(results => {
          for (let result of results) {
            // 校验失败
            if (result.status === 'rejected') {
              var obj = result.reason
              if (this.tabCom) {
                var keys = Object.keys(obj)
                var firstField = keys[0]
                this.switchTabByField(firstField)
              }
              this.$message({
                type: 'error',
                message: '请检查输入的内容'
              })

              reject(obj)

              return false
            }
          }

          var { value } = this
          resolve(value)
          if (emit) {
            this.$emit('submit', value)
          }
        })
      })
    },
    // 重置表单
    reset() {
      for (let ref of this.formRef) {
        ref.resetFields()
      }
    },
    // 清除验证
    clearValidate() {
      setTimeout(() => {
        for (let ref of this.formRef) {
          ref.clearValidate()
        }
      }, 10)
    },
    // 通过字段切换选项卡
    switchTabByField(field) {
      var tabKey = this.getFieldTabKey(field)
      if (tabKey && this.currentTabs !== tabKey) {
        this.currentTabs = tabKey
      }
    }
  }
}
</script>

<style scoped lang="scss">
.placeholder-tip {
  color: #999;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}

.empty-tip {
  margin-bottom: 20px;
}
</style>
