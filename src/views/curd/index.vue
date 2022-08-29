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
        :selected-value="selectedValue"
        :selected-pk="selectedPk"
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
        @submit="onSubmit"
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
    },
    // 加载列表的接口
    listApi: {
      type: Function
    },
    // 新增接口
    saveApi: {
      type: Function
    },
    // 更新接口
    updateApi: {
      type: Function
    },
    // 修改时获取数据接口
    editApi: {
      type: Function
    },
    // 更改单一数据时的接口
    changeApi: {
      type: Function
    },
    // 删除接口
    deleteApi: {
      type: Function
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

      if (!args.first) {
        var route = this.$route
        this.$router.replace({
          name: route.name,
          query: args.query
        })
      }

      this.getList(args.query, args.init)
    },
    initParams() {
      this.list = []
      this.isLoadListData = false
      // 不置0，会出现显示在1页
      // this.total = 0
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
        query.with_label = 1
      }

      const method = this.listApi || this.api.index

      return method(query).then(res => {
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
      }, (err) => {
        this.listLoading = false
        this.$message.error(err.message || '加载数据失败')
      })
    },
    onSave(args) {
      this.detailID = 0
      this.detail = args.data?.detail || {}
      // this.dialogVisible = true
      this.isLoadDetailData = false
      this.getEditData()
    },
    onUpdate(args) {
      this.detailID = args.id
      this.detail = args.row
      console.log(args)
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
      const method = this.deleteApi || this.api.delete
      return method(ids).then(res => {
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
      }, (err) => {
        this.hideLoading()
        this.$message.error(err.message || '删除数据失败')
      })
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
      const method = this.changeApi || this.api.change
      return method(id, field, value).then(res => {
        this.hideLoading()
        this.$set(this.list[index], field, value)
      }, (err) => {
        this.hideLoading()
        this.$message.error(err.message || '更新数据失败')
      })
    },
    // 获取新增或者编辑数据
    getEditData() {
      const params = {}
      if (!this.isLoadDetailLabel || this.loadDetailLabel) {
        params.with_label = 1
      }

      // 已加载过label并且为添加状态
      if (!this.detailID && this.isLoadDetailLabel) {
        this.dialogVisible = true
        return
      }

      showLoading('获取数据中...')
      let method = this.editApi || this.api.edit
      return method(this.detailID, params).then(res => {
        this.isLoadDetailLabel = true
        this.isLoadDetailData = true

        if (!Array.isArray(res.data?.detail) && res.data?.detail) {
          this.detail = res.data?.detail
        }
        // 获取不到任何数据
        if (!Object.keys(this.detail).length) {
          this.detailID = 0
        }

        if (res.data?.label && Object.keys(res.data.label).length) {
          this.detailLabel = res.data.label
        }
        hideLoading()
        this.dialogVisible = true
      }, (err) => {
        this.$message.error(err.message || '获取数据失败')
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
    onSubmit(detail, args = {}) {
      if (detail.id) {
        this.detailID = detail.id
      }
      if (this.detailID) {
        this.update(detail, args)
      } else {
        this.save(detail, args)
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
     * @param data
     * @param args
     */
    save(data, args = {}) {
      const id = this.detailID
      if (id) {
        return this.update(data)
      }
      this.showLoading(args.loading || '添加中...')
      // 清空错误消息
      this.error = {}
      const method = this.saveApi || this.api.save
      return method(data).then(res => {
        this.hideLoading()
        this.total++
        this.dialogVisible = false
        args.success && args.success()
        this.$message({
          message: args.msg || res.msg || '添加成功',
          type: 'success'
        })
        this.onFlush({ reload: true })
      }, this.saveErrorHandle)
    },
    /**
     * 更新操作
     * @param data
     * @param args
     * @returns {Promise<void>|*}
     */
    update(data, args = {}) {
      const id = this.detailID

      if (!id) {
        return this.save(data)
      }
      this.showLoading(args.loading || '更新中...')
      // 清空错误消息
      this.error = {}
      const method = this.updateApi || this.api.update
      return method(data, id).then(res => {
        this.hideLoading()
        this.dialogVisible = false
        args.success && args.success()
        this.$message({
          message: args.msg || res.msg || '更新成功',
          type: 'success'
        })
        this.onFlush()
      }, this.saveErrorHandle)
    },
    saveErrorHandle(err) {
      this.hideLoading()
      if (err.code !== 0 && err?.data) {
        var error = err.data || {}
        if (!Array.isArray(error)) {
          this.error = error
        }
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
