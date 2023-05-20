<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside :width="asideWidth" style="background-color: rgb(238, 241, 246);height: 100vh;margin-left: -1px">
                <Aside></Aside>
            </el-aside>

            <el-container style="height: 100vh;">
                <el-header style="text-align: right; font-size: 12px;border-bottom: rgba(168, 168, 168, 0.3) 1px solid;">
                    <Header></Header>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
export default {
    data () {
        return {

        }
    },
    components: { Aside,Header },
    methods: {

    },
    computed: {
        asideWidth () {
            return this.$store.state.asideWidth
        }
    },

}
</script>

<style scoped>
.el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
}

.el-main {
    padding: 20px;
}

.el-aside {
    color: #333;
}
</style>