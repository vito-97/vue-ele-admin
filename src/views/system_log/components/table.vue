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
        width="200">
      </el-table-column>
      <el-table-column
        prop="route"
        label="路由"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
        width="120">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方式"
        width="120">
      </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="用户"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
  mounted() {
    var data = []

    for (let i = 1; i <= 10; i++) {
      // const status = i % 2
      data.push({
        id: i,
        title: '添加管理员',
        user: {
          nickname: '管理员' + i
        },
        ip: '127.0.0.' + i,
        route: '/admin/v1/admin/add',
        create_time: '2022-03-24 12:00',
        method: 'post'
      })
    }

    console.log(data)

    this.tableData = data
  },
  filters: {
    statusType(value) {
      const t = ['danger', 'primary']

      return t[value]
    },
    statusDesc(value) {
      const t = ['待支付', '已支付']

      return t[value]
    }
  },
  methods: {

    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
