<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="order_no"
        label="订单号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="price"
        label="订单金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pay_price"
        label="实际支付金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="refund_price"
        label="退款金额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="product.name"
        label="套餐"
        width="120">
      </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="用户"
        width="120">
      </el-table-column>
      <el-table-column
        prop="refund_time"
        label="退款时间"
        width="150">
      </el-table-column>
      <el-table-column
        label="状态"
        width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusType" size="small">{{ scope.row.status | statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="mark"
        label="备注"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <template v-if="scope.row.status === 0">
            <el-button type="text" size="small">通过</el-button>
            <el-button type="text" size="small">驳回</el-button>
          </template>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      tableData: []
    }
  },
  filters: {
    statusType(value) {
      const t = ['danger', 'primary', 'warning']

      return t[value]
    },
    statusDesc(value) {
      const t = ['待处理', '已退款', '已拒绝']

      return t[value]
    }
  },
  mounted() {
    var data = []
    for (let i = 1; i <= 10; i++) {
      const status = i % 3
      data.push({
        id: i,
        title: '100元套餐',
        order_no: 'order' + (new Date()).getTime().toString() + i,
        outer_trade_no: 'outer' + (new Date()).getTime().toString() + i,
        channel_trade_no: 'pay' + (new Date()).getTime().toString() + i,
        status: status,
        refund_time: status === 1 ? '2022-03-24 12:00' : '',
        price: 100,
        pay_price: 100,
        user: {
          nickname: '小明'
        },
        refund_price: 12,
        product: {
          name: '100元套餐'
        }
      })
    }

    this.tableData = data
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
