<template>
    <div class="header">
        <div>
            <i :class="iconDirection" @click="handleCollapse" style="font-size:24px;cursor: pointer;"></i>
            <!-- <el-button @click="handleCollapse" plain :icon="iconDirection" type="text" style="font-size:24px"></el-button> -->
        </div>
        <h1 style="font-size: 24px">{{ headerTitle }}</h1>
        <!-- <div class="right"> -->
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ user.name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="toUser">个人资料</el-dropdown-item> -->
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- </div> -->
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
            this.$router.push('/userinfo')
        },
        logout () {
            localStorage.removeItem('wmstoken')
            this.$store.commit('clearUser')
            this.$router.push('/login')
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

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
}
</style>