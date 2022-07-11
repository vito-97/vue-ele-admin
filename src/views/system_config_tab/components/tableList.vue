<template>
  <div>
    <el-tabs type="card" :addable="checkAuth('edit') && checkAuth('save') && mode === 'page'" @tab-add="onTabPaneAdd">
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
          @tap-head-btn="onTapHeadBtn"
          @tap-row-btn="onTapRowBtn"
          @row-dblclick="onRowDbClick"
          @update-item="onUpdateItem"
          @load="onLoad"
        >
        </custom-table>
      </el-tab-pane>
      <!--      获取所有配置菜单-->
      <template v-for="(item,index) in list">
        <el-tab-pane
          v-if="'show' === mode && item.status && checkAuth('index') && checkPermission('system_config/index') && checkPermission('system_config/save')"
          :label="item.name"
          :key="index"
          :lazy="true"
        >
          <span slot="label"><i :class="item.icon" v-if="item.icon"></i> {{ item.name }}</span>
          <template v-if="item.children && item.children.length">
            <el-tabs tabPosition="left">
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

export default {
  data() {
    return {
      columns: [
        { name: '名称', field: 'name', width: 200 },
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
  computed: {},
  props: {
    pagination: {
      type: Boolean,
      default: false
    }
  },
  filters: {},
  watch: {},
  created() {

  },
  destroyed() {
  },
  methods: {
    // 添加配置分类
    onTabPaneAdd() {
      this.onTapHeadBtnSave()
    },

    optional(row, index) {
      // 有下级的就不可选
      return !row.children.length
    }
  }
}
</script>

<style lang="scss">

</style>
