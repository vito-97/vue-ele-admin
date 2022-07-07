const tableColumnMixin = {
  data() {
    return {
      opts: {}
    }
  },
  props: {
    row: { type: Object },
    col: { type: Object },
    index: { type: Number },
    val: { type: [Object, Array, String, Number, Boolean] },
    formatVal: { type: [Object, Array, String, Number, Boolean] }
  },
  computed: {
    id() {
      const pk = this.col.pk || 'id'
      return this.row[pk] || 0
    },
    opt() {
      return Object.assign({}, this.opts, this.col?.opts || {})
    },
    val2array() {
      return this.toArray(this.val)
    },
    field() {
      return this.col.field
    }
  },
  methods: {
    /**
     * 将值转换成数组
     * @returns {any[]}
     */
    toArray(val) {
      if (val === '' || val === null) {
        return []
      }
      if (!Array.isArray(val)) {
        // 字符串
        if (typeof val === 'string') {
          val = val.split(',')
        } else if (typeof val === 'number') {
          val = [val]
        } else if (typeof val === 'object') {
          val = Object.values(val)
        }
      }

      for (const i in val) {
        const it = val[i]
        if (!it || !it.trim()) {
          val.splice(i, 1)
        }
      }

      return val
    }
  }
}

export default tableColumnMixin
