import { deepVal, toArray, toString } from '@/utils'

const formItemMixin = {
  data() {
    return {
      // 默认配置
      opts: {},
      originValue: '',
      formDataValue: '',
      formDataValueType: ''
    }
  },
  props: {
    detail: {
      type: Object
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    column: {
      type: Object
    },
    // 额外添加参数
    attr: {
      type: Object
    },
    mode: {
      type: String,
      default: 'add'
    }
  },
  // 格式化参数
  format(value) {
    return value
  },
  computed: {
    // 获取列参数
    col() {
      const col = { ...this.column }

      col.opts = Object.assign({}, this.opts, col.opts, this.attr)

      return col
    },
    // 获取值
    val() {
      var val = deepVal(this.col.field, this.formData, null)

      return (val !== null && val) || deepVal(this.col.field, this.detail)
    },
    // 获取配置
    opt() {
      return this.col.opts
    },
    // 获取字段
    field() {
      return this.col.field
    }
  },
  watch: {
    formData: {
      immediate: true,
      handler(formData, oldFormData) {
        if (!oldFormData || typeof oldFormData[this.field] === 'undefined' || formData[this.field] != oldFormData[this.field]) {
          let val = formData[this.field] || ''
          if (this.formDataValueType === 'array') {
            val = this.toArray(val)
          }
          this.formDataValue = val
        }
      }
    }
  },
  created() {
    this.originValue = deepVal(this.field, this.detail)
  },
  methods: {
    // 获取列表的选项名称
    getListItemLabel(it, i) {
      const col = this.col
      const label = col.opts.label_field ? (it[col.opts.label_field] || '') : it
      // console.log(this.field, label)
      return label
    },
    // 获取列表的选项值
    getListItemValue(it, i) {
      const col = this.col
      let value = col.opts.label_value ? it[col.opts.label_value] : i
      if (typeof value === 'string' && Number.isInteger(Number(value))) {
        value = Number(value)
      }
      return value
    },
    /**
     * 更新数据
     * @param val
     */
    updateValue(val) {
      var type = typeof this.val
      var newType = typeof val

      if (val) {
        if (type === 'string' && newType !== 'string') {
          val = this.toString(val)
          console.log(val)
        } else if (type === 'array' && newType !== 'array') {
          val = this.toArray(val)
        }
      }

      this.$set(this.formData, this.field, val)
    },
    /**
     * 转换为数组
     * @param data
     * @returns {*|*[]}
     */
    toArray(data) {
      return toArray(data)
    },
    toString(data) {
      return toString(data)
    },
    /**
     * 触发事件
     * @param type
     * @param payload
     */
    triggerEvent(type, payload = {}) {
      this.$emit('event', {
        field: this.field,
        type,
        payload
      })
    },
    // 组件使用其他组件事件需要冒泡
    eventBubbling(e) {
      this.$emit('event', e)
    }
  }
}

export default formItemMixin
