<template>
  <div id="app" v-cloak>
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
    created() {
      // js代码中使用环境变量
      console.log("NODE_ENV: ", process.env.NODE_ENV);
    }
  }
</script>

<style lang="stylus">
* 
  margin 0 
  padding 0 
#app  
  width 100% 
  min-height  100vh 
  button 
    background #222 
    color #fff 
  .mint-header 
      height 50px 
  img   
    content normal !important  
  a 
    text-decoration  none 
    color #000 !important 
  .float-left 
    float left 
</style>