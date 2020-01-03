<template>
  <div id="app-phone">
    <div class="title">
      <span class="mui-icon mui-icon-arrowthinleft"></span>
    </div>
    <div class="container">
      <div class="top">修改手机号</div>
      <my-phone :btnText=btnText @submit="changePhone(arguments)"></my-phone>
    </div>
  </div>
</template>

<script>
import PhoneCode from "../../components/PhoneCode/PhoneCode";
export default {
  data(){
    return {
      btnText:'确认修改'
    }
  },
  components:{
    "my-phone":PhoneCode
  },
  methods:{
    changePhone(msg){
      console.log(msg)
      let phone=msg[0];
      console.log('修改手机号')
    }
  }
}
</script>

<style lang="stylus" scoped>
#app-phone
  width 100%
  height  100vh

  .title
    position fixed
    top 0
    span.mui-icon.mui-icon-arrowthinleft
      font-size 50px
      font-weight 700

  .container   
    margin 25vh 5vw
    height  50vh
    .top
      font-size 40px
      font-weight 700
      height 100px
      line-height 100px
      margin-bottom 80px
    
</style>

