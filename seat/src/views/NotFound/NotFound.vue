<template>
  <div id="app-error">
    <div class="error-box">
      <span>sorry,there is nothing in the page~</span>
      <span>{{seconds}}秒后自动返回</span>
    </div>
    <div class="btn-box">
      <button @click.prevent="stop">点击留在本页</button>
      <button @click.prevent="start">点击继续倒计时</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Error",
  data() {
    return {
      icon: "close",
      seconds:5,
      timer:null
    }
  },
  mounted(){
    this.start();
  },
  methods:{
    start(){
      this.timer=setInterval(()=>{
        this.seconds--;
        if(this.seconds==0){
          clearInterval(this.timer);
          this.$router.go(-1)
        }
      },1000) 
    },
    stop(){
      clearInterval(this.timer);
    }
  }
};
</script>
<style lang="stylus" scoped>
#app-error 
  width 100%
  height 100%
  padding-top 80px
  overflow hidden
  .error-box 
    font-size  28px 
    font-weight  700 
    text-align  center 
    height  300px 
    line-height  50px 
    display flex
    align-items center
    justify-content center
    flex-direction column
  .btn-box
    display flex
    align-items center
    button 
      flex 1
      margin 10px
      line-height  50px
      border-radius 5Px
</style>