<template>
  <div class="top">
    <div v-show="this.$cookies.get('user_id')" class="user-info">
      <div class="avatar">
        <img src="img/logo.jpg" alt="">
      </div>
      <div class="uname">ali</div>
    </div>
    <div v-show="!this.$cookies.get('user_id')" class="user-info" @click="$router.push('/login')">
      <div class="login">
        <span>立即登录&nbsp;</span><span class="mui-icon mui-icon-forward"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      uname:'',
      avatar:''
    }
  }
}
</script>
<style>
.top{
  position: relative;
  width:100%;
  height:300px;
  text-align:center;
  line-height:50px;
}
.top:after {
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
.top .user-info{
  position: relative;
  top:25%;
  left:50px;
  height:50%;
  background:transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.top .user-info .avatar{
  width: 100px;
  height:100px;
  border-radius: 50%;
  background-color: #fff;
}
.top .user-info .avatar img{
  width: 100px;
  height:100px;
  border-radius: 50%;
  border:0.5px dashed #999;
}
.top .user-info .uname{
  padding-left:30px;
  font-size: 30px;
  font-weight: 500;
  color:#fff;
}
.top .user-info .login span{
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 3px;
  color:#fff;
}
</style>
