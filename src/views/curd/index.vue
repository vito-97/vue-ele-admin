<template>
  <div>
    <!--    数据列表-->
    <template v-if="hasCurdAuth('index') && tableCom">
      <component
        :is="tableCom"
        :list="list"
        :list-label="listLabel"
        :total="total"
        :kw="kw"
        :control="control"
        v-loading="listLoading"
        :mode="mode"
        :select-multiple="selectMultiple"
        element-loading-text="拼命加载中"
        @save="onSave"
        @update="onUpdate"
        @delete="onDelete"
        @delete-multiple="onDeleteMultiple"
        @select-multiple="onSelectMultiple"
        @update-item="onUpdateItem"
        @load="onLoad"
        @flush="onFlush"
        @select="onSelect"
      />
    </template>
    <!--    添加或修改-->
    <template v-if="hasCurdAuth('edit') && (hasCurdAuth('save') || hasCurdAuth('update')) && formCom">
      <component
        :is="formCom"
        :detail.sync="detail"
        :id.sync="detailID"
        :visible.sync="dialogVisible"
        :list.sync="detailLabel"
        :control="control"
        :append-to-body="appendToBody"
        :error="error"
        @submit="onSubmit"
      />
    </template>

  </div>

</template>

<script>
import curd from '@/api/curd'
import checkPermission from '@/utils/permission'
import { showLoading, hideLoading } from '@/utils'

const setting = require('@/settings')

