<template>
  <div id="app-header">
    <div class="title strong" :class="`${hasBorder?'border':''}`">
      <go-back :icon="icon"></go-back>
      <div>{{$route.meta.title}}</div>
    </div>
  </div>
</template>

<script>
  import Back from "../../components/Back/Back";
  export default {
    name:"Header",
    data(){
      return{
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
        if(['my_order'].indexOf(this.$route.name)!==-1){
          this.icon='';
          this.hasBorder=false;
        }else if(['login','logout','404'].indexOf(this.$route.name)!==-1){
          this.icon='close';
          this.hasBorder=true;
        }else if((['purchase'].some((val)=>this.$route.path.includes(val)))){
          this.icon='back';
          this.hasBorder=true;
        }else{         
          this.icon='back';
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
  width   100%
  height  80px 
  position fixed
  top 0
  z-index  1000
  
  .title  
    width  100% 
    line-height  80px 
    height  80px 
    text-align  center 
    white-space  nowrap 
    color  #000 
    background-color #F7F7F7
  .strong
    font-size 30px 
    font-weight 600
  .border 
    // border-bottom  1px solid rgba(120, 120, 120,0.12) 
    box-shadow   0 1px 1px rgba(88, 88, 88, 0.15)
</style>