<template>
  <div class="middle">
    <!-- 消费记录 -->
    <ul class="order-record ignore">
      <li v-for="(item,i) in orderList" :key="i" @click="$router.push(item.path)">
        <img :src="item.img_url" alt="">
        <span>{{item.name}}</span>
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
  width 100%
  ul 
    margin 20px 25px
    list-style-type  none 
    background  #fff  
  .order-record 
    height 160px
    display  flex  
    align-items  center 
    text-align  center 
    li 
      flex 1
      display  flex  
      justify-content  center
      align-items  center 
      text-align  center 
      flex-direction column
      img 
        width 40px 
        height 40px 
      span 
        display inline-block
        margin-top 10px
        font-size  24px 
        line-height 2
        color #999 
</style>

