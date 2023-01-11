<template>
  <div class="system-config-form-box">
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="mini"
      @click="onSaveConfig"
      class="add-config-btn"
      v-if="showAddBtn"
    >
      添加配置
    </el-button>
    <!--    配置信息-->
    <custom-form
      :columns="columns"
      :detail.sync="detail"
      :rules="rules"
      :dialog="false"
      :error="error"
      :lang-list="langList"
      :lang-status="!!langField.length"
      :lang-field="langField"
      @submit="onSubmitConfig"
    >
    </custom-form>
    <!--    新增配置-->
    <system-config-add-form
      :visible.sync="visible"
      :detail="configDetail"
      :error="configError"
      @submit="onSubmit">
    </system-config-add-form>
  </div>
</template>

<script>
import customForm from '@/views/custom/customForm'
import curd from '@/api/curd'
import { showLoading, hideLoading } from '@/utils'
import systemConfigAddForm from '@/views/system_config/components/addForm'
import { langList } from '@/settings'

const API = curd('system_config')
export default {
  name: 'SystemConfigForm',
  components: { customForm, systemConfigAddForm },
  data() {
    return {
      rules: {},
      error: {},
      configError: {},
      visible: false,
      showAddBtn: process.env.NODE_ENV === 'development'
    }
  },
  props: {
    columns: {
      type: Array
    },
    detail: {
      type: Object
    },
    id: {
      type: Number
    },
    config: {
      type: Object
    },
    langList: {
      type: Object,
      default: () => langList
    }
  },
  computed: {
    configDetail() {
      return {
        system_config_tab_id: this.id,
        system_config_tab: this.config
      }
    },
    langField() {
      var field = []

      this.columns.forEach((item) => {
        if (item.lang) {
          field.push(item.key)
        }
      })

      return field
    }
  },
  methods: {
    // 添加配置项
    onSubmit(data) {
      showLoading('添加中...')
      API.save(data).then(res => {
        this.$emit('flush')
        this.visible = false
        hideLoading()
        this.$message({
          message: res.msg,
          type: 'success'
        })
      }, err => {
        console.log('err', err)
        if (err.code !== 0 && err.data) {
          this.configError = err.data
        }
        hideLoading()
      })
    },
    // 更新配置
    onSubmitConfig(data) {
      showLoading('更新中...')
      API.put('config', data).then(res => {
        hideLoading()
        this.$emit('update:detail', { ...this.detail, ...data })
        this.$message({
          message: res.msg,
          type: 'success'
        })
      }, err => {
        console.log('err', err)
        if (err.code !== 0 && err.data) {
          this.error = err.data
        }
        hideLoading()
      })
    },
    onSaveConfig() {
      this.visible = true
    }
  }
}
</script>

<style scoped lang="scss">
.add-config-btn {
  margin-bottom: 15px;
}
</style>
