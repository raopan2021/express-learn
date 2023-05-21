<template>
  <el-calendar v-if="userAttendanceList != []" :first-day-of-week="7" v-model="value">
    <template slot="dateCell" slot-scope="{date, data}">
      <span :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(2).join('-') }}
      </span>
      <span v-if="holiday != []" style="color:rgb(41, 158, 125)">{{ formateHoliday(data) }}</span>
      <el-tag v-for=" item  in  formatedate(data) ">{{ item }}</el-tag>
    </template>
  </el-calendar>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
      userAttendanceList: [],
      holiday: [], // 从后台获取月度的节假日信息
    }
  },
  beforeMount () {
    this.getHoliday()
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
            // console.log(this.userAttendanceList);
          }
        })
    },

    // 将每天的打卡时间格式化
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

    // 查询月度的节假日工作日情况
    getHoliday () {
      let month = '202305'
      // console.log(query);
      this.$axios.get(`/other/holiday`)
        .then(res => {
          if (res.data.status === 200) {
            this.holiday = res.data.results
            console.log(this.holiday);
          }
        })
    },

    formateHoliday (data) {
      for (let i = 0; i < this.holiday.length; i++) {
        const item = this.holiday[i];
        if (item.date == data.day) {
          // if (item.type == 0) {
          //   data.type = 0
          //   data.class = 'workDay'
          //   return '工作日'
          // }
          if (item.type == 1) {
            data.type = 1
            data.class = 'weekend'
            return '假日'
          }
          if (item.type == 2) {
            data.type = 2
            data.class = 'holiday'
            return '节假日'
          }
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
:deep(.el-tag) {
  margin: 2px;
}
</style>