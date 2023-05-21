<template>
  <div>
    <div class="search" style="margin-bottom: 5px">
      <el-input placeholder="请输入姓名" style="width: 200px" suffix-icon="el-icon-search" v-model="searchUserName"
        @keyup.enter.native="handleSearch" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" size="small" @click="handleSearch">搜索</el-button>
      <el-button type="success" style="margin-left: 5px" size="small" @click="handleReset">重置</el-button>
    </div>
    <el-table :data="tableData" width="100%" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="account" label="职工工号"></el-table-column>
      <el-table-column prop="createtime" label="出差提交时间"></el-table-column>
      <el-table-column prop="planstarttime" label="计划出差开始时间"></el-table-column>
      <el-table-column prop="planendtime" label="计划出差结束时间"></el-table-column>
      <el-table-column prop="planstarttime" label="出差开始时间"></el-table-column>
      <el-table-column prop="endtime" label="出差结束时间"></el-table-column>
      <el-table-column prop="day" label="实际出差天数"></el-table-column>
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
      searchUserName: '',
      tableData: [],
      total: 0, // 总数
      pageSize: 10, // 每页几条数据
      currentPage: 1, // 当前是第几页
    }
  },
  beforeMount () {
    this.$store.commit('setHeaderTitle',"出差管理");
    this.getEvectionList()
  },
  methods: {
    getEvectionList () {
      let query = {
        searchUserName: this.searchUserName,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$axios.post('/evection/getUserEvectionList',query)
        .then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.results;
            this.total = res.data.total;
          }
        })
    },
    handleSizeChange (e) {
      this.pageSize = e;
      this.getEvectionList();
    },
    handleCurrentChange (e) {
      this.currentPage = e;
      this.getEvectionList();
    },
    // 搜索
    handleSearch () {
      this.getEvectionList()
    },
    // 重置按钮
    handleReset () {
      this.searchUserName = ''
      this.getEvectionList()
    },
  },
}
</script >

<style></style>