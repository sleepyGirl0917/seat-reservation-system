<template>
  <div id="app">
    <router-view/>
    <tab-bar v-if="$route.meta.showTabbar"/>
  </div>
</template>

<script>
  import Tabbar from './components/Tabbar/Tabbar'
  export default {
    name:'App',
    components:{"tab-bar":Tabbar}
  }
</script>

<style scoped>
  #app {
    width:100%;
    height:100%;
  }
</style>