<template>
<div class="header-container">
  <div class="header">
    <div class="logocontainer">
      <router-link to="/">
        <Logo />
      </router-link>
    </div>
    <div>
      <router-link :to="{name: 'Games'}">Games</router-link>
    </div>
    <div>
      <router-link :to="{name: 'Dictionaries'}">Dictionaries</router-link>
    </div>
  </div>
  <hr />
</div>

</template>

<script>
  import Logo from '@/components/Logo'

  export default {
    name: 'Header',
    components: {
      Logo,
    }
  }
</script>

<style lang="scss" scoped>

  hr {
    width: 70%;
    height: 1px;
    border-bottom: 1px solid;
    margin-left: auto;
    margin-right: auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 32px;
    font-size: 24pt;
    line-height: 60px;
    font-weight: 400;
    color: var(--header-link-color);
    .logocontainer {
      width: 200px;
    }
    a {
      &:hover {
        text-shadow: 0 0 20px var(--lingo-8);
      }
    }
  }
  .header-container {
    margin-bottom: 32px;
  }
</style>
