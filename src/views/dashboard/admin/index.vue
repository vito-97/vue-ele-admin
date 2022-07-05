<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" :detail="detail"/>

    <el-row style="background:#fff;margin-bottom:32px;" :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="sumOrderMoneyWeek" :x-name="sumOrderMoneyWeekXName" name="近7天销售额"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="countOrderWeek" :x-name="countOrderWeekXName" name="近7天订单数" color="#3888fa"/>
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;margin-bottom:32px;" :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="sumOrderMoneyMonth" :x-name="sumOrderMoneyMonthXName" name="近12个月销售额"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="countOrderMonth" :x-name="countOrderMonthXName" name="近12个月订单数" color="#3888fa"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
:xs="{span: 24}"
:sm="{span: 24}"
:md="{span: 24}"
:lg="{span: 24}"
:xl="{span: 24}"
              style="padding-right:8px;margin-bottom:30px;">
        <transaction-table :list="detail.order_list"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import { dashboard } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TransactionTable
  },
  data() {
    return {
      detail: {},
      countOrderWeek: [],
      countOrderWeekXName: [],
      sumOrderMoneyWeek: [],
      sumOrderMoneyWeekXName: [],

      countOrderMonth: [],
      countOrderMonthXName: [],
      sumOrderMoneyMonth: [],
      sumOrderMoneyMonthXName: []
    }
  },
  created() {
    this.getDashboard()
  },
  methods: {
    getDashboard() {
      return dashboard().then(res => {
        this.detail = res.data
        this.countOrderWeek = Object.values(res.data.count_order_week_list)
        this.countOrderWeekXName = Object.keys(res.data.count_order_week_list)
        this.sumOrderMoneyWeek = Object.values(res.data.sum_order_money_week_list)
        this.sumOrderMoneyWeekXName = Object.keys(res.data.sum_order_money_week_list)

        this.countOrderMonth = Object.values(res.data.count_order_month_list)
        this.countOrderMonthXName = Object.keys(res.data.count_order_month_list)
        this.sumOrderMoneyMonth = Object.values(res.data.sum_order_money_month_list)
        this.sumOrderMoneyMonthXName = Object.keys(res.data.sum_order_money_month_list)
      })
    },
    handleSetLineChartData(type) {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
