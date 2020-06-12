<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
  import Logo from '@/components/Logo'
  import Header from '@/components/Header'
  export default {
    components: { Header, Logo }
  }
</script>

<style lang="scss">
  @import "src/assets/styles/main";
  #app {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
