<template>
  <div class="middle">
    <!-- 余额和手机号 -->
    <ul class="row user-msg">
      <li>
        <div class="num">{{this.$cookies.get('user_id')?this.balance:'登录后查看'}}</div>
        <div class="text">余额</div>
      </li>
      <li>
        <div class="num">{{this.$cookies.get('user_id')?this.phone:'登录后查看'}}</div>
        <div class="text">手机号</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        phone:'',
        balance:'' // 会员余额
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
</style>