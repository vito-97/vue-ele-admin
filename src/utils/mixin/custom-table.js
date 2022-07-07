import customTable from '@/views/custom/customTable'
import checkPermission from '@/utils/permission'
import curd from '@/api/curd'

const tableMixin = {
  props: {
    list: {
      type: Array
    },
    listLabel: {
      type: [Object, Array]
    },
    total: {
      type: Number
    },
    // 是否可以搜索
    searchable: {
      type: Boolean,
      default: true
    },
    // 查询条件
    query: {
      type: Object
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true
    },
    kw: {
      type: String
    },
    control: {
      type: String
    },
    mode: {
      type: String,
      default: 'show'
    },
    // 是否支持多选
    selectMultiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastQuery: {},
      params: {}
    }
  },
  components: { customTable },
  computed: {
    ids() {
      const id = []
      this.list.forEach(it => {
        id.push(it.id)
      })
      return id
    },
    curd() {
      var api

      if (this.control) {
        api = curd(this.control)
      }

      return api
    },
    // 查询条件
    queryParams() {
      return { ...this.params, ...this.query }
    }
  },
  methods: {
    onLoad(args) {
      if (args.query) {
        this.lastQuery = args.query
      }
      this.$emit('load', args)
    },
    onTapHeadBtn(args) {
      const key = args.key
      const method = 'onTapHeadBtn' + this.ucfirst(key)

      if (this[method] && typeof this[method] === 'function') {
        this[method](args)
      } else {
        this.$emit('tap-head-btn', args)
      }
    },
    onTapRowBtn(args) {
      const key = args.key
      const method = 'onTapRowBtn' + this.ucfirst(key)

      if (this[method] && typeof this[method] === 'function') {
        this[method](args.row, args.index)
      } else {
        this.$emit('tap-row-btn', args)
      }
    },
    // 点击选中
    onTapHeadBtnSelect(args) {
      this.$emit('select-multiple', args)
    },
    // 点击刷新
    onTapHeadBtnFlush(args) {
      this.$emit('flush')
    },
    // 删除
    onTapHeadBtnDelete(args) {
      this.$emit('delete-multiple', args)
    },
    // 添加
    onTapHeadBtnSave() {
      this.$emit('save')
    },
    // 更新
    onTapRowBtnUpdate(row, index) {
      this.$emit('update', { row, index, id: row.id })
    },
    // 删除
    onTapRowBtnDelete(row, index) {
      this.$emit('delete', { row, index, id: row.id })
    },
    // 选中按钮
    onTapRowBtnSelect(row, index) {
      this.$emit('select', { row, index, id: row.id })
    },
    onRowDbClick(row, column, event) {
      // 展示的模式才编辑
      if (this.mode === 'show') {
        this.onTapRowBtnUpdate(row, 0)
        // 选择模式
      } else if (this.mode === 'select') {
        this.onTapRowBtnSelect(row, 0)
      }
    },
    ucfirst(string) {
      string = string.substring(0, 1).toUpperCase() + string.substring(1)

      return string
    },
    onUpdateItem(args) {
      this.$emit('update-item', args)
    },
    /**
     * 检测权限
     * @param auth
     * @returns {String}
     */
    checkAuth(auth) {
      let s = this.control

      s += (s ? ('/') : '') + auth

      return checkPermission(s)
    },
    // 填充权限前缀
    getFullAuth(auth) {
      let s = ''
      if (this.control) {
        s += this.control + '/'
      }
      s += auth

      return s
    }
  }
}

export default tableMixin
