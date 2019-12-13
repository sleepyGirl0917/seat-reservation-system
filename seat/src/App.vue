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
    }
  }
</script>

<style lang="stylus">
// reset
* 
  outline 0
  padding 0
  margin  0
  border  0

body
  background rgb(239,239,244)  
  
#app  
  width 100% 

  button 
    background #222 
    color #fff 
  img   
    content normal !important  
  a 
    text-decoration  none 
    color #000 !important 
  .float-left 
    float left 
  .navigate-right:after  
    font-family  Muiicons 
    content  "\e583" 
    position  absolute 
    font-size  28px 
    right  15px 
    top  50% 
    -webkit-transform  translateY(-50%) 
    transform  translateY(-50%) 
    color  #222 
    -webkit-font-smoothing  antialiased 
  .font_orange
    color #cc921c
  .ignore
    border-radius 5px  
</style>