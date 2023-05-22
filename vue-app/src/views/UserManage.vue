<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="title">
            <span>今日考勤</span>
          </div>
          <div class="content">上班打卡
            <p>{{ punchInTime }}</p>
          </div>
          <div class="content">下班打卡
            <p>{{ punchOutTime }}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userTodayAttendance: [],
      punchInTime: '',
      punchOutTime: '',
    }
  },
  beforeMount () {
    this.$store.commit('setHeaderTitle',"我的首页")
    this.getUserTodayAttendance(); // 获取用户今天的打卡记录
  },
  methods: {
    // 获取用户今天的打卡记录
    getUserTodayAttendance () {
      let query = {
        account: this.$store.state.userInfo.account,
      }
      this.$axios.post('/attendance/getUserTodayAttendance',query)
        .then(res => {
          if (res.data.status === 200) {
            res.data.results.forEach(item => {
              this.userTodayAttendance.push(item.time.split(" ")[1])
            });
            if (this.userTodayAttendance.length == 1) {
              const firstTime = this.userTodayAttendance[0].split(":")[0]
              if (firstTime < 12) {
                this.punchInTime = this.userTodayAttendance[0]
              } else {
                this.punchOutTime = this.userTodayAttendance[0]
              }
            }
            if (this.userTodayAttendance.length >= 2) {
              this.punchInTime = this.userTodayAttendance[0]
              this.punchOutTime = this.userTodayAttendance[this.userTodayAttendance.length - 1]
            }
            console.log(this.userTodayAttendance);
          }
        })
    },
  },
}
</script>

<style scoped lang="scss">
.grid-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  min-height: 360px;
  padding: 20px;

  .title {
    flex: 1;
    color: rgba(0, 126, 165, 0.686);

    span {
      font-size: 24px;
    }
  }

  .content {
    flex: 1;
    font-size: 20px;
    color: rgba(0, 126, 165, 0.686);

    p {
      text-align: right;
      color: #0764cf;
    }
  }
}

.bg-purple {
  background: #d3dce6;
}
</style>