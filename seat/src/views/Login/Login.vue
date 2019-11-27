<template>
    <div id="app-login">
      <go-back :icon="icon"></go-back>
      <div class="login-head">
        <img src="img/logo.jpg" class="logo">
      </div>
      <form id="login-form" class="login-box">
        <!-- 验证码登录 -->
        <div class="login-info login-phone">
          <input type="tel" class="" placeholder="请输入手机号" v-model="phone">
          <button v-if="countDown===0" @click.prevent="getValidateCode">
            获取验证码
          </button>
          <button v-else>重新获取({{countDown}}s)</button>
        </div>
        <div class="login-info login-verify">
          <input type="tel" class="" placeholder="请输入验证码" v-model="phoneCode">
        </div>
        <button class="login-submit" @click.prevent="btnLogin">登录</button>
        <div class="login-remind">
          温馨提示：未注册的手机号，验证后将自动注册账户，且代表已阅读并同意<a href="javascript:;">《用户服务协议》</a>、<a href="javascript:;">《隐私政策》</a>
        </div>
      </form>
    </div>
</template>

<script>
import {Toast,MessageBox} from 'mint-ui'
import Back from '../../components/Back/Back'
export default {
  name:"Login",
  data(){
    return {
      icon:"close",
      phone:"",
      phoneCode:"",
      countDown:0, // 倒计时
    }
  },
  computed:{
    // 检查手机号格式
    checkPhone(){
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(this.phone);
    }
  },
  components:{
    "go-back":Back
  },
  methods:{
    // 获取验证码
    getValidateCode(){
      if (this.checkPhone) {
        this.countDown = 60;
        let timer = setInterval(()=>{
          this.countDown--;
          if (this.countDown===0) {
            clearInterval(timer);
          }
        },1000);
        let url = "http://127.0.0.1:3000";
        url+="/api/getPhoneCode?phone="+this.phone;
        this.axios.post(url).then(res=>{
          console.log(res)
          if(res.data.success_code==200){
            MessageBox.alert('手机验证码为：'+res.data.data);
          }else{ // 获取手机验证码失败
            MessageBox.alert('获取手机验证码失败');
            clearInterval(timer);
            this.countdown = 0;
          } 
        })
      }
    },
    btnLogin(){
      var phone = this.phone;
      var phoneCode = this.phoneCode;
      var reg = /^[a-z0-9]{3,12}$/i;
      if(!reg.test(phone)){
          Toast("用户名格式不正确");
          return;
      }
      if (!reg.test(phoneCode)) {
        Toast("密码格式不正确");
        return;
      }
      var url = "http://127.0.0.1:3000";
      url+="/api/login?phone="+phone+"&phoneCode="+phoneCode;
      this.axios.get(url).then(res=>{
        console.log(res);
      })
    }
  } 
}
</script>

<style>
#app-login{
  width:100%;
  height:80%;
}
#app-login .login-head{
  display: flex;
  justify-content: center;
  align-items: center;
  margin:100px auto;
}
#app-login .login-head img{
  display:block;
  width:100px;
  height:100px;
}
#app-login .login-box{
  width:70%;
  margin:0 auto;
}
#app-login .login-box .login-info{
  position: relative;
}
#app-login .login-box input{
  font-size: 25px;
  height:50px;
  line-height:50px;
  width:100%;
  border:none;
  border-bottom:1px solid #222;
  background: transparent;
}
#app-login .login-box .login-info button{
  position: absolute;
  right:5px;
  bottom:20px;
  height:70%;
  font-size:20px;
}
#app-login .login-box .login-submit{
  width:100%;
  margin:10px 0;
  font-size:25px;
  border-radius: 5px;
}
#app-login .login-box .login-remind{
  font-size:17px;
  color:#666;
  margin:10px 5px;
}
#app-login .login-box .login-remind a{
  color:#007aff !important;
}
</style>

