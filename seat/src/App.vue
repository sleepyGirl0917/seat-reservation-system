<template>
  <div id="app">
    <my-header></my-header>
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
  *{
    margin:0;
    padding:0;
  }
  #app {
    min-height: 100vh;
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
</style>