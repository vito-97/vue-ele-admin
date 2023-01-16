import customTable from '@/views/custom/customTable'
import checkPermission from '@/utils/permission'
import curd from '@/api/curd'
import { word2studly } from '@/utils'

const tableMixin = {
  props: {
    // 查询条件
    query: {
      type: Object
    }
  },
  data() {
    return {
      params: {}
    }
  },
  components: { customTable },
  computed: {
    /**
     * 获取要透传的事件
     * 排除自定义事件
     * @returns {{}}
     */
    listeners() {
      var exclude = ['tap-head-btn', 'tap-row-btn', 'select-multiple', 'flush', 'delete-multiple', 'save', 'update', 'delete', 'select']

      var listeners = {}

      for (let [index, item] of Object.entries(this.$listeners)) {
        if (!exclude.includes(index)) {
          listeners[index] = item
        }
      }

      return listeners
    },
    list() {
      return this.$attrs?.list || []
    },
    listLabel() {
      return this.$attrs['list-label'] || {}
    },
    mode() {
      return this.$attrs?.mode || 'show'
    },
    ids() {
      const id = []
      this.list.forEach(it => {
        id.push(it.id)
      })
      return id
    },
    curd() {
      var api

      if (this.$attrs?.control) {
        api = curd(this.$attrs?.control)
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
    // 点击头部按钮
    onTapHeadBtn(args) {
      const key = args.key

      if (!key) {
        console.warn(`未定义key`)
        return
      }

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
    onTapHeadBtnFlush(args = {}) {
      this.$emit('flush')
    },
    // 删除
    onTapHeadBtnDelete(args = {}) {
      this.$emit('delete-multiple', args)
    },
    // 添加
    onTapHeadBtnSave(args = {}) {
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
      console.log(row, column, event)
      // 展示的模式才编辑
      if (this.mode === 'show') {
        // 判断是否有权限和是否可编辑
        if (this.checkAuth('edit') && this.checkAuth('update') && this.editable(row, 0)) {
          this.onTapRowBtnUpdate(row, 0)
        }
        // 选择模式
      } else if (this.mode === 'select' && this.optional(row, 0)) {
        var optional = this.$attrs.optional || ''
        var targetDetail = this.$attrs.targetDetail || {}

        console.log('dbc', optional, targetDetail)

        if (!optional || optional(row, 0, targetDetail)) {
          this.onTapRowBtnSelect(row, 0)
        }
      }
    },
    /**
     * 检测权限
     * @param auth
     * @returns {String}
     */
    checkAuth(auth) {
      let s = this.$attrs?.control

      s += (s ? ('/') : '') + auth

      return checkPermission(s)
    },
    // 填充权限前缀
    getFullAuth(auth) {
      var control = this.$attrs?.control
      let s = ''
      if (control) {
        s += control + '/'
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
