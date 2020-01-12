<template>
  <div id="app">
    <my-header v-if="$route.meta.showHeader"></my-header>
    <keep-alive :include="cacheComponent">
      <router-view/>
    </keep-alive>
    <!-- <router-view/> -->
    <tab-bar v-if="$route.meta.showTabbar"/>
    
  </div>
</template>

<script>
  import Header from './components/Header/Header'
  import Tabbar from './components/Tabbar/Tabbar'
  export default {
    name:'App',
    data(){
      return {
        cacheComponent:['InviteNew','Contact']
      }
    },
    components:{
      "tab-bar":Tabbar,
      "my-header":Header
    }
  }
</script>

<style lang="stylus">
#app
  width 100%
  min-height 100vh
  overflow-x hidden
</style>