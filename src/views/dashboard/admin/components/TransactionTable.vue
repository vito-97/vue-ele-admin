<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="ID" min-width="50">
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="标题" min-width="100">
      <template slot-scope="scope">
        {{ scope.row.title }}
      </template>
    </el-table-column>
    <el-table-column label="订单号" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no }}
      </template>
    </el-table-column>
    <el-table-column label="充值流量" min-width="50">
      <template slot-scope="scope">
        {{ scope.row.flow }}L
      </template>
    </el-table-column>
    <el-table-column label="充值金额" min-width="50">
      <template slot-scope="scope">
        ¥{{ scope.row.money }}
      </template>
    </el-table-column>
    <el-table-column label="订单金额" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="付款金额" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.pay_price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status_desc }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  filters: {

  },
  data() {
    return {}
  },
  props: {
    list: {
      type: Array
    }
  },
  created() {
  },
  methods: {}
}
</script>
