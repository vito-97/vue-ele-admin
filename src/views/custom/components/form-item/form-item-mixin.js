import { deepVal, toArray } from '@/utils'

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
  computed: {
    // 获取列参数
    col() {
      const col = { ...this.column }

      col.opts = Object.assign({}, this.opts, col.opts, this.attr)

      return col
    },
    // 获取值
    val() {
      return deepVal(this.col.field, this.detail)
    },
    // 获取配置
    opt() {
      return this.col.opts
    },
    events() {
      return this.column.events
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
      // this.formData[this.col.field] = val
      console.log(this.field, val)
      this.$set(this.formData, this.field, val)
    },
    /**
     * 转换为数组
     * @param data
     * @returns {*|*[]}
     */
    toArray(data) {
      return toArray(data)
    }
  }
}

export default formItemMixin
