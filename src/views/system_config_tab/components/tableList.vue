<template>
  <div>
    <el-tabs
      class="tabs-box"
      type="card"
      :addable="checkAuth('edit') && checkAuth('save') && mode === 'show'"
      v-model="configActive"
      @tab-add="onTabPaneAdd"
    >
      <!--      管理配置菜单-->
      <el-tab-pane label="配置管理" v-if="checkAuth('index')">
        <span slot="label"><i class="el-icon-menu"></i> 配置管理</span>
        <custom-table
          :columns="columns"
          :query="queryParams"
          :searchable="searchable"
          :list="list"
          :list-label="listLabel"
          :pagination="pagination"
          :total="total"
          :kw="kw"
          :control="control"
          :mode="mode"
          :select-multiple="selectMultiple"
          :default-expand-all="true"
          :optional="optional"
          :row-btn="rowBtn"
          :tool-fixed="false"
          @tap-head-btn="onTapHeadBtn"
          @tap-row-btn="onTapRowBtn"
          @row-dblclick="onRowDbClick"
          @update-item="onUpdateItem"
          @load="onLoad"
        >
        </custom-table>
      </el-tab-pane>
      <!--      获取所有配置菜单-->
      <template v-for="(item,index) in tabs">
        <el-tab-pane
          v-if="'show' === mode && item.status && checkAuth('index') && checkPermission('system_config/index') && checkPermission('system_config/save')"
          :label="item.name"
          :key="index"
          :lazy="true"
        >
          <span slot="label"><i :class="item.icon" v-if="item.icon"></i> {{ item.name }}</span>
          <template v-if="item.children && item.children.length">
            <el-tabs
              v-model="configSubActive[item.key]"
              :tabPosition="isMobile ? 'top' : 'left'"
            >
              <template v-for="(child,idx) in item.children">
                <el-tab-pane
                  v-if="child.status"
                  :label="child.name"
                  :key="idx"
                  :lazy="true"
                >
                  <span slot="label"><i :class="child.icon" v-if="child.icon"></i> {{ child.name }}</span>
                  <system-config-form
                    :columns="child.config"
                    :detail="listLabel.config.option"
                    :id="child.id"
                    :config="child"
                    @flush="onTapHeadBtnFlush"
                  ></system-config-form>
                </el-tab-pane>
              </template>
            </el-tabs>
          </template>
          <template v-else>
            <system-config-form
              :columns="item.config"
              :detail="listLabel.config.option"
              :id="item.id"
              :config="item"
              @flush="onTapHeadBtnFlush"
            ></system-config-form>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>

  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'
import systemConfigForm from '@/views/system_config_tab/components/systemConfigForm'
import { deepClone } from '@/utils'

export default {
  data() {
    return {
      configActive: '0',
      configSubActive: {},
      configSubActiveOld: {},
      isSetActive: false,
      tabs: [],
      rowBtn: [
        {
          name: '添加下级分类', key: 'children', mode: ['show'], auth: this.getFullAuth('save'), show: this.optional
        }
      ],
      columns: [
        { name: '名称', field: 'name', width: 200 },
        { name: '键名', field: 'key', width: 200 },
        { name: '图标', field: 'icon', width: 150, type: 'icon' },
        { name: '排序', field: 'sort', width: 100 },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        { name: '添加时间', field: 'create_time', width: 150 }
      ]
    }
  },
  components: {
    systemConfigForm
  },
  mixins: [
    tableMixin
  ],
  computed: {
    currentKey() {
      return this.$route.query.key || ''
    }
  },
  props: {
    pagination: {
      type: Boolean,
      default: false
    }
  },
  filters: {},
  watch: {
    list: {
      // immediate: true,
      handler(value) {
        if (value.length) {
          this.setTabs()

          if (this.currentKey && !this.isSetActive) {
            this.isSetActive = true
            this.setActiveTab()
          }
        }
      }
    },
    currentKey(value) {
      if (value) {
        this.setActiveTab()
      }
    },
    // 一级配置项的选择
    configActive(value) {
      var n = Number(value)
      if (n > 0) {
        this.redirectUrl(this.tabs[n - 1].key)
      } else {
        this.redirectUrl(null)
      }
    },
    // 二级配置项的选择
    configSubActive: {
      deep: true,
      handler(value) {
        var old = this.configSubActiveOld
        for (let [i, it] of Object.entries(value)) {
          if (old[i] && it !== old[i]) {
            // 获取下级的key
            var key = this.tabs[Number(this.configActive) - 1].children[it].key
            this.redirectUrl(key)
            break
          }
        }
        // 保存成为旧副本
        this.configSubActiveOld = { ...value }
      }
    }
  },
  created() {

  },
  destroyed() {
  },
  methods: {
    /**
     * 深度拷贝一份数据用来遍历生成
     * 添加、刷新操作不会影响到现已生成的
     */
    setTabs() {
      this.tabs = deepClone(this.list)
    },
    // 重定向链接
    redirectUrl(key) {
      if (this.$route.query?.key !== key) {
        var query = {}
        if (key) {
          query.key = key
        }
        this.$router.replace({
          path: '/system_config_tab/index',
          query
        })
      }
    },
    // 设置激活的tab
    setActiveTab() {
      var key = this.currentKey
      var b = false
      for (let [index, item] of this.list.entries()) {
        let n = (index + 1).toString()
        if (item.key === key) {
          this.$nextTick(() => {
            this.configActive = n
          })
          break
        } else {
          for (let [i, it] of item.children.entries()) {
            if (it.key === key) {
              this.$nextTick(() => {
                this.configActive = n
                this.$set(this.configSubActive, item.key, i.toString())
              })
              b = true
              break
            }
          }
          if (b) {
            break
          }
        }
      }
    },
    // 添加配置分类
    onTabPaneAdd() {
      this.onTapHeadBtnSave()
    },

    optional(row, index) {
      // 有上级的就不可选
      return !row.pid
    },

    onTapRowBtnChildren(row, index) {
      let data = {
        detail: {
          pid: row.id,
          parent: row
        }
      }
      this.onTapHeadBtnSave({ data })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
