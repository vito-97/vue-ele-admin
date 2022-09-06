<template>
  <div>
    <custom-form
      :columns="columns"
      :id="id"
      :list="list"
      :rules="rules"
      :dialog="false"
      :error="error"
      :hide-button="true"
      v-model="formData"
      v-bind="$attrs"
      v-on="$listeners"
      @event="onEvent"
    >
      <template v-slot:start-before>
        <el-divider>设备测试</el-divider>
      </template>
      <template v-slot:finish_timeout-after="{col,formData}">
        <el-button type="primary" @click="onSetting(col,formData)" class="set-btn">设置</el-button>
      </template>
      <template v-slot:temperature-after="{col,formData}">
        <el-button type="primary" @click="onSetting(col,formData)" class="set-btn">设置</el-button>
      </template>
      <template v-slot:l_to_pulse-after="{col,formData}">
        <el-button type="primary" @click="onSetting(col,formData)" class="set-btn">设置</el-button>
      </template>
      <template v-slot:adverts_light-after="{col,formData}">
        <el-button type="primary" @click="onSetting(col,formData,'status')" class="set-btn">设置</el-button>
      </template>
    </custom-form>
  </div>

</template>

<script>
import customFromMixin from '@/utils/mixin/custom-form'
import { showLoading, hideLoading } from '@/utils'
import curd from '@/api/curd'

const API = curd('device_control_test')

export default {
  name: 'AddForm',
  mixins: [customFromMixin],
  data() {
    return {
      formData: {},
      rules: {},
      // 列配置
      columns: [
        {
          name: '设备',
          field: 'imei',
          auth: 'device/index',
          opts: {
            required: false,
            control: 'device',
            name: 'name',
            pk: 'imei'
          },
          type: 'select_table',
          visible: this.checkAuth
        },
        { name: 'IMEI', field: 'imei', opts: {}, placeholder: '请输入设备IMEI' },
        {
          name: '暂停自动结算时间',
          field: 'finish_timeout',
          api: 'finishTimeout',
          opts: {},
          value: 240,
          type: 'number',
          visible: this.checkAuth
        },
        {
          name: '防冻温度',
          field: 'temperature',
          opts: {},
          value: 0,
          type: 'number',
          visible: this.checkAuth
        },
        {
          name: '脉冲参数',
          field: 'l_to_pulse',
          opts: {},
          api: 'pulse',
          value: 0,
          type: 'number',
          visible: this.checkAuth
        },
        {
          name: '广告灯',
          field: 'adverts_light',
          api: 'advertsLight',
          opts: {},
          value: 0,
          type: 'switch',
          visible: this.checkAuth
        },
        {
          name: '设置二维码',
          field: 'qrcode',
          opts: { style: { width: '100%' }, label: false },
          value: 0,
          type: 'button',
          visible: this.checkAuth
        },
        {
          name: '设置机器码',
          field: 'deviceNo',
          opts: { style: { width: '100%' }, label: false },
          value: 0,
          type: 'button',
          visible: this.checkAuth
        },
        {
          name: '启动设备',
          field: 'start',
          opts: { style: { width: '100%' }, label: false },
          value: 0,
          type: 'button',
          visible: this.checkAuth
        },
        {
          name: '暂停设备',
          field: 'pause',
          opts: { type: 'warning', style: { width: '100%' }, label: false },
          value: 0,
          type: 'button',
          visible: this.checkAuth
        },
        {
          name: '停止设备',
          field: 'finish',
          opts: { type: 'danger', style: { width: '100%' }, label: false },
          value: 0,
          type: 'button',
          visible: this.checkAuth
        },
        {
          name: '初始化余额',
          field: 'clear',
          opts: { plain: true, style: { width: '100%' }, label: false },
          value: 0,
          type: 'button',
          visible: this.checkAuth
        }
      ]
    }
  },
  watch: {
    'detail.device'(val) {
      setTimeout(() => {
        this.formData = { ...this.formData, ...val }
      }, 20)
    }
  },
  computed: {
    imei() {
      return this.formData.imei || this.detail.device?.imei
    }
  },
  methods: {
    onEventListener(e) {
      if (['qrcode', 'deviceNo', 'start', 'pause', 'finish', 'clear'].includes(e.field)) {
        return this.request(e.field)
      }
    },
    // 点击了设置按钮
    onSetting(col, formData, key = 'num') {
      const val = formData[col.field] || 0

      if (val < 0) {
        this.$message({
          message: '数值不能小于0',
          type: 'error'
        })

        return
      }

      return this.request(col.api || col.field, { [key]: val })
    },
    // 是否已选择设备
    isChooseDevice() {
      return new Promise((resolve, reject) => {
        if (this.imei) {
          resolve()
        } else {
          this.$message({
            message: '未选择设备或未设置IMEI',
            type: 'error'
          })
          reject({ msg: '未选择设备' })
        }
      })
    },
    // 检测权限
    checkAuth(formData, detail, col) {
      if (col.auth) {
        return this.checkPermission(col.auth)
      }

      let method = (col.api || col.field)
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()

      return this.checkPermission(`device_control_test/${method}`)
    },
    // 请求接口
    request(uri, data = {}) {
      this.isChooseDevice().then(() => {
        // 设置相关信息
        showLoading('设置中...')
        API.post(uri, { imei: this.imei, ...data }).then(res => {
          hideLoading()
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        }, (err) => {
          console.log(err)
          hideLoading()
        })
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.set-btn {
  margin-left: 15px;
}
</style>
