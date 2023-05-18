<template>
  <el-table :data="tableData" width="100%" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="account" label="职工工号"></el-table-column>
    <el-table-column prop="time" label="打卡时间"></el-table-column>
    <!-- <el-table-column prop="phone" label="电话"></el-table-column> -->
    <!-- <el-table-column prop="age" label="年龄"></el-table-column> -->
    <!-- <el-table-column prop="sex" label="性别"></el-table-column> -->
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
    }
  },
  beforeMount () {
    this.$store.commit('setHeaderTitle',"我的考勤");
    this.getUserAttendanceList()
  },
  methods: {
    // 根据用户名来查询用户的考勤记录
    getUserAttendanceList () {
      let query = {
        account: this.$store.state.userInfo.account
      }
      console.log(query);
      this.$axios.post('/attendance/getAttendanceListByAccount',query)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.tableData = res.data.results
          }
        })
    },
  },
}
</script >

<style></style>