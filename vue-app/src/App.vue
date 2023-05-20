<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  created () {
    if (localStorage.getItem('wmstoken')) {
      const decode = jwt_decode(localStorage.wmstoken)
      const userinfo = {
        no: decode.no,
        name: decode.name,
        token: decode.token
      }
      this.$store.commit('setUser',userinfo)
    }

    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(localStorage.getItem('store'))));
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload',() => {
      localStorage.setItem('store',JSON.stringify(this.$store.state));
    });
  }

}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;

}
</style>
