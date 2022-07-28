<template>
  <div v-if="hasCurdAuth('index')" style="width: 100%;height: 100%;">
    <div class="curd-box">
      <el-button-group>
        <!--        默认控制按钮之前-->
        <slot name="before-head-button" :selection="selection"></slot>
        <template v-for="(btn) in headBtns">
          <el-button
            :type="btn.type"
            :icon="btn.icon"
            :disabled="btn.selected && !selection.length"
            size="mini"
            v-if="!headBtnDisabled(btn) && (!btn.auth || checkAuth(btn.auth))"
            @click="onTapHeadBtn(btn)"
            :key="btn.key"
          >
            {{ btn.name }}
          </el-button>
        </template>
        <!--        默认控制按钮之后-->
        <slot name="after-head-button" :selection="selection"></slot>
      </el-button-group>
      <div class="search-group-box" v-if="searchable && hasCurdAuth('index')">
        <el-form ref="form" :inline="true" @submit.native.prevent="onSearch" size="mini">
          <el-form-item class="mb0">
            <el-input
              v-model="keyword"
              :placeholder="searchPlaceholder"
              name="keyword"
              :clearable="true"
              @input="onKwInput">
            </el-input>
          </el-form-item>
          <el-form-item class="mb0">
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              {{ searchBtnText }}
            </el-button>
          </el-form-item>
        </el-form>
        <!--        控制列的显示与隐藏-->
        <div v-if="!hideColumnsControl">
          <el-popover
            placement="bottom"
            width="200"
            trigger="click">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllColumns" @change="showAllColumns">全选
            </el-checkbox>
            <el-checkbox-group v-model="showColumns" @change="onChangeShowColumns">
              <template v-for="(it,i) in columnLabels">
                <div :key="i">
                  <el-checkbox :label="i">{{ it }}</el-checkbox>
                </div>
              </template>
            </el-checkbox-group>
            <el-button type="primary" icon="el-icon-s-operation" size="mini" plain slot="reference"></el-button>
          </el-popover>
        </div>
      </div>
    </div>
    <slot name="content" :column="cols">
      <el-table
        :data="list"
        :row-key="rowKey"
        :stripe="stripe"
        :border="border"
        :default-expand-all="defaultExpandAll"
        :tree-props="treeProps"
        :height="height"
        class="table-box"
        v-if="hasCurdAuth('index') && visible"
        ref="table"
        @selection-change="onTableSelectionChange"
        @row-dblclick="onTableRowDbClick"
        @filter-change="onTableFilter"
      >
        <!--      选项列-->
        <el-table-column
          v-if="!hideSelection && isShowColumn('selection')"
          type="selection"
          :selectable="selectable"
          key="selection"
          width="50">
        </el-table-column>
        <el-table-column
          v-if="!hidePk && isShowColumn('pk')"
          :prop="pk"
          :label="pkLabel"
          key="pk"
          width="80">
        </el-table-column>
        <!--      渲染列-->
        <template v-for="(it,i) in cols">
          <el-table-column
            v-if="checkColVisible(it)"
            :key="i"
            :fixed="it.fixed"
            :prop="it.prop || it.field"
            :label="it.name"
            :width="it.width"
            :sortable="it.sortable"
            :resizable="it.resizable"
            :formatter="it.formatter"
            :show-overflow-tooltip="it.show_overflow_tooltip"
            :align="it.align"
            :class-name="it.class_name"
            :label-class-name="it.label_class_name"
            :filters="it.filters"
            :filter-multiple="it.filter_multiple"
            :column-key="it.field"
          >
            <template slot-scope="{row,column,$index}">

              <slot
                :name="(it.slot || it.field)+'-before'"
                v-if="getColValue(it, row)"
                :row="row"
                :column="column"
                :$index="$index"
                :value="getColValue(it, row)"></slot>

              <slot
                :name="(it.slot || it.field)"
                :row="row"
                :column="column"
                :$index="$index"
                :value="getColValue(it, row)"
                :label="listLabel">

                <template v-if="!isEmpty(it,row)">

                  <template v-if="it.type && items[it.type]">
                    <component
                      :is="items[it.type]"
                      :row="row"
                      :col="it"
                      :index="$index"
                      :val="getColValue(it, row)"
                      :format-val="getFormatColValue(it, row)"
                      @update-item="onUpdateItem"></component>
                  </template>

                  <template v-else>
                    {{ getFormatColValue(it, row) }}
                  </template>

                </template>

              </slot>

              <slot
                :name="(it.slot || it.field)+'-empty'"
                v-if="!row[it.field]"
                :row="row"
                :column="column"
                :$index="$index"
                :value="getColValue(it, row)"></slot>

              <slot
                :name="(it.slot || it.field)+'-after'"
                v-if="row[it.field]"
                :row="row"
                :column="column"
                :$index="$index"
                :value="getColValue(it, row)"></slot>

            </template>

          </el-table-column>
        </template>

        <!--      操作列-->
        <el-table-column
          fixed="right"
          :label="rowBtnColumn.name"
          :width="rowBtnColumn.width"
          key="control"
          v-if="!hideRowBtn && isShowColumn('control')"
        >
          <template slot-scope="{row,column,$index}">

            <slot name="before-row-btn" :row="row" :column="column" :$index="$index"></slot>

            <slot name="row-btn" :row="row" :column="column" :$index="$index">
              <template v-for="(btn) in rowBtns">
                <el-button
                  type="text"
                  size="small"
                  @click="onTapRowBtn(btn,row,$index,column)"
                  v-if="btn.show && (!btn.auth || checkAuth(btn.auth))"
                  :disabled="rowBtnDisabled(btn,row,$index)"
                  :key="btn.key"
                >
                  {{ btn.name }}
                </el-button>
              </template>
            </slot>

            <slot name="after-row-btn" :row="row" :column="column" :$index="$index"></slot>

          </template>
        </el-table-column>

      </el-table>
      <!--    分页-->
      <div class="page-box" v-if="pagination">
        <pagination
          :total="total"
          :page="page"
          :page-sizes="pageSizes"
          :limit="limit"
          :auto-scroll="true"
          @pagination="onPaginationChange"/>
      </div>
    </slot>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>{{ confirm.title }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;onConfirmSuccess();">确 定</el-button>
      </span>
    </el-dialog>

    <el-backtop v-if="backtop"></el-backtop>
  </div>
</template>

<script>
import { getLimit, pageSizes, setLimit } from '@/utils/list'
import checkPermission from '@/utils/permission'
import Pagination from '@/components/Pagination'
import { deepVal, debounce } from '@/utils'
import itemsCom from '@/utils/table-column'
import md5 from 'js-md5'

export default {
  name: 'CustomTable',
  data() {
    return {
      // 是否显示表格
      visible: false,
      deleteRow: {},
      deleteIndex: '',
      dialogVisible: false,
      page: 1,
      limit: getLimit(),
      keyword: this.kw,
      // 选中列表
      selection: [],
      // 确认的内容
      confirm: {},
      params: {},
      filterTimer: '',
      items: itemsCom,
      showColumns: [],
      // 控制是否为有选但是没全选
      isIndeterminate: true,
      // 全选列
      checkAllColumns: false
    }
  },
  components: { Pagination },
  props: {
    height: {
      type: [Number, String],
      default: null
    },
    // 控制器名
    control: {
      type: String
    },
    // 隐藏默认的头部按钮
    hideDefaultHeadBtn: {
      type: Boolean
    },
    // 隐藏默认的行按钮
    hideDefaultRowBtn: {
      type: Boolean
    },
    // 隐藏选项框
    hideSelection: {
      type: Boolean
    },
    // 隐藏操作列
    hideRowBtn: {
      type: Boolean
    },
    // 数据列表
    list: {
      type: Array
    },
    // 数据列表的label
    listLabel: {
      type: [Object, Array]
    },
    // 树形的配置
    treeProps: {
      type: Object,
      default: () => {
        return { children: 'children', hasChildren: 'hasChildren' }
      }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    // 渲染列配置
    columns: {
      type: Array
    },
    // 关键词
    kw: {
      type: String
    },
    // 是否可以搜索
    searchable: {
      type: Boolean,
      default: true
    },
    // 搜索框描述
    searchPlaceholder: {
      type: String,
      default: '请输入关键词'
    },
    // 搜索按钮名称
    searchBtnText: {
      type: String,
      default: '搜索'
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
    // 页码可选数量
    pageSizes: {
      type: Array,
      default: () => pageSizes
    },
    // 总数
    total: {
      type: Number
    },
    // 斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 纵向边框
    border: {
      type: Boolean
    },
    // 展开所有
    defaultExpandAll: {
      type: Boolean
    },
    // 头按钮追加按钮的位置 before在默认按钮之前 after在默认按钮之后
    headBtnPosition: {
      type: String,
      default: 'before'
    },
    // 追加头部按钮
    headBtn: {
      type: Array,
      default: () => []
    },
    // 行按钮追加按钮的位置 before在默认按钮之前 after在默认按钮之后
    rowBtnPosition: {
      type: String,
      default: 'before'
    },
    // 追加行按钮
    rowBtn: {
      type: Array,
      default: () => []
    },
    // 模式
    mode: {
      type: String,
      default: 'show'
    },
    // 是否多选
    selectMultiple: {
      type: Boolean
    },
    // 按钮列的配置
    rowBtnColumn: {
      type: Object,
      default: () => ({
        name: '操作',
        width: 120
      })
    },
    // 删除提示
    deleteConfirm: {
      type: String
    },
    // 多选删除提示
    deleteMultipleConfirm: {
      type: String
    },
    // 判断是否可以勾选
    // 传入row index
    selectable: {
      type: Function
    },
    // 判断是否可以删除
    deletable: {
      type: [Function, Boolean],
      default: true
    },
    // 判断是否可以编辑
    editable: {
      type: [Function, Boolean],
      default: true
    },
    // 判断是否可以选择
    optional: {
      type: [Function, Boolean],
      default: true
    },
    // 是否过滤
    filter: {
      type: Boolean,
      default: true
    },
    // 隐藏ID
    hidePk: {
      type: Boolean
    },
    pk: {
      type: String,
      default: 'id'
    },
    pkLabel: {
      type: String,
      default: '编号'
    },
    // 是否显示返回顶部
    backtop: {
      type: Boolean,
      default: true
    },
    // 头部按钮文字
    headBtnText: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 行按钮文字
    rowBtnText: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 显示头部指定按钮
    showHeadBtn: {
      type: [Array, String],
      default: '*'
    },
    // 显示行的指定按钮
    showRowBtn: {
      type: [Array, String],
      default: '*'
    },
    hideColumnsControl: {
      type: Boolean
    }
  },
  filters: {},
  watch: {
    kw(val) {
      this.keyword = val
    },
    list(val) {
      if (!this.visible) {
        this.visible = true
      }
      /*      if (this.val) {
              setTimeout(() => {
                this.$forceUpdate()
              }, 500)
            }*/
    }
  },
  computed: {
    // 获取查询字符串
    queryParams() {
      var obj = Object.assign({}, this.query, this.params)
      if (this.keyword) {
        obj.kw = this.keyword
      }

      if (this.pagination) {
        obj.page = this.page
        obj.limit = this.limit
      }

      return obj
    },
    cols() {
      const cols = [...this.columns]
      const def = {
        name: 'LABEL',
        field: 'undefined',
        fixed: null,
        // 宽度
        width: null,
        // 在字段前加入
        before: '',
        // 在字段后加入
        after: '',
        // 排序
        sortable: false,
        // 需要用list label的数据
        label: null,
        // list label显示的字段
        list_field: '',
        // list label值的字段
        list_value: '',
        // 数据列表
        list: [],
        // 改变宽度 需要设置table的border
        resizable: false,
        // 列格式化函数
        formatter: null,
        // 在加入前缀和后缀之前的格式化函数
        format: null,
        // 超出显示tooltip
        show_overflow_tooltip: true,
        // 对齐方式
        align: 'left',
        // 类名
        class_name: '',
        // 表头类名
        label_class_name: '',
        // 过滤
        filters: null,
        // 过滤多选
        filter_multiple: false,
        // 模板类型
        type: '',
        // 组件配置
        opts: {},
        visible: true
      }
      cols.forEach((it, i) => {
        const col = { ...def, ...it }

        if (col.type === 'bool') {
          col.list = [col.opts.inactive_text || '否', col.opts.active_text || '是']
        }

        if (col.label) {
          let label
          // true的话就直接取字段名
          if (col.label === true) {
            label = col.field
            // 字符串则是label名
          } else if (typeof col.label === 'string') {
            label = col.label
          }
          if (label) {
            col.list = this.listLabel[label]?.option || []
          }
        }

        // 更新筛选项
        if (this.filter && Object.keys(col.list).length && (col.filters === null || !col.filters.length)) {
          col.filters = []

          for (const i in col.list) {
            const it = col.list[i]

            if (col.list_field && col.list_value) {
              col.filters.push({ text: it[col.list_field], value: it[col.list_value] })
            } else {
              col.filters.push({ text: it, value: i })
            }
          }
        }

        cols[i] = col
      })
      console.log('table columns', cols)
      console.log('list', this.list)
      return cols
    },
    // 头部的按钮
    headBtns() {
      let array = []
      const btn = []

      if (!this.hideDefaultHeadBtn) {
        array = array.concat(this.defaultHeadBtn)
      }

      // 有自定义按钮
      if (this.headBtn.length) {
        let before = this.headBtnPosition === 'before'
        before ? array.unshift(...this.headBtn) : array.push(...this.headBtn)
      }

      const def = {
        // 类型
        type: 'primary',
        // 图标
        icon: '',
        // 权限
        auth: '',
        // 需要有选中行才可点击
        selected: false,
        // 指定模式
        mode: ['show'],
        show: true
      }

      array.forEach((it, i) => {
        it = Object.assign({}, def, it)
        // 在模式里
        if (this.inMode(it.mode)) {
          btn.push(it)
        }
      })

      console.log('head btn', this.mode, btn)

      return btn
    },
    // 行的按钮
    rowBtns() {
      let array = []
      const btn = []
      if (!this.hideDefaultRowBtn) {
        array = array.concat(this.defaultRowBtn)
      }

      // 有自定义按钮
      if (this.rowBtn.length) {
        let before = this.rowBtnPosition === 'before'
        before ? array.unshift(...this.rowBtn) : array.push(...this.rowBtn)
      }

      const def = {
        // 权限
        auth: '',
        // 指定模式才显示
        mode: ['show'],
        // 检测按钮是否禁用函数
        show: true
      }

      array.forEach((it) => {
        it = Object.assign({}, def, it)
        // 在模式里
        if (this.inMode(it.mode)) {
          btn.push(it)
        }
      })

      console.log('row btn', this.mode, btn)

      return btn
    },
    // 选中的ID
    selectionID() {
      const id = []
      this.selection.forEach(it => {
        id.push(it.id)
      })
      return id
    },
    // 默认的头部按钮
    defaultHeadBtn() {
      return [
        {
          name: this.headBtnText.flush || '刷新',
          type: '',
          icon: 'el-icon-refresh',
          auth: this.getFullAuth('index'),
          key: 'flush',
          mode: '*',
          show: this.headBtnShow('flush')
        },
        {
          name: this.headBtnText.select || '选择',
          type: 'danger',
          icon: 'el-icon-check',
          key: 'select',
          mode: 'select',
          selected: true,
          show: this.selectMultiple && this.headBtnShow('select')
        },
        {
          name: this.headBtnText.save || '添加',
          type: 'primary',
          icon: 'el-icon-plus',
          auth: this.getFullAuth('save'),
          key: 'save',
          mode: '*',
          show: this.headBtnShow('save')
        },
        {
          name: this.headBtnText.delete || '删除',
          type: 'danger',
          icon: 'el-icon-delete',
          auth: this.getFullAuth('delete'),
          key: 'delete',
          selected: true,
          confirm: this.deleteMultipleConfirm || '确定要删除{n}条选中数据吗？',
          show: this.headBtnShow('delete')
        }
      ]
    },
    // 默认的行按钮
    defaultRowBtn() {
      return [
        {
          name: this.rowBtnText.select || '选择',
          key: 'select',
          mode: ['select'],
          show: this.rowBtnShow('select') && this.optional
        },
        {
          name: this.rowBtnText.update || '编辑',
          auth: this.getFullAuth('update'),
          key: 'update',
          show: this.rowBtnShow('update') && this.editable
        },
        {
          name: this.rowBtnText.delete || '删除',
          auth: this.getFullAuth('delete'),
          key: 'delete',
          confirm: this.deleteConfirm || '确定要删除吗？',
          show: this.rowBtnShow('delete') && this.deletable
        }
      ]
    },
    /**
     * 将传入的列生成hash值
     */
    hash() {
      let string = JSON.stringify(this.columns)
      return (this.control ? this.control + '-' : '') + md5(string).substr(0, 10)
    },
    /**
     * 获取列的label
     */
    columnLabels() {
      let obj = {
        selection: '选项',
        pk: this.pkLabel
      }

      if (!this.hideSelection) {
        obj.selection = '选项框'
      }

      if (!this.hidePk) {
        obj.pk = this.pkLabel
      }

      this.cols.forEach(it => {
        obj[it.field] = it.name
      })

      if (!this.hideRowBtn) {
        obj.control = this.rowBtnColumn.name
      }

      return obj
    },
    /**
     * 获取所有列的键
     */
    columnFields() {
      return Object.keys(this.columnLabels)
    }
  },
  created() {
    this.loadTrigger()
    // 显示列控制
    if (!this.hideColumnsControl) {
      this.setShowColumns()
    }
  },
  methods: {
    // 是否在指定的模式下
    inMode(mode) {
      if (typeof mode === 'string') {
        mode = [mode]
      }
      return !mode || !mode.length || mode.includes('*') || mode.includes(this.mode)
    },
    initParams() {
      this.page = 1
    },
    // 搜索框输入事件
    onKwInput(value) {
      this.keyword = value.trim()
    },
    // 点击搜索
    onSearch() {
      this.loadTrigger(true)
    },
    // 选中状态改变
    onTableSelectionChange(selection) {
      console.log('selection', selection)
      this.selection = selection
    },
    // 触发双击
    onTableRowDbClick(row, column, event) {
      this.$emit('row-dblclick', row, column, event)
    },
    /**
     * 过滤
     * @param filters
     */
    onTableFilter(filters) {
      if (this.filterTimer) {
        clearTimeout(this.filterTimer)
      }

      for (const [field, value] of Object.entries(filters)) {
        const filterKey = `filter[${field}]`
        const opKey = `op[${field}]`

        if (value.length) {
          this.$set(this.params, filterKey, value.join(','))
          this.$set(this.params, opKey, value.length > 1 ? 'IN' : '=')
        } else {
          this.$delete(this.params, filterKey)
          this.$delete(this.params, opKey)
        }
      }
      this.loadTrigger(true)
      // this.filterTimer = setTimeout(this.loadTrigger, 100)
    },
    // 分页的获取数量变化
    onPaginationSizeChange(limit) {
      this.limit = limit
      setLimit(limit)
      this.loadTrigger(true)
    },
    // 分页的页码变化
    onPaginationCurrentChange(page) {
      this.page = page
      this.loadTrigger()
    },
    // 监听分页变化
    onPaginationChange({ limit, page }) {
      const init = this.limit != limit
      this.limit = limit
      this.page = page
      setLimit(limit)
      this.loadTrigger(init)
    },
    // 删除
    onDelete() {
      this.$emit('delete', { id: this.deleteRow.id, row: this.deleteRow, index: this.deleteIndex })
    },
    // 加载触发事件
    loadTrigger(init = false) {
      if (init) {
        this.initParams()
      }
      this.$emit('load', { query: this.queryParams, init })
    },
    // 是否有CURD权限
    hasCurdAuth(auth) {
      return this.checkAuth(this.getFullAuth(auth))
    },
    // 检测权限
    checkAuth(auth) {
      return checkPermission(auth)
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
    // 点击头部的按钮
    onTapHeadBtn(btn) {
      if (btn.confirm) {
        this.setConfirmInfo(btn.confirm.replace('{n}', this.selection.length), () => this.headBtnTrigger(btn))
        return
      }

      this.headBtnTrigger(btn)
    },
    // 点击行按钮
    onTapRowBtn(btn, row, index, column) {
      if (btn.confirm) {
        this.setConfirmInfo(this.replace(btn.confirm, row), () => this.rowBtnTrigger(btn, row, index, column))
        return
      }

      this.rowBtnTrigger(btn, row, index, column)
    },
    /**
     * 替换模板字符串
     * @param string
     * @param data
     * @returns {*}
     */
    replace(string, data) {
      const p = /\{(\w+)\}/g
      const m = string.match(p)

      if (m) {
        m.forEach(field => {
          const k = field.substr(1, field.length - 2)

          if (typeof data[k] !== 'undefined') {
            string = string.replace(new RegExp('\{' + k + '\}', 'g'), data[k])
          }
        })
      }

      return string
    },
    // 触发事件
    headBtnTrigger(btn) {
      this.$emit('tap-head-btn', {
        key: btn.key,
        selection: this.selection,
        ids: this.selectionID
      })
    },
    rowBtnTrigger(btn, row, index, column) {
      this.$emit('tap-row-btn', {
        index,
        row,
        column,
        key: btn.key
      })
    },
    // 设置提示框的内容
    setConfirmInfo(title, callback) {
      this.confirm = {
        title,
        callback
      }

      this.dialogVisible = true
    },
    // 确认按钮
    onConfirmSuccess() {
      this.confirm.callback && this.confirm.callback()
    },
    /**
     * 获取列的原始值
     */
    getColValue(col, row) {
      const val = deepVal(col.field, row)

      return val
    },
    /**
     * 获取格式化的值
     * @param col
     * @param row
     * @returns {string|*}
     */
    getFormatColValue(col, row) {
      let val = this.getColValue(col, row)

      if (val === '') {
        return val
      }

      if (Object.keys(col.list).length) {
        if (col.list_field && col.list_value) {
          for (const it of col.list) {
            if (it[col.list_value] == val) {
              val = it[col.list_field]
            }
          }
        } else {
          val = col.list[val]
        }
      }

      if (col.format && typeof col.format === 'function') {
        val = col.format(val, row)
      }

      return col.before + val + col.after
    },
    // 是否为空
    isEmpty(col, row) {
      const val = this.getColValue(col, row)
      return typeof val === 'undefined' || val === '' || val === null
    },
    // 触发更新
    onUpdateItem(args) {
      this.$emit('update-item', args)
    },
    // 行按钮是否禁用检测
    rowBtnDisabled(btn, row, index) {
      if (typeof btn.show === 'function') {
        return !btn.show(row, index)
      }
      return !btn.show
    },
    // 头部按钮是否禁用检测
    headBtnDisabled(btn) {
      if (typeof btn.show === 'function') {
        return !btn.show()
      }
      return !btn.show
    },
    /**
     * 检测元素是否显示
     * @param col
     * @returns {boolean|*}
     */
    checkColVisible(col) {
      let status = this.isShowColumn(col.field)

      if (typeof col.visible === 'boolean') {
        status = status && col.visible
      }
      if (typeof col.visible === 'function') {
        status = status && col.visible.call(this, this.formData, this.detail, col)
      }

      return status
    },
    /**
     * 头部按钮是否显示
     * @param key
     * @returns {boolean|boolean}
     */
    headBtnShow(key) {
      return this.showHeadBtn === '*' || this.showHeadBtn.includes(key)
    },
    /**
     * 行的按钮是否显示
     * @param key
     * @returns {boolean|boolean}
     */
    rowBtnShow(key) {
      console.log(this.showRowBtn)
      return this.showRowBtn === '*' || this.showRowBtn.includes(key)
    },
    /**
     * 设置显示的列
     * @param value 数据
     * @param set 是否设置到数据上
     */
    setShowColumns(value = null, set = false) {
      const cacheKey = this.hash + '-show-columns'
      // 有传入值则是设置到缓存里
      if (value) {
        if (set) {
          this.showColumns = value
        }
        debounce(function () {
          localStorage.setItem(cacheKey, JSON.stringify(value))
        }, 500)()
      } else {
        value = localStorage.getItem(cacheKey)

        if (value) {
          try {
            value = JSON.parse(value)
          } catch (e) {
            value = null
          }
        }

        if (!value) {
          value = this.columnFields
        }

        this.showColumns = value
        this.setCheckAllStatus()
      }
    },
    /**
     * 是否显示列
     */
    isShowColumn(name) {
      return this.showColumns.includes(name)
    },
    /**
     * 改变显示列的状态
     * @param value
     */
    onChangeShowColumns(value) {
      this.setShowColumns(value)
      this.setCheckAllStatus()
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    /**
     * 设置全选的状态
     */
    setCheckAllStatus() {
      let checkedLength = this.showColumns.length
      let length = this.columnFields.length
      this.checkAllColumns = checkedLength === length
      this.isIndeterminate = checkedLength > 0 && checkedLength < length
    },
    showAllColumns(val) {
      let checked = val ? this.columnFields : []
      this.setShowColumns(checked, true)
      this.isIndeterminate = false
    }
  }
}
</script>

<style scoped lang="scss">
.mb0 {
  margin-bottom: 0;
}

.curd-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: #fff;

  /*  position: sticky;
    top: 1px;
    z-index: 99;*/

  .search-group-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.table-box {
  width: 100%;
  margin-bottom: 20px;
}

.page-box {
  display: flex;
  justify-content: center;
}
</style>
