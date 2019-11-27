<template>
  <div id="app-user">
    <div class="top">
      <div class="user-info">
        <div class="avatar">
          <img src="img/logo.jpg" alt="">
        </div>
        <div class="uname">ali</div>
      </div>
    </div>
    <div class="middle">
      <!-- 余额和手机号 -->
      <ul class="row user-msg">
        <li>
          <div class="num">43.9</div>
          <div class="text">余额</div>
        </li>
        <li>
          <div class="num">18162536357</div>
          <div class="text">手机号</div>
        </li>
      </ul>
      <!-- 消费记录 -->
      <ul class="row order-record">
        <li v-for="(item,i) in orderList" :key="i">
          <img :src="item.img_url" alt="">
          <div class="text">{{item.name}}</div>
        </li>
      </ul>
      <!-- 五行列表 -->
      <ul class="member-list">
        <li class="navigate-right" v-for="(item,i) in memberList" :key="i">
          <img :src="item.img_url" class="">
          <div>{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name:"User",
    data(){
      return{
        uname:'',
        phone:'',
        orderList:[
          {name:'订座',img_url:'img/my_order.png'},
          {name:'延长时段',img_url:'img/my_order_delay.png'},
          {name:'取消',img_url:'img/my_order_cancel.png'},
          {name:'结束',img_url:'img/my_order_end.png'},
          {name:'逾期',img_url:'img/my_order_overdue.png'}
        ],
        memberList:[
          {name:'绑定手机号',img_url:'img/tel.png'},
          {name:'我的会员',img_url:'img/member.png'},
          {name:'办卡记录',img_url:'img/record.png'},
          {name:'邀请有礼',img_url:'img/invite.png'},
          {name:'联系我们',img_url:'img/contact.png'}
        ]
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
#app-user{
  width:100%;
  overflow:hidden; 
}
#app-user .top{
  position: relative;
  width:100%;
  height:300px;
  text-align:center;
  line-height:50px;
}
#app-user .top:after {
  position: absolute;
  width: 200%;
  height: 300px;
  left: -50%;
  top:0;
  z-index: -1;
  content: '';
  border-radius: 0 0 50% 50%;
  background:linear-gradient(rgb(38, 38, 38),rgb(58, 58, 58));
}
#app-user .top .user-info{
  position: relative;
  top:25%;
  left:50px;
  height:50%;
  background:transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#app-user .top .user-info .avatar{
  width: 100px;
  height:100px;
  border-radius: 50%;
  background-color: #fff;
}
#app-user .top .user-info .avatar img{
  width: 100px;
  height:100px;
  border-radius: 50%;
  border:1px dashed #999;
}
#app-user .top .user-info .uname{
  padding-left:30px;
  font-size: 30px;
  font-weight: 500;
  color:#fff;
}
#app-user .middle ul{
  margin:15px;
  list-style-type: none;
  background: #fff;
  border-radius: 5px;
}
#app-user .middle ul li{
  position: relative;
  padding:15px;
}
#app-user .middle .row{
  display: flex;
  justify-content:space-around;
  align-items: center;
  text-align: center;
}
#app-user .middle .row .num{
  font-size: 20px;
  color:#222;
  margin-top:8px;
}
#app-user .middle .row .text{
  font-size: 16px;
  color:#999;
  margin-top:8px;
}
#app-user .middle .member-list li{
  display: flex;
  justify-content:flex-start;
  align-items: center;
  border-bottom:1px solid rgba(120, 120, 120,0.12);
}
#app-user .middle .member-list li img,#app-user .middle .order-record li img{
  width:40px;
  height:40px;
}
#app-user .middle .member-list li div{
  font-size:20px;
  margin-left:20px;
}
</style>

