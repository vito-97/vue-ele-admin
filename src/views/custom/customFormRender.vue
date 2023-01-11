<template>
  <div class="custom-form-render-box">
    <componment :is="tabCom ? 'el-tabs' : 'div'" v-model="currentTabs">
      <componment
:label="item.name"
v-for="(item,index) in tabs"
:key="index"
                  :is="tabCom ? 'el-tab-pane' : 'div'">
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
        this.currentFormRef.validate((valid, obj) => {
          const value = this.value
          console.log('value', value, obj)
          if (valid) {
            resolve(value)
            if (emit) {
              this.$emit('submit', value)
            }
          } else {
            reject(obj)
            this.$message({
              type: 'error',
              message: '请检查输入的内容'
            })
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
