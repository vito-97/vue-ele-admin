<template>
  <div class="custom-table-box" :class="tableClass">
    <div class="tool-box" :class="{'scroll-bar':scroll.y}">
      <el-row :gutter="15">
        <el-col :span="12" :xs="24">
          <el-button-group size="mini" class="btn-group-box">
            <!--        默认控制按钮之前-->
            <slot name="before-head-button" :selection="selection"></slot>
            <template v-for="(btn) in headBtns">
              <el-button
                :type="btn.type"
                :icon="btn.icon"
                :disabled="btn.selected && !selection.length"
                size="mini"
                v-if="!headBtnDisabled(btn) && (!btn.auth || checkPermission(btn.auth))"
                @click="onTapHeadBtn(btn)"
                :key="btn.key"
              >
                {{ btn.name }}
              </el-button>
            </template>
            <!--        默认控制按钮之后-->
            <slot name="after-head-button" :selection="selection"></slot>
          </el-button-group>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="search-group-box" v-if="searchable">
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
                <div>
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllColumns" @change="showAllColumns">全选
                  </el-checkbox>
                </div>
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
            <!--            切换语言-->
            <div v-if="langStatus" class="lang-switch-box">
              <el-select
                class="lang-select"
                v-model="langValue"
                placeholder="请选择语言"
                size="mini"
                popper-class="lang-select-popper"
                @change="onLangChange">
                <el-option
                  v-for="(name,lang) in langList"
                  :key="lang"
                  :label="name"
                  :value="lang">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <slot name="content" :column="cols">
        <component
          v-if="visible"
          :is="tableCom"
          :data="list"
          :row-key="rowKey"
          :stripe="stripe"
          :border="border"
          :default-expand-all="defaultExpandAll"
          :tree-props="treeProps"
          :height="height"
          :use-virtual="useVirtual"
          :data-changes-scroll-top="false"
          :big-data-checkbox="!hideSelection && isShowColumn('selection')"
          class="table-box"
          ref="table"
          v-bind="$attrs"
          @selection-change="onTableSelectionChange"
          @row-dblclick="onTableRowDbClick"
          @filter-change="onTableFilter"
        >
          <!--      选项列-->
          <component
            v-if="!hideSelection && isShowColumn('selection')"
            :is="tableColumnCom"
            type="selection"
            :selectable="selectable"
            key="selection"
            width="50">
          </component>
          <component
            v-if="!hidePk && isShowColumn('pk')"
            :is="tableColumnCom"
            :prop="pk"
            :label="pkLabel"
            :key="pk"
            width="80">
          </component>
          <!--      渲染列-->
          <template v-for="it in cols">
            <component
              v-if="checkColVisible(it)"
              :is="tableColumnCom"
              :key="it.field"
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
                  :$index="$index"
                  :value="getColValue(it, row)"></slot>

                <slot
                  :name="(it.slot || it.field)"
                  :row="row"
                  :$index="$index"
                  :value="getColValue(it, row)"
                >

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
                  :$index="$index"
                  :value="getColValue(it, row)"></slot>

                <slot
                  :name="(it.slot || it.field)+'-after'"
                  v-if="row[it.field]"
                  :row="row"
                  :$index="$index"
                  :value="getColValue(it, row)"></slot>

              </template>

            </component>
          </template>

          <!--      操作列-->
          <component
            v-if="!hideRowBtn && isShowColumn('control')"
            :is="tableColumnCom"
            :fixed="isMobile ? false : 'right'"
            :label="rowBtnColumn.name"
            :width="rowBtnColumn.width"
            key="control"
          >
            <template slot-scope="{row,column,$index}">

              <slot name="before-row-btn" :row="row" :$index="$index"></slot>

              <slot name="row-btn" :row="row" :$index="$index">
                <template v-for="(btn) in rowBtns">
                  <el-button
                    type="text"
                    size="small"
                    @click.native.stop="onTapRowBtn(btn,row,$index,column)"
                    v-if="btn.show && (!btn.auth || checkPermission(btn.auth))"
                    :disabled="rowBtnDisabled(btn,row,$index)"
                    :key="btn.key"
                  >
                    {{ btn.name }}
                  </el-button>
                </template>
              </slot>
              <slot name="after-row-btn" :row="row" :$index="$index"></slot>
            </template>
          </component>
        </component>
        <!--    分页-->
        <div class="page-box" v-if="pagination">
          <pagination
            :total="total"
            :page="page"
            :page-sizes="pageSizes"
            :limit="limit"
            :auto-scroll="true"
            :small="isMobile"
            :pager-count="pagerCount"
            :layout="pageLayout"
            @pagination="onPaginationChange"/>
        </div>
      </slot>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :width="confirmWidth"
      center>
      <div class="mb10" v-if="confirm.title">{{ confirm.title }}</div>
      <div v-if="confirm.input">
        <template v-if="confirmIsCustomForm">
          <custom-form
            ref="confirmForm"
            :columns="confirm.input"
            :dialog="false"
            :hide-button="true"
            :visible.sync="dialogVisible"
            v-model="confirmFormData"
            @submit="onSubmitConfirm"
          ></custom-form>
        </template>
        <template v-else>
          <el-input
            v-model="confirmContent"
            :type="typeof confirm.input == 'boolean' ? 'text' : confirm.input"
            :placeholder="confirm.placeholder || ''"
          >
          </el-input>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onConfirmCancel">{{ confirm.cancelText }}</el-button>
        <el-button
          :type="confirm.btnType || 'primary'"
          @click="onConfirmSuccess">{{ confirm.confirmText }}</el-button>
      </span>
    </el-dialog>

    <el-backtop v-if="backTop"></el-backtop>
  </div>
