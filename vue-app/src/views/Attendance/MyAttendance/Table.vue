<template>
  <div>
    <el-table :data="tableData" width="100%" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="account" label="职工工号"></el-table-column>
      <el-table-column prop="time" label="打卡时间"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      total: 0, // 总数
      pageSize: 10, // 每页几条数据
      currentPage: 1, // 当前是第几页
    }
  },
  beforeMount () {
    this.getUserAttendanceList()
  },
  methods: {
    // 根据用户名来查询用户的考勤记录
    getUserAttendanceList () {
      let query = {
        account: this.$store.state.userInfo.account,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$axios.post('/attendance/getUserAttendanceList',query)
        .then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.results;
            this.total = res.data.total;
          }
        })
    },
    handleSizeChange (e) {
      this.pageSize = e;
      this.getUserAttendanceList();
    },
    handleCurrentChange (e) {
      this.currentPage = e;
      this.getUserAttendanceList();
    },
  },
}
</script >

<style></style>