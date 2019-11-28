<template>
  <div class="middle">
    <!-- 底部列表 -->
    <ul class="member-list">
      <li class="navigate-right" v-for="(item,i) in memberList" :key="i" @click="$router.push(item.path)">
        <img :src="item.img_url" class="">
        <div>{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        memberList:[
          {name:'绑定手机号',img_url:'img/tel.png',path:'/user/tel'},
          {name:'我的会员',img_url:'img/member.png',path:'/user/member'},
          {name:'办卡记录',img_url:'img/record.png',path:'/user/record'},
          {name:'邀请有礼',img_url:'img/invite.png',path:'/user/invite'},
          {name:'联系我们',img_url:'img/contact.png',path:'/user/contact'}
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
.middle .member-list li{
  display: flex;
  justify-content:flex-start;
  align-items: center;
  border-bottom:1px solid rgba(120, 120, 120,0.12);
}
.middle .member-list li img{
  width:40px;
  height:40px;
}
.middle .member-list li div{
  font-size:20px;
  margin-left:20px;
}
</style>