</template>

<script>
import { getLimit, pageSizes, setLimit } from '@/utils/list'
import checkPermission from '@/utils/permission'
import Pagination from '@/components/Pagination'
import customForm from '@/views/custom/customForm'
import { deepVal, debounce, isPositiveInteger, toArray } from '@/utils'
import itemsCom from '@/utils/table-column'
import md5 from 'js-md5'
import { mapState } from 'vuex'
import Sticky from '@/components/Sticky'
import settings from '@/settings'

export default {
  name: 'CustomTable',
  data() {
    const query = this.mergeQueryString()

    return {
      // 是否显示表格 默认不显示 等到加载表格才显示 这样才能渲染过滤
      visible: false,
      deleteRow: {},
      deleteIndex: '',
      dialogVisible: false,
      // 首次加载
      first: true,
      page: query.page,
      limit: query.limit,
      keyword: query.keyword,
      // 选中列表
      selection: [],
      // 确认的内容
      confirm: {},
      // 确认的输入内容
      confirmContent: '',
      // 确认的输入表单内容
      confirmFormData: {},
      params: {},
      filterTimer: '',
      items: itemsCom,
      showColumns: [],
      // 控制是否为有选但是没全选
      isIndeterminate: true,
      // 全选列
      checkAllColumns: false,
      // 排除的参数名
      excludeParams: [],
      defaultLang: settings.defaultLang,
      langValue: settings.defaultLang
    }
  },
  components: { Pagination, customForm, Sticky },
  props: {
    height: { type: [Number, String], default: null },
    // 控制器名
    control: { type: String },
    // 隐藏默认的头部按钮
    hideDefaultHeadBtn: { type: Boolean },
    // 隐藏默认的行按钮
    hideDefaultRowBtn: { type: Boolean },
    // 隐藏选项框
    hideSelection: { type: Boolean },
    // 隐藏操作列
    hideRowBtn: { type: Boolean },
    // 数据列表
    list: { type: Array, required: true },
    // 数据列表的label
    listLabel: { type: [Object, Array] },
    // 树形的配置
    treeProps: {
      type: Object,
      default: () => {
        return { children: 'children', hasChildren: 'hasChildren' }
      }
    },
    rowKey: { type: String, default: 'id' },
    // 渲染列配置
    columns: { type: Array, required: true },
    // 关键词
    kw: { type: String },
    // 是否可以搜索
    searchable: { type: Boolean, default: true },
    // 搜索框描述
    searchPlaceholder: { type: String, default: '请输入关键词' },
    // 搜索按钮名称
    searchBtnText: { type: String, default: '搜索' },
    // 查询条件
    query: { type: Object },
    // 是否分页
    pagination: { type: Boolean, default: true },
    // 页码可选数量
    pageSizes: { type: Array, default: () => pageSizes },
    // 总数
    total: { type: Number },
    // 斑马纹
    stripe: { type: Boolean },
    // 纵向边框
    border: { type: Boolean },
    // 展开所有
    defaultExpandAll: { type: Boolean },
    // 头按钮追加按钮的位置 before在默认按钮之前 after在默认按钮之后
    headBtnPosition: { type: String, default: 'before' },
    // 追加头部按钮
    headBtn: { type: Array, default: () => [] },
    // 行按钮追加按钮的位置 before在默认按钮之前 after在默认按钮之后
    rowBtnPosition: { type: String, default: 'before' },
    // 追加行按钮
    rowBtn: { type: Array, default: () => [] },
    // 模式
    mode: { type: String, default: 'show' },
    // 是否多选
    selectMultiple: { type: Boolean },
    // 按钮列的配置
    rowBtnColumn: {
      type: Object,
      default: () => ({
        name: '操作',
        width: 120
      })
    },
    // 删除提示
    deleteConfirm: { type: String },
    // 多选删除提示
    deleteMultipleConfirm: { type: String },
    // 判断是否可以勾选
    // 传入row index
    selectable: { type: Function },
    // 判断是否可以删除
    deletable: { type: [Function, Boolean], default: true },
    // 判断是否可以编辑
    editable: { type: [Function, Boolean], default: true },
    // 判断是否可以选择
    optional: { type: [Function, Boolean], default: true },
    // 是否过滤
    filter: { type: Boolean, default: true },
    // 隐藏ID
    hidePk: { type: Boolean },
    pk: { type: String, default: 'id' },
    pkLabel: { type: String, default: 'ID' },
    // 是否显示返回顶部
    backTop: { type: Boolean, default: true },
    // 头部按钮文字
    headBtnText: { type: Object, default: () => ({}) },
    // 行按钮文字
    rowBtnText: { type: Object, default: () => ({}) },
    // 显示头部指定按钮
    showHeadBtn: { type: [Array, String], default: '*' },
    // 显示行的指定按钮
    showRowBtn: { type: [Array, String], default: '*' },
    hideColumnsControl: { type: Boolean },
    // 选择模式下已被选择的数据
    selectedValue: { type: [Number, String, Array], default: () => ([]) },
    // 选择模式下取数据的键
    selectedPk: { type: String, default: 'id' },
    // 工具栏是否置顶
    toolFixed: { type: Boolean, default: true },
    // 每行高度
    rowHeight: { type: Number, default: 60 },
    // 使用虚拟模式
    useVirtual: { type: Boolean, default: false },
    // 多语言状态
    langStatus: { type: Boolean, default: false },
    // 多语言列表
    langList: { type: Object, default: () => ({}) },
    // 多语言字段
    langField: { type: Array, default: () => [] },
    // 选择模式下调用该选择器的源数据
    targetDetail: { type: Object, default: () => ({}) }
  },
  filters: {},
  watch: {
    kw(val) {
      this.keyword = val
    },
    list(val) {
      console.log('list', val)
      if (!this.visible) {
        this.visible = true
      }
      this.setSelectedRows()
    },
    // 监听已选中的值改变则从新更改选中
    selectedValue(value) {
      this.setSelectedRows()
    },
    langStatus: {
      immediate: true,
      handler(val) {
        if (val) {
          this.setLang()
        }
      }
    }
  },
  computed: {
    ...mapState({
      fixedHeader: state => state.settings.fixedHeader,
      sidebar: state => state.app.sidebar,
      scroll: state => state.app.scroll
    }),
    // 确认框的宽度
    confirmWidth() {
      return this.isMobile ? '95%' : '35%'
    },
    // 使用的表格组件
    tableCom() {
      return this.useVirtual ? 'UTable' : 'ElTable'
    },
    // 使用的表格列组件
    tableColumnCom() {
      return this.useVirtual ? 'UTableColumn' : 'ElTableColumn'
    },
    // 自定义
    tableClass() {
      return {
        fixed: this.toolFixed && this.fixedHeader && this.mode === 'show',
        'hide-sidebar': !this.sidebar.opened
      }
    },
    // 选中数据转数组
    selectedValueArray() {
      var value = toArray(this.selectedValue).map(v => v.toString())

      return value
    },
    // 确认框是否使用自定义表单
    confirmIsCustomForm() {
      return this.confirm.input && Array.isArray(this.confirm.input)
    },
    // 分页参数
    pageLayout() {
      let isMobile = this.isMobile

      let arr = [
        !isMobile && 'total', 'sizes', 'prev', 'pager', 'next', !isMobile && 'jumper'
      ]

      return arr.filter(v => v).join(',')
    },
    // 分页显示按钮的数量
    pagerCount() {
      return this.isMobile ? 5 : 11
    },
    // 是否使用页面的Url Query
    useQuery() {
      return this.mode === 'show'
    },
    // 获取查询字符串
    queryParams() {
      var obj = {}

      // 使用query string
      // 排到前面 可以让内部的查询条件替换
      if (this.useQuery) {
        let query = { ...this.$route.query }
        const exclude = ['page', 'kw', 'limit', ...this.excludeParams]
        // 排除参数
        for (let field of exclude) {
          if (typeof query[field] !== 'undefined') {
            delete query[field]
          }
        }

        if (Object.keys(query).length) {
          obj = { ...obj, ...query }
        }
      }

      // 合并参数
      Object.assign(obj, this.query, this.params)

      if (!obj.kw && this.keyword) {
        obj.kw = this.keyword
      }

      // 需要分页
      if (this.pagination) {
        if (!obj.page) {
          obj.page = this.page
        }
        if (!obj.limit) {
          obj.limit = this.limit
        }
      }

      return obj
    },
    cols() {
      const cols = [...this.columns]

      const def = {
        name: 'LABEL',
        field: '',
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
        visible: true,
        // 获取值回调函数，传入列数据
        value: null
      }

      for (let [i, it] of cols.entries()) {
        if (typeof it !== 'object' || !it.field) {
          cols.splice(i, 1)
          continue
        }

        const col = { ...def, ...it }

        // 有默认list值
        if (typeof itemsCom[col.type]?.list !== 'undefined') {
          var list = itemsCom[col.type]?.list

          col.list = (typeof list === 'function' ? list(col.opts) : list) || []
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
      }

      console.log('table columns', cols)
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
        name: '按钮',
        key: '',
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
        // 是否显示
        show: true,
        // 是否显示输入框 字符串类型的话则设置成输入框类型 数组的话则使用自定义表单
        input: false,
        // 提示信息
        confirm: null,
        confirmText: '确 定',
        cancelText: '取 消'
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
        show: true,
        // 是否显示输入框 字符串类型的话则设置成输入框类型 数组的话则使用自定义表单
        input: false,
        // 提示信息
        confirm: null,
        confirmText: '确 定',
        cancelText: '取 消'
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
          show: this.headBtnShow('delete'),
          btnType: 'danger',
          confirmText: this.headBtnText.deleteConfirmText || '删除'
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
          show: this.rowBtnShow('select') && ((row, index) => {
            return !this.selectedValueArray.includes(row[this.selectedPk].toString()) && !this.rowBtnDisabled(this.optional, row, index)
          })
        },
        {
          name: this.rowBtnText.select || '取消',
          key: 'unselect',
          mode: ['select'],
          show: this.rowBtnShow('unselect') && ((row, index) => {
            return this.selectedValueArray.includes(row[this.selectedPk].toString())
          })
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
          show: this.rowBtnShow('delete') && this.deletable,
          btnType: 'danger',
          confirmText: this.rowBtnText.deleteConfirmText || '删除'
        }
      ]
    },
    /**
     * 当前表格的名称
     * @returns {string|string}
     */
    name() {
      return this.control ? this.control + '-' : this.$route.path
    },
    /**
     * 将传入的列生成hash值
     */
    hash() {
      let string = this.columnFields.join(',')
      return this.name + md5(string).substr(0, 10)
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
        if (this.checkColVisible(it, false)) {
          obj[it.field] = it.name
        }
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
    },
    /**
     * 当前是否为显示默认语言
     * @returns {boolean}
     */
    isDefaultLang() {
      const { defaultLang, langValue } = this
      return defaultLang === langValue
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
    /**
     * 设置已选中的行
     */
    setSelectedRows() {
      if (!this.selectedValueArray.length && this.selection.length) {
        this.$refs.table?.clearSelection()
        return
      }

      if (this.selectedValue) {
        // 判断选中的是否被取消选中
        for (let item of this.selection) {
          let v = (item[this.selectedPk] || '').toString()

          if (v && !this.selectedValueArray.includes(v)) {
            this.$nextTick(() => {
              this.$refs.table.toggleRowSelection(item, false)
            })
          }
        }
        // 判断是否被选中
        for (let item of this.list) {
          let v = (item[this.selectedPk] || '').toString()
          // 选中行
          if (v && this.selectedValueArray.includes(v)) {
            this.$nextTick(() => {
              this.$refs.table.toggleRowSelection(item, true)
            })
          }
        }
      }
    },
    // 合并传入的query string
    mergeQueryString() {
      const query = this.$route.query
      const useQuery = this.mode === 'show'
      let page = useQuery && isPositiveInteger(query.page) && Number(query.page) || 1
      let limit = useQuery && isPositiveInteger(query.limit) && Number(query.limit) || getLimit()
      let keyword = useQuery && query.kw || ''

      // 未定义该数量
      if (!pageSizes.includes(limit)) {
        pageSizes.push(limit)
        // 重新排序
        pageSizes.sort(function (a, b) {
          return a > b ? 1 : -1
        })
      }

      return {
        page, limit, keyword
      }
    },
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
      let excludeParams = []
      for (const [field, value] of Object.entries(filters)) {
        const filterKey = `filter[${field}]`
        const opKey = `op[${field}]`

        if (value.length) {
          this.$set(this.params, filterKey, value.join(','))
          this.$set(this.params, opKey, value.length > 1 ? 'IN' : '=')
        } else {
          excludeParams.push(filterKey, opKey)
          this.$delete(this.params, filterKey)
          this.$delete(this.params, opKey)
        }
      }
      this.excludeParams = excludeParams
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
      // 首次加载
      let first = this.first
      if (first) {
        this.first = false
      }
      const excludeParams = this.excludeParams
      const query = this.queryParams

      this.$emit('load', { query, init, first, excludeParams })
    },
    // 是否有CURD权限
    checkAuth(auth) {
      return this.checkPermission(this.getFullAuth(auth))
    },
    // 检测权限
    checkPermission(auth) {
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
        const args = {
          title: btn.confirm.replace('{n}', this.selection.length),
          input: this.getConfirmBtnInput(btn, this.selection),
          placeholder: btn.placeholder || '',
          btnType: btn.btnType || '',
          confirmText: btn.confirmText,
          cancelText: btn.cancelText
        }
        this.setConfirmInfo(args, (data) => this.headBtnTrigger(btn, data))
        return
      }

      this.headBtnTrigger(btn)
    },
    // 点击行按钮
    onTapRowBtn(btn, row, index, column) {
      if (btn.confirm) {
        const args = {
          title: this.replace(btn.confirm, row),
          input: this.getConfirmBtnInput(btn, row),
          placeholder: btn.placeholder || '',
          btnType: btn.btnType || '',
          confirmText: btn.confirmText,
          cancelText: btn.cancelText
        }
        this.setConfirmInfo(args, (data) => this.rowBtnTrigger(btn, row, index, column, data))
        return
      }

      this.rowBtnTrigger(btn, row, index, column)
    },
    /**
     * 获取按钮的输入框内容
     */
    getConfirmBtnInput(btn, ...args) {
      var input = btn.input || false

      if (typeof input === 'function') {
        input = input(...args)
      }

      return input
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
    // 头按钮触发事件
    headBtnTrigger(btn, data = {}) {
      this.$emit('tap-head-btn', {
        key: btn.key,
        selection: this.selection,
        ids: this.selectionID,
        data
      })
    },
    // 行按钮触发事件
    rowBtnTrigger(btn, row, index, column, data = {}) {
      this.$emit('tap-row-btn', {
        index,
        row,
        column,
        key: btn.key,
        data
      })
    },
    // 设置提示框的内容
    setConfirmInfo(confirm, callback) {
      this.confirmContent = ''
      this.confirm = {
        ...confirm,
        callback
      }

      this.dialogVisible = true
    },
    // 确认按钮
    onConfirmSuccess() {
      var { confirmIsCustomForm } = this

      // 自定义表单模式
      if (confirmIsCustomForm) {
        this.$refs.confirmForm.submit()
        return
      }

      this.dialogVisible = false
      var data = confirmIsCustomForm ? this.confirmFormData : { content: this.confirmContent }
      this.confirm.callback && this.confirm.callback(data)
    },
    // 取消按钮
    onConfirmCancel() {
      this.dialogVisible = false
    },
    // 提交表单
    onSubmitConfirm(formData) {
      this.dialogVisible = false
      this.confirm.callback && this.confirm.callback(formData)
    },
    /**
     * 获取列的原始值
     */
    getColValue(col, row) {
      var val
      var field = col.field

      const { langStatus, langField, langValue, isDefaultLang } = this

      // 开启多语言和当前选择的不是默认语言
      if (langStatus && !isDefaultLang) {
        var langKey = langValue.replace('-', '_')
        // 多语言字段包含当前字段
        if (langField.includes(field)) {
          field = langKey + '.' + field
        } else if (field.includes('.')) {
          var array = field.split('.')
          var relationKey = `${array[0]}.${langKey}`
          // 获取关联对象里是否有该语言的键
          var obj = deepVal(relationKey, row)
          if (obj !== '') {
            field = relationKey + '.' + array[1]
          }
        }
      }

      if (typeof col.value === 'function') {
        val = col.value(row, field)
      } else {
        val = deepVal(field, row)
      }

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
        var vals = Array.isArray(val) ? val : val.toString().split(',')
        val = []
        if (col.list_field && col.list_value) {
          for (const it of col.list) {
            if (vals.includes(it[col.list_value])) {
              val.push(it[col.list_field])
            }
          }
        } else {
          for (const idx of vals) {
            val.push(col.list[idx])
          }
        }

        val = val.join(',')
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
      var fn = typeof btn === 'object' ? btn.show : btn
      return !this.checkVarStatus(fn, row, index, this.targetDetail)
    },
    // 头部按钮是否禁用检测
    headBtnDisabled(btn) {
      var fn = typeof btn === 'object' ? btn.show : btn
      return !this.checkVarStatus(fn)
    },
    /**
     * 检测状态
     * @param v
     * @param args
     * @returns {*|boolean}
     */
    checkVarStatus(v, ...args) {
      if (typeof v === 'function') {
        return v(...args)
      }
      return !!v
    },
    /**
     * 检测元素是否显示
     * @param col
     * @param checkShowColumn
     * @returns {boolean|*}
     */
    checkColVisible(col, checkShowColumn = true) {
      var status
      if (checkShowColumn) {
        status = this.isShowColumn(col.field)
      } else {
        status = true
      }

      if (typeof col.visible === 'boolean') {
        status = status && col.visible
      }
      if (typeof col.visible === 'function') {
        status = status && col.visible.call(this, this.list, this.listLabel, col)
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
     * 设置显示的语言
     * @param value
     * @param set
     */
    setLang(value = null, set = false) {
      const cacheKey = this.name + '-lang'

      // 有传入值则是设置到缓存里
      if (value) {
        if (set) {
          this.langValue = value
        }
        debounce(function () {
          localStorage.setItem(cacheKey, value)
        }, 500)()
      } else {
        value = localStorage.getItem(cacheKey)

        if (!value) {
          value = this.defaultLang
        }

        this.langValue = value
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
    /**
     * 全选
     * @param val
     */
    showAllColumns(val) {
      let checked = val ? this.columnFields : []
      this.setShowColumns(checked, true)
      this.isIndeterminate = false
    },
    // 获取传入的状态值
    isCanDo(status, ...args) {
      if (typeof status === 'function') {
        return status(...args)
      }

      return status
    },
    onLangChange(value) {
      this.setLang(value)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.mb0 {
  margin-bottom: 0;
}

.mb10 {
  margin-bottom: 10px;
}

.custom-table-box {
  width: 100%;

  .container {
    width: 100%;
  }

  .tool-box {
    background: #fff;
    //margin-bottom: 30px;
    width: 100%;
    height: 60px;
    box-sizing: border-box;

    .search-group-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .lang-switch-box {
      margin-left: 10px;
      width: 100px;

      .lang-select {
        width: 100%;
      }
    }
  }

  &.fixed {
    .tool-box {
      // 不设置任何偏移量将直接置顶在父容器里
      position: fixed;
      padding: 15px;
      z-index: 8;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
      margin: -15px -15px 0;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .container {
      padding-top: 48px;
    }

    // 隐藏了侧边栏
    &.hide-sidebar {
      .tool-box {
        width: calc(100% - 54px);
      }
    }
  }
}

// 手机端
@media screen and (max-width: 768px) {
  .custom-table-box {
    .tool-box {
      height: 100px;

      .btn-group-box {
        margin-bottom: 10px;
      }

      .search-group-box {
        justify-content: flex-start;
      }
    }

    &.fixed {
      .container {
        padding-top: 85px;
      }

      &.hide-sidebar {
        .tool-box {
          width: 100%;
        }
      }
    }
  }

  .page-box ::v-deep .pagination-container {
    padding: 20px 10px;
    margin-top: 20px;
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
<style lang="scss">
// 动画状态会影响fixed
.fade-transform-leave-active,
.fade-transform-enter-active {
  .custom-table-box {
    &.fixed {
      .tool-box {
        width: 100%;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .el-popup-parent--hidden {
    .custom-table-box {
      &.fixed {
        .tool-box {
          padding-right: 15px;
        }

        // 有滚动条
        .tool-box.scroll-bar {
          padding-right: 32px;
        }
      }
    }
  }
}

</style>
