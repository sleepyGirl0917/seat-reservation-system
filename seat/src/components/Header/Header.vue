<template>
  <div id="app-header" v-if="title">
    <go-back :icon="icon"></go-back>
    <h1 class="title" :class="`${$route.path=='/home'?'normal':'strong fixed'}`">{{title}}</h1>
  </div>
</template>

<script>
  import Back from "../../components/Back/Back";
  export default {
    name:"Header",
    data(){
      return{
        title:"",
        icon:""
      }
    },
    components: {
      "go-back": Back
    },
    methods:{
      getRoute(){
        console.log(this.$route);
        if(this.$route.path=='/home'){
          this.title="众独空间";
          this.icon="";
        }else if(this.$route.path=='/order'){
          this.title="我的预定";
          this.icon="";
        }else if(this.$route.path.includes('/OrderDetails')){
          this.title="预定详情";
          this.icon="back";
        }else if(this.$route.path=='/login'){
          this.title="登录";
          this.icon="";
        }else{
          this.title="";
          this.icon="";
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

<style lang="stylus">
#app-header
  width 100%
  height  60px 
  .title  
    width  100% 
    line-height  60px 
    height  60px 
    display  block 
    margin  0 
    padding  0 
    text-align  center 
    white-space  nowrap 
    color  #000 
    background-color rgb(239,239,244)
  .normal
    font-size 18px
    font-weight 500
  .strong
    font-size 22px
    font-weight 700
  .fixed
    position fixed
    z-index  1000
</style>