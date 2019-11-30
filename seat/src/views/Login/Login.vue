<template>
    <div id="app-login">
      <go-back :icon="icon"></go-back>
      <div class="login-head">
        <img src="../../assets/img/logo.jpg" class="logo">
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
import {getPhoneCode,phoneLogin} from '../../api/index'
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
    async getValidateCode(){
      if (this.checkPhone) {
        this.countDown = 60;
        let timer = setInterval(()=>{
          this.countDown--;
          if (this.countDown===0) {
            clearInterval(timer);
          }
        },1000);
        let result = await getPhoneCode(this.phone);
        console.log(result)
        if(result.success_code==200){
          MessageBox.alert('手机验证码为：'+result.data);
          this.phoneCode=result.data; // 填充验证码
        }else{ 
          MessageBox.alert('获取手机验证码失败');
          clearInterval(timer);
          this.countdown = 0;
        } 
      }
    },
    // 登录
    async btnLogin(){
      if (this.phone===''){
          MessageBox.alert('请输入手机号码');
        }else if(!this.checkPhone){
          MessageBox.alert('请输入正确的手机号码');
        }else if(this.phoneCode===''){
          MessageBox.alert('请输入手机验证码');
        }else{
          let result= await phoneLogin(this.phone,this.phoneCode);
          console.log(result)
          if(result.success_code==200){
            Toast({
              message: '登录成功',
              position: 'middle',
              duration: 2000
            });
            console.log(this.$cookies.get('user_id'))
            this.$router.go(-1);
          }else{
            MessageBox.alert('登录失败');
          } 
        }
    } 
  },
  watch:{
    /* phoneCode(){
      console.log(this.phoneCode)
    } */
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

