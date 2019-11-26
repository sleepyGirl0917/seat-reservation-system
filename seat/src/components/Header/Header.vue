<template>
  <mt-header fixed :title="title" v-if="title"></mt-header>
</template>

<script>
  export default {
    name:"Header",
    data(){
      return{
        title:"自习室"
      }
    },
    watch:{
      '$route.path'(to,from){
        if(to==='/home'){
          this.title="自习室";
        }else if(to==='/order'){
          this.title="我的预定";
        }else if(to==='/user'){
          this.title="个人中心";
        }else{
          this.title="";
        }
      }
    }
  }
</script>

<style>
.mint-header{
  background-color:rgba(230, 230, 230) !important;
}
.mint-header .mint-header-title{
  color:#222;
  font-weight: 600;
  font-size:20px;
}
</style>