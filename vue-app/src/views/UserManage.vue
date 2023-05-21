<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="title">
            <span>今日考勤</span>
          </div>
          <div class="content">上班打卡</div>
          <div class="content">下班打卡</div>
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
  }
}

.bg-purple {
  background: #d3dce6;
}
</style>