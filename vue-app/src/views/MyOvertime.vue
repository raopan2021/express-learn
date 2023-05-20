<template>
  <div>
    <el-table :data="tableData" width="100%" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="account" label="职工工号"></el-table-column>
      <el-table-column prop="createtime" label="加班提交时间"></el-table-column>
      <el-table-column prop="planstarttime" label="计划加班开始时间"></el-table-column>
      <el-table-column prop="planendtime" label="计划加班结束时间"></el-table-column>
      <el-table-column prop="endtime" label="加班结束时间"></el-table-column>
      <el-table-column prop="hour" label="实际加班时长（小时）"></el-table-column>
      <!-- <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column> -->
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
    this.$store.commit('setHeaderTitle',"我的加班");
    this.getOvertimeList()
  },
  methods: {
    getOvertimeList () {
      let query = {
        account: this.$store.state.userInfo.account,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$axios.post('/overtime/getUserOvertimeList',query)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.tableData = res.data.results;
            this.total = res.data.total;
          }
        })
    },
    handleSizeChange (e) {
      this.pageSize = e;
      this.getUserOvertimeList();
    },
    handleCurrentChange (e) {
      this.currentPage = e;
      this.getUserOvertimeList();
    },
  },
}
</script >

<style></style>