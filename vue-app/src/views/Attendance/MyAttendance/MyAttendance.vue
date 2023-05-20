<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="本月考勤" name="firstTab">
      <Calendar v-if="activeName == 'firstTab'"></Calendar>
    </el-tab-pane>
    <el-tab-pane label="考勤历史记录" name="secondTab">
      <Table v-if="activeName == 'secondTab'"></Table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Calendar from './Calendar.vue';
import Table from './Table.vue';
export default {
  data () {
    return {
      activeName: 'firstTab',
    }
  },
  components: {
    Calendar,
    Table
  },
  beforeMount () {
    this.$store.commit('setHeaderTitle',"我的考勤");
  },
}
</script >

<style></style>