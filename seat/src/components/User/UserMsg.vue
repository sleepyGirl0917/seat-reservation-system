<template>
  <div class="middle">
    <!-- 余额和手机号 -->
    <ul class="user-msg ignore">
      <li>
        <span class="num">{{Object.keys(jsonData).length?jsonData.balance:'登录后查看'}}</span>
        <span class="text">余额</span>
      </li>
      <li>
        <span class="num">{{Object.keys(jsonData).length?jsonData.phone:'登录后查看'}}</span>
        <span class="text">手机号</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:{
      jsonData:{}
    }
  }
</script>

<style lang="stylus" scoped>
.middle
  width 100%
  ul 
    margin 20px 25px
    list-style-type  none 
    background  #fff  
  .user-msg 
    height 140px
    display  flex  
    align-items  center 
    text-align  center 
    li
      flex  1
      display  flex 
      justify-content space-around 
      align-items  center 
      text-align  center 
      flex-direction column
      .num 
        font-size  30px 
        line-height 2 
        color #222 
      .text 
        font-size  24px 
        line-height 2
        color #999 
</style>