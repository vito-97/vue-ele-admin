import customTable from '@/views/custom/customTable'
import checkPermission from '@/utils/permission'
import curd from '@/api/curd'
import { word2studly } from '@/utils'

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
    },
    // 选择模式下已被选择的数据
    selectedValue: {
      type: [Number, String, Array],
      default() {
        return []
      }
    },
    // 选择模式下取数据的键
    selectedPk: {
      type: String,
      default: 'id'
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
    // 是否可选中
    selectable(row, index) {
      return true
    },
    optional(row, index) {
      return true
    },
    // 是否可删除
    deletable(row, index) {
      return true
    },
    // 是否可编辑
    editable(row, index) {
      return true
    },
    // 加载列表
    onLoad(args) {
      if (args.query) {
        this.lastQuery = args.query
      }
      this.$emit('load', args)
    },
    // 点击头部按钮
    onTapHeadBtn(args) {
      const key = args.key
      const method = 'onTapHeadBtn' + word2studly(key)

      if (this[method] && typeof this[method] === 'function') {
        this[method](args)
      } else {
        this.$emit('tap-head-btn', args)
      }
    },
    // 点击行的按钮
    onTapRowBtn(args) {
      const key = args.key
      const method = 'onTapRowBtn' + word2studly(key)

      if (this[method] && typeof this[method] === 'function') {
        this[method](args.row, args.index, args.data)
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
    onTapHeadBtnSave(args) {
      this.$emit('save', args)
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
        // 判断是否有权限和是否可编辑
        if (this.checkAuth('edit') && this.checkAuth('update') && this.editable(row, 0)) {
          this.onTapRowBtnUpdate(row, 0)
        }
        // 选择模式
      } else if (this.mode === 'select' && this.optional(row, 0)) {
        this.onTapRowBtnSelect(row, 0)
      }
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
    },
    // 检测其他权限
    checkPermission(auth) {
      return checkPermission(auth)
    }
  }
}

export default tableMixin
