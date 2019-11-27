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
      <!-- 消费记录 -->
      <!-- 五行列表 -->
    </div>
  </div>
</template>

<script>
  export default {
    name:"User",
    data(){
      return{

      }
    },
    methods:{}
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
</style>

