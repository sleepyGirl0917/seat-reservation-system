<template>
  <div id="app-header" v-if="title">
    <mt-header fixed :title="title" ></mt-header>
  </div>
</template>

<script>
  export default {
    name:"Header",
    data(){
      return{
        title:""
      }
    },
    methods:{
      getRoute(){
        // console.log(this.$route);
        if(this.$route.path.includes('/home')){
          this.title="自习室";
        }else if(this.$route.path.includes('/order')){
          this.title="我的预定";
        }else if(this.$route.path.includes('/user')){
          this.title="个人中心";
        }else if(this.$route.path.includes('/login')){
          this.title="登录";
        }else{
          this.title="";
        }
      }
    },
    watch:{
      '$route'(){
        this.getRoute()
      }
    },
    created(){
      this.getRoute()
    }
  }
</script>

<style>
#app-header{
  width:100%;
  height: 40px;
}
.mint-header{
  background-color:rgba(230, 230, 230) !important;
}
.mint-header .mint-header-title{
  color:#222;
  font-weight: 600;
  font-size:20px;
}
</style>