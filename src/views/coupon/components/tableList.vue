<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      v-bind="$attrs"
      v-on="$listeners"
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
      @update-item="onUpdateItem"
      @load="onLoad"
    >
      <template v-slot:total="{row}">
        <div v-if="row.is_infinite">
          <el-tag type="primary">不限量</el-tag>
        </div>
        <div v-else>{{ row.total }}张</div>
      </template>

      <template v-slot:limit="{row}">
        <div v-if="row.limit===0">
          <el-tag type="primary">不限量</el-tag>
        </div>
        <div v-else>{{ row.limit }}张</div>
      </template>

      <template v-slot:coupon_day="{row}">
        <div v-if="row.coupon_day===0">
          <el-tag type="primary">不限制</el-tag>
        </div>
        <div v-else>{{ row.coupon_day }}天</div>
      </template>

      <template v-slot:get_time="{row}">
        <div v-if="row.get_start_time && row.get_end_time">
          {{row.get_start_time + '~' + row.get_end_time}}
        </div>
      </template>

      <template v-slot:use_time="{row}">
        <div v-if="row.use_start_time && row.use_end_time">
          {{row.use_start_time + '~' + row.use_end_time}}
        </div>
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
        { name: '名称', field: 'name', width: 150, type: 'tag' },
        { name: '优惠金额', field: 'amount', width: 150, type: 'tag', after: '元' },
        { name: '满减金额', field: 'full_minus', before: '￥', type: 'tag', opts: { type: 'danger' } },
        { name: '发放数量', field: 'total' },
        { name: '限制领取', field: 'limit' },
        { name: '已领取量', field: 'issued_total', after: '张' },
        { name: '排序', field: 'sort' },
        { name: '套餐', field: 'product.name' },
        { name: '运营商', field: 'agent.nickname' },
        { name: '领取时间', field: 'get_time' },
        { name: '使用时间', field: 'use_time' },
        { name: '领取有效期', field: 'coupon_day' },
        { name: '状态', field: 'status', label: true, type: 'tag', opts: {} },
        { name: '添加时间', field: 'create_time', width: 150 }
      ]
    }
  },
  components: {},
  mixins: [
    tableMixin
  ],
  computed: {},
  props: {},
  filters: {},
  created() {
  },
  methods: {}
}
</script>

<style lang="scss">

</style>
