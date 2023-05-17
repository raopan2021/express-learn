<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  created() {
    if (localStorage.getItem('wmstoken')) {
      const decode = jwt_decode(localStorage.wmstoken)
      const userinfo = {
        no: decode.no,
        name: decode.name,
        token: decode.token
      }
      this.$store.commit('setUser', userinfo)
    }
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
