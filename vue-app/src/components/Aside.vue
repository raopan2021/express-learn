<template>
    <el-menu style="height: 100vh" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false" router @select="select">
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
                    iconClass: 'el-icon-position',
                    title: '我的考勤'
                },
                {
                    index: '/attendanceManagement',
                    iconClass: 'el-icon-place',
                    title: '考勤管理'
                },
                {
                    index: '/myEvection',
                    iconClass: 'el-icon-suitcase',
                    title: '我的出差'
                },
                {
                    index: '/myOvertime',
                    iconClass: 'el-icon-s-flag',
                    title: '我的加班'
                },
                {
                    index: '/account',
                    iconClass: 'el-icon-user',
                    title: '账号管理'
                },
                // {
                //     index: '/user',
                //     iconClass: 'el-icon-s-opportunity',
                //     title: '导航二'
                // },
            ],
            activeMenu: '/myAttendance'
        }
    },
    computed: {
        isCollapse () {
            return this.$store.state.isCollapse
        }
    },
    beforeMount () {
        let active = localStorage.getItem('activeMenu');
        console.log(active);
        if (active) {
            this.activeMenu = active
        }
    },
    methods: {
        select (e) {
            this.activeMenu = e;
            localStorage.setItem('activeMenu',e)
        }
    },
}
</script>

<style></style>