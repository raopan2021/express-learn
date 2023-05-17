<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="margin-top: 8px">
            <i :class="iconDirection" @click="handleCollapse" style="font-size:24px;cursor: pointer;"></i>
            <!-- <el-button @click="handleCollapse" plain :icon="iconDirection" type="text" style="font-size:24px"></el-button> -->
        </div>
        <h1 class="middle" style="font-size: 24px">{{ headerTitle }}</h1>
        <div class="right">
            <el-dropdown trigger="click">
                <span>{{ user.name }}</span>
                <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toUser">个人资料</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    date () {
        return {
            // title: ''
        }
    },
    methods: {
        toUser () {
            // this.$message.success('user')
            this.$router.push('/userinfo')
        },
        logout () {
            localStorage.removeItem('wmstoken')
            this.$store.commit('clearUser')
            this.$router.push('/login')
            // this.$message.success('logout')
        },
        handleCollapse () {
            this.$store.commit('collapseMenu')
        }
    },
    computed: {
        iconDirection () {
            return this.$store.state.iconDirection
        },
        user () {
            return this.$store.state.userInfo
        },
        headerTitle () {
            return this.$store.state.headerTitle
        },
    },
}
</script>

<style></style>