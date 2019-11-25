<template>
  <div id="app">
    <my-header v-if="$route.meta.showHeader"></my-header>
    <router-view/>
    <tab-bar v-if="$route.meta.showTabbar"/>
  </div>
</template>

<script>
  import Header from './components/Header/Header'
  import Tabbar from './components/Tabbar/Tabbar'
  export default {
    name:'App',
    components:{
      "tab-bar":Tabbar,
      "my-header":Header
    },
  }
</script>

<style>
  #app {
    padding-top:40px;
    padding-bottom:80px;
    overflow-x:hidden;
  }
  img { 
    content:normal !important; 
  }
  a{
    text-decoration: none;
    color:#000 !important;
  }
  .float-left{
    float:left;
  }
  header{
    height:40px;
  }
</style>