export default {
  name: 'CurdIndex',
  data() {
    return {
      kw: '',
      list: [],
      listLabel: {},
      dialogVisible: false,
      visible: {},
      detail: {},
      // 服务器返回的错误信息
      error: {},
      dataTitle: '',
      detailID: 0,
      detailLabel: {},
      total: 0,
      page: 1,
      limit: setting.listLimit,
      loading: '',
      listLoading: false,
      isLoadListData: false,
      isLoadListLabel: false,
      isLoadDetailData: false,
      isLoadDetailLabel: false,
      lastLoadListQuery: {}
    }
  },
  components: {},
  props: {
    // 控制器名称
    control: {
      type: String,
      default: 'admin'
    },
    // 需要的CURD
    curd: {
      type: Array,
      default: () => ['*']
    },
    formCom: {
      type: Object
    },
    tableCom: {
      type: Object
    },
    mode: {
      type: String,
      default: 'show'
    },
    selectMultiple: {
      type: Boolean
    },
    query: {
      type: Object
    },
    pagination: {
      type: Boolean,
      default: true
    },
    // 是否一直获取label
    loadDetailLabel: {
      type: Boolean
    }
  },
  computed: {
    api() {
      return curd(this.control)
    },
    /**
     * 获取权限
     * @returns {{}}
     */
    auth() {
      let curd = this.curd

      if (curd.includes('*')) {
        curd = setting.curds
      }

      const auth = {}

      setting.curds.forEach(it => {
        auth[it] = checkPermission(this.control + '/' + it)
      })

      return auth
    },
    appendToBody() {
      return this.mode === 'select'
    }
  },
  created() {
  },
  methods: {
    onLoad(args) {
      console.log('query args', args)
      this.getList(args.query, args.init)
    },
    initParams() {
      this.list = []
      this.isLoadListData = false
      this.total = 0
    },
    // 获取列表
    getList(query = {}, init = false) {
      this.listLoading = true
      this.lastLoadListQuery = query
      query = { ...query, ...this.query }
      if (init) {
        this.initParams()
      }

      if (!this.isLoadListLabel) {
        query._label = 1
      }

      this.api.index(query).then(res => {
        const data = res.data
        this.page = data.page
        this.total = data.total
        this.limit = data.limit
        this.isLoadListLabel = true
        this.isLoadListData = true

        this.list = data.list

        if (data?.label && Object.keys(data.label).length) {
          this.listLabel = data.label
        }

        this.listLoading = false
      }, () => {
        this.listLoading = false
      })
    },
    onSave() {
      this.detailID = 0
      this.detail = {}
      // this.dialogVisible = true
      this.isLoadDetailData = false
      this.getEditData()
    },
    onUpdate(args) {
      this.detailID = args.id
      this.detail = args.row
      // this.dialogVisible = true
      this.isLoadDetailData = false
      this.getEditData()
    },
    // 单个删除
    onDelete({ row, index }) {
      if (row.id) {
        this.delete(row.id)
      }
    },
    // 批量删除
    onDeleteMultiple({ selection, ids }) {
      if (ids.length) {
        this.delete(ids)
      }
    },
    // 选择
    onSelect(args) {
      console.log(args)
      this.$emit('select', args)
    },
    // 多选
    onSelectMultiple(args) {
      this.$emit('select-multiple', args)
    },
    // 请求接口删除
    delete(ids) {
      this.showLoading('删除中...')
      this.api.delete(ids).then(res => {
        this.hideLoading()

        const { list, n } = this.removeItemByID(ids)

        this.list = list
        this.total -= n

        if (this.list.length <= 0) {
          location.reload()
        } else {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      }, this.hideLoading)
    },
    /**
     * 通过id去删除当前列表数据
     */
    removeItemByID(ids) {
      if (!Array.isArray(ids)) {
        ids = [ids]
      }
      const list = []
      let n = 0
      // 遍历数据去删除
      this.list.forEach((it, i) => {
        if (!ids.includes(it.id)) {
          list.push(it)
        } else {
          n++
        }
      })

      return { list, n }
    },
    /**
     * 更新单个字段
     */
    onUpdateItem({ id, field, value, index }) {
      this.showLoading('更新中...')
      this.api.change(id, field, value).then(res => {
        this.hideLoading()
        this.$set(this.list[index], field, value)
      }, this.hideLoading)
    },
    // 获取新增或者编辑数据
    getEditData() {
      const params = {}
      if (!this.isLoadDetailLabel || this.loadDetailLabel) {
        params._label = 1
      }

      // 已加载过label并且为添加状态
      if (!this.detailID && this.isLoadDetailLabel) {
        this.dialogVisible = true
        return
      }

      showLoading('获取数据中...')
      this.api.edit(this.detailID, params).then(res => {
        this.isLoadDetailLabel = true
        this.isLoadDetailData = true
        this.detail = !Array.isArray(res.data?.detail) && res.data?.detail || {}
        this.detailID = res.data.detail?.id || 0

        if (res.data?.label && Object.keys(res.data.label).length) {
          this.detailLabel = res.data.label
        }
        hideLoading()
        this.dialogVisible = true
      }, () => {
        hideLoading()
      })
    },
    /**
     * 判断是否有CURD权限
     * @param name
     * @returns {*|boolean}
     */
    hasCurdAuth(name) {
      return this.auth[name] || false
    },
    /**
     * 提交表单
     */
    onSubmit(detail) {
      if (this.detailID) {
        this.update(detail)
      } else {
        this.save(detail)
      }
    },
    /**
     * 刷新页面
     */
    onFlush({ reload = false } = {}) {
      const query = this.lastLoadListQuery
      if (reload) {
        query.page = 1
      }

      this.getList(query, true)
    },
    /**
     * 添加操作
     */
    save(data) {
      const id = this.detailID
      if (id) {
        return this.update(data)
      }
      this.showLoading('添加中...')
      // 清空错误消息
      this.error = {}
      return this.api.save(data).then(res => {
        this.hideLoading()
        this.dialogVisible = false
        this.total++
        this.$message({
          message: res.msg || '添加成功',
          type: 'success'
        })
        this.onFlush({ reload: true })
      }, this.saveErrorHandle)
    },
    /**
     * 更新操作
     * @param data
     * @returns {Promise<void>|*}
     */
    update(data) {
      const id = this.detailID

      if (!id) {
        return this.save(data)
      }
      this.showLoading('更新中...')
      // 清空错误消息
      this.error = {}
      return this.api.update(data, id).then(res => {
        this.hideLoading()
        this.dialogVisible = false
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.onFlush()
      }, this.saveErrorHandle)
    },
    saveErrorHandle(err) {
      this.hideLoading()

      if (err.code !== 0 && err.data) {
        this.error = err.data
      }
    },
    /**
     * 显示加载
     * @param msg
     */
    showLoading(msg = 'loading...') {
      showLoading(msg)
    },
    /**
     * 隐藏加载
     */
    hideLoading() {
      hideLoading()
    }
  }
}
</script>

<style lang="scss">
</style>
