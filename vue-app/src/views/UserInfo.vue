<template>
  <div>
    <h1>欢迎您， {{ user }}!</h1>
  </div>
</template>

<script>
export default {

  computed: {

    user () {
      return this.$store.state.userInfo
    }
  }

}
</script>

<style></style>