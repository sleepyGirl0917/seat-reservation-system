<template>
  <div id="app-header" v-if="title">
    <div class="title" :class="`${$route.path=='/home'?'normal':'strong fixed'} ${hasBorder?'border':''}`">
      <go-back :icon="icon"></go-back>
      <div>{{title}}</div>
    </div>
  </div>
</template>

<script>
  import Back from "../../components/Back/Back";
  export default {
    name:"Header",
    data(){
      return{
        title:"",
        icon:"",
        hasBorder:false
      }
    },
    components: {
      "go-back": Back
    },
    methods:{
      getRoute(){
        // console.log(this.$route);
        if(this.$route.name=='404'){
          this.title=this.$route.meta.title;
          this.icon="close";
          this.hasBorder=false;
        }else if(this.$route.path=='/home'){
          this.title="众独空间";
          this.icon="";
          this.hasBorder=false;
        }else if(this.$route.path=='/order'){
          this.title="我的预定";
          this.icon="";
          this.hasBorder=false;
        }else if(this.$route.path.includes('/OrderDetails')){
          this.title="预定详情";
          this.icon="back";
          this.hasBorder=false;
        }else if(this.$route.path.includes('/purchase')){
          this.title=this.$route.meta.title;
          this.icon="back";
          this.hasBorder=true;
        }else if(this.$route.path=='/login'){
          this.title="登录";
          this.icon="close";
          this.hasBorder=true;
        }else if(this.$route.path=='/logout'){
          this.title="退出登录";
          this.icon="close";
          this.hasBorder=true;
        }else{
          this.title="";
          this.icon="";
          this.hasBorder=false;
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
  .border 
    // border-bottom  1px solid rgba(120, 120, 120,0.12) 
    box-shadow   0 1px 1px rgba(88, 88, 88, 0.15)
</style>