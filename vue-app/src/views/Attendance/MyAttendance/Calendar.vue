<template>
  <el-calendar v-if="userAttendanceList != []" :first-day-of-week="7" v-model="value">
    <template slot="dateCell" slot-scope="{date, data}">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : '' }}
      </p>
      <el-tag v-for="item in formatedate(data)">{{ item }}</el-tag>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
      userAttendanceList: [],
    }
  },
  beforeMount () {
    // this.getUserAttendanceList()
  },
  watch: {
    value: {
      handler () {
        var year = this.value.getFullYear();
        var month = this.value.getMonth() + 1;
        this.getUserAttendanceList(year,month)   //  调用接口，把拼接好的参数传到后台
      },
      // 首次加载执行
      immediate: true,
    },
  },
  methods: {
    // 查询用户月度考勤记录
    getUserAttendanceList (year,month) {
      let query = {
        account: this.$store.state.userInfo.account,
        year: year,
        month: month
      }
      this.$axios.post('/attendance/getUserAttendanceByYearMonth',query)
        .then(res => {
          if (res.data.status === 200) {
            this.userAttendanceList = res.data.results
            for (let i = 0; i < this.userAttendanceList.length; i++) {
              const item = this.userAttendanceList[i];
              const dateTimeArr = item.time.split(' ')
              item.date = dateTimeArr[0]
              item.time = dateTimeArr[1]
            }
            console.log(this.userAttendanceList);
          }
        })
    },

    // 日历格式化
    formatedate (data) {
      let resArr = [];
      for (let i = 0; i < this.userAttendanceList.length; i++) {
        const item = this.userAttendanceList[i];
        if (item.date == data.day) {
          resArr.push(item.time);
        }
      }
      return resArr
    },
  },
}
</script>

<style scoped lang="scss">
:deep(.el-tag) {
  margin: 2px;
}
</style>