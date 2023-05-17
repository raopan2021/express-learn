<template>
  <el-table :data="tableData" width="100%" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="userId" label="用户名"></el-table-column>
    <el-table-column prop="time" label="打卡时间"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getAttendanceList () {
      this.$axios.get('/attendance/attendanceList')
        .then(res => {
          if (res.data.status === 200) {
            console.log(res);
            this.tableData = res.data.results
          }
        })
    },
  },
  beforeMount () {
    this.$store.commit('setHeaderTitle',"考勤管理");
    this.getAttendanceList()
  },
}
</script >

<style></style>