<template>
  <div>
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
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
      @update-item="onUpdateItem"
      @load="onLoad"
    >
      <template v-slot:position="{row}">
        <div v-if="row.lng && row.lat">{{ row.lng }},{{ row.lat }}</div>
      </template>
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'

export default {
  data() {
    return {
      columns: [
        { name: '名称', field: 'name', width: 150 },
        { name: 'IMEI', field: 'imei', width: 150 },
        { name: '设备号', field: 'device_no' },
        {
          name: '入口二维码',
          field: 'qrcode_url',
          type: 'qrcode',
          width: 100,
          show_overflow_tooltip: false,
          opts: { size: 80 }
        },
        { name: '脉冲', field: 'l_to_pulse' },
        { name: '温度', field: 'temperature', after: '度' },
        { name: '运营商', field: 'agent.nickname' },
        // { name: '全局套餐', field: 'used_global_product', type: 'switch' },
        // { name: '报障电话', field: 'phone', },
        { name: '已加注流量', field: 'used_flow', after: 'L', width: 150 },
        {
          name: '广告灯',
          field: 'adverts_light',
          label: true,
          type: this.checkAuth('change') ? 'switch' : 'tag',
          opts: {}
        },
        { name: '状态', field: 'status', label: true, type: this.checkAuth('change') ? 'switch' : 'tag', opts: {} },
        { name: '使用状态', field: 'state', label: true, type: 'tag', opts: {}, width: 90 },
        { name: '坐标', field: 'position', width: 150 },
        { name: '地址', field: 'address', width: 150 },
        { name: '备注', field: 'mark', type: 'content' },
        { name: '添加时间', field: 'create_time', width: 150 }
      ],
      timer: ''
    }
  },
  components: {},
  mixins: [
    tableMixin
  ],
  computed: {},
  props: {},
  filters: {},
  watch: {
    ids: {
      immediate: true,
      handler(val) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        console.log('change')
        this.listenState()
      }
    }
  },
  created() {

  },
  destroyed() {
    // 清除定时器
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    listenState() {
      if (this.ids.length) {
        this.curd.get('state', { id: this.ids.join(',') }).then(res => {
          const data = res.data
          if (data.length) {
            const obj = {}
            data.forEach(it => {
              const id = it.id
              delete it.id
              obj[id] = it
            })

            const list = this.list

            list.forEach((it, i) => {
              const id = it.id
              if (obj[id]) {
                const item = obj[id]
                for (const [key, value] of Object.entries(item)) {
                  if (key !== 'id') {
                    this.$set(this.list[i], key, value)
                  }
                }
              }
            })

            // console.log(list)
          }

          this.timer = setTimeout(this.listenState, 2000)
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
