<template>
    <el-menu style="height: 100vh" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        default-active="/myAttendance" :collapse="isCollapse" :collapse-transition="false" router>
        <el-menu-item v-for="item in menuList" :index="item.index">
            <i :class="item.iconClass"></i>
            <span slot="title">{{ item.title }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data () {
        return {
            menuList: [
                {
                    index: '/myAttendance',
                    iconClass: 'el-icon-s-flag',
                    title: '我的考勤'
                },
                {
                    index: '/attendance',
                    iconClass: 'el-icon-s-flag',
                    title: '考勤管理'
                },
                {
                    index: '/account',
                    iconClass: 'el-icon-s-menu',
                    title: '账号管理'
                },
                {
                    index: '/user',
                    iconClass: 'el-icon-s-opportunity',
                    title: '导航二'
                },
            ]
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