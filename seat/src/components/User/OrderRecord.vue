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
          {name:'订座',img_url:'img/my_order.png',path:'/order'},
          {name:'延长时段',img_url:'img/my_order_delay.png',path:'/order/delay'},
          {name:'取消',img_url:'img/my_order_cancel.png',path:'/order/cancel'},
          {name:'结束',img_url:'img/my_order_end.png',path:'/order/end'},
          {name:'逾期',img_url:'img/my_order_overdue.png',path:'/order/overdue'}
        ]
      }
    }
  }
</script>

<style scoped>
.middle ul{
  margin:15px;
  list-style-type: none;
  background: #fff;
  border-radius: 5px;
}
.middle ul li{
  position: relative;
  padding:15px;
}
.middle .row{
  display: flex;
  justify-content:space-around;
  align-items: center;
  text-align: center;
}
.middle .row .num{
  font-size: 20px;
  color:#222;
  margin-top:8px;
}
.middle .row .text{
  font-size: 16px;
  color:#999;
  margin-top:8px;
}
.middle .order-record li img{
  width:40px;
  height:40px;
}
</style>

