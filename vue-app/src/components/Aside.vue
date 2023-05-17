<template>
    <el-menu style="height: 100vh" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        default-active="/account" :collapse="isCollapse" :collapse-transition="false" router>
        <el-menu-item index="/attendance">
            <i class="el-icon-s-flag"></i>
            <span slot="title">考勤管理</span>
        </el-menu-item>
        <el-menu-item index="/user">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="/account">
            <i class="el-icon-s-home"></i>
            <span slot="title">账号管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    computed: {
        isCollapse () {
            return this.$store.state.isCollapse
        }
    }
}
</script>

<style></style>