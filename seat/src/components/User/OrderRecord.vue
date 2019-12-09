<template>
  <div class="middle">
    <!-- 消费记录 -->
    <ul class="row order-record">
      <li v-for="(item,i) in orderList" :key="i" @click="$router.push(item.path)">
        <img :src="item.img_url" alt="">
        <div class="text">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        orderList:[
          {name:'订座',img_url:require('../../assets/img/user/my_order.png'),path:'/purchase'},
          {name:'延长时段',img_url:require('../../assets/img/user/my_order_delay.png'),path:'/purchase/delay'},
          {name:'取消',img_url:require('../../assets/img/user/my_order_cancel.png'),path:'/purchase/cancel'},
          {name:'结束',img_url:require('../../assets/img/user/my_order_end.png'),path:'/purchase/end'},
          {name:'逾期',img_url:require('../../assets/img/user/my_order_overdue.png'),path:'/purchase/overdue'}
        ]
      }
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
  .order-record li img 
    width 40px 
    height 40px 
</style>

