<template>
  <div class="middle">
    <!-- 底部列表 -->
    <ul class="member-list ignore">
      <li class="navigate-right" v-for="(item,i) in memberList" :key="i" @click="$router.push(item.path)">
        <img :src="item.img_url" class="">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        memberList:[
          {title:'绑定手机号',img_url:require('../../assets/img/user/tel.png'),path:'/user/tel'},
          {title:'我的会员',img_url:require('../../assets/img/user/member.png'),path:'/user/member'},
          {title:'办卡记录',img_url:require('../../assets/img/user/record.png'),path:'/user/record'},
          {title:'邀请有礼',img_url:require('../../assets/img/user/invite.png'),path:'/user/invite'},
          {title:'联系我们',img_url:require('../../assets/img/user/contact.png'),path:'/user/contact'}
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
  .member-list 
    li 
      position  relative 
      padding-right  15px
      margin-left 15px
      display  flex 
      justify-content flex-start 
      align-items  center 
      border-bottom 1px solid rgba(120, 120, 120,0.12) 
      img 
        width 40px 
        height 40px 
      span 
        font-size 24px 
        line-height 90px
        padding-left 20px 
</style>
