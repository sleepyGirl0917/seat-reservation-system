<template>
  <div id="app-login">
    <div class="login-head">
      <img src="../../assets/img/logo.jpg" class="logo" />
    </div>
    <form id="login-form" class="login-box">
      <!-- 验证码登录 -->
      <my-phone :btnText="btnText" @submit="btnLogin(arguments)"></my-phone>
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
import Button from "../../components/Button/Button";
import PhoneCode from "../../components/PhoneCode/PhoneCode";
import { phoneLogin } from "../../api/index";
import * as types from "../../store/mutation-types";
export default {
  name: "Login",
  data() {
    return {
      btnText:"登录"
    };
  },
  components:{
    "my-phone":PhoneCode
  },
  methods: {
    // 登录
    async btnLogin(msg) {
      // console.log(msg)
      let phone=msg[0],
          phoneCode=msg[1],
          checkPhone=msg[2];
      // console.log(phone,phoneCode,checkPhone)
      if (phone === "") {
        MessageBox.alert("请输入手机号码");
      } else if (!checkPhone) {
        MessageBox.alert("请输入正确的手机号码");
      } else if (phoneCode === "") {
        MessageBox.alert("请输入手机验证码");
      } else {
        let result = await phoneLogin(phone,phoneCode);
        // console.log(result);
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
  height 100%
  padding-top 80px
  &:after
    content ''
    display table

  .login-head 
    display  flex
    justify-content  center
    align-items  center
    margin  200px auto
    img 
      display  block
      width  100px
      height  100px

  .login-box 
    width  75%
    margin  20px auto
    
    .login-remind 
      font-size  20px
      line-height 1.5
      color  #666
      margin  10px 5px
      a 
        color  #007aff !important   
</style>

