<template>
  <div id="app-login">
    <div class="login-head">
      <img src="../../assets/img/logo.jpg" class="logo" />
    </div>
    <form id="login-form" class="login-box">
      <!-- 验证码登录 -->
      <div class="login-info login-phone">
        <input type="tel" class placeholder="请输入手机号" v-model="phone" />
        <button v-if="countDown===0" @click.prevent="getValidateCode">获取验证码</button>
        <button v-else>重新获取({{countDown}}s)</button>
      </div>
      <div class="login-info login-verify">
        <input type="tel" class placeholder="请输入验证码" v-model="phoneCode" />
      </div>
      <button class="login-submit ignore" @click.prevent="btnLogin">登录</button>
      <div class="login-remind">
        温馨提示：未注册的手机号，验证后将自动注册账户，且代表已阅读并同意
        <a href="javascript:;">《用户服务协议》</a>、
        <a href="javascript:;">《隐私政策》</a>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import { getPhoneCode, phoneLogin } from "../../api/index";
import * as types from "../../store/mutation-types";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      phoneCode: "",
      countDown: 0 // 倒计时
    };
  },
  computed: {
    // 检查手机号格式
    checkPhone() {
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(this.phone);
    }
  },
  methods: {
    // 获取验证码
    async getValidateCode() {
      if (this.checkPhone) {
        this.countDown = 60;
        let timer = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            clearInterval(timer);
          }
        }, 1000);
        let result = await getPhoneCode(this.phone);
        console.log(result);
        if (result.success_code == 200) {
          MessageBox.alert("手机验证码为：" + result.data);
          this.phoneCode = result.data; // 填充验证码
        } else {
          MessageBox.alert("获取手机验证码失败");
          clearInterval(timer);
          this.countdown = 0;
        }
      }
    },
    // 登录
    async btnLogin() {
      if (this.phone === "") {
        MessageBox.alert("请输入手机号码");
      } else if (!this.checkPhone) {
        MessageBox.alert("请输入正确的手机号码");
      } else if (this.phoneCode === "") {
        MessageBox.alert("请输入手机验证码");
      } else {
        let result = await phoneLogin(this.phone, this.phoneCode);
        console.log(result);
        if (result.success_code == 200) {
          this.$store.commit(types.LOGIN, result.data);
          Toast({
            message: "登录成功",
            position: "middle",
            duration: 2000
          });
          this.$router.go(-1);
        } else {
          MessageBox.alert("登录失败");
        }
      }
    }
  },
  watch: {
    /* phoneCode(){
      console.log(this.phoneCode)
    } */
  }
};
</script>

<style lang="stylus" scoped>
#app-login 
  width 100%
  min-height 100vh
  padding-top 60px
  &:after
    content ''
    display table

  .login-head 
    display  flex
    justify-content  center
    align-items  center
    margin  100px auto
    img 
      display  block
      width  100px
      height  100px

  .login-box 
    width  70%
    margin  20px auto
    .login-submit 
      width  100%
      margin  10px 0
      font-size  25px
    .login-remind 
      font-size  17px
      color  #666
      margin  10px 5px
      a 
        color  #007aff !important   
    .login-info 
      position  relative
      button 
        position  absolute
        right  5px
        bottom  20px
        height  70%
        font-size  20px   
    input 
      font-size  25px
      height  50px
      line-height  50px
      width  100%
      border  none
      border-bottom  1px solid #222
      background  transparent
</style>

