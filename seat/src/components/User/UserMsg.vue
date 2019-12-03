<template>
  <div class="middle">
    <!-- 余额和手机号 -->
    <ul class="row user-msg">
      <li>
        <div class="num">{{jsonData?jsonData.balance:'登录后查看'}}</div>
        <div class="text">余额</div>
      </li>
      <li>
        <div class="num">{{jsonData?jsonData.phone:'登录后查看'}}</div>
        <div class="text">手机号</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        
      }
    },
    props:{
      jsonData:{}
    }
  }
</script>

<style lang="stylus" scoped>
.middle
  ul 
    margin 15px 
    list-style-type  none 
    background  #fff 
    border-radius  5px 
    li 
      position  relative 
      padding 15px 
  .row 
    display  flex 
    justify-content space-around 
    align-items  center 
    text-align  center 
    .num 
      font-size  20px 
      color #222 
      margin-top 8px 
    .text 
      font-size  16px 
      color #999 
      margin-top 8px 
</style>