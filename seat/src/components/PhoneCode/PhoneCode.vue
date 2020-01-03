<template>
  <div class="send-code">
    <div class="info">
      <input type="tel" placeholder="请输入手机号" v-model="phone" />
      <button v-if="countDown===0" @click.prevent="getValidateCode">获取验证码</button>
      <button v-else>重新获取({{countDown}}s)</button>
    </div>
    <div class="info">
      <input type="tel" placeholder="请输入验证码" v-model="phoneCode" />
    </div>
    <btn-container :text="btnText" @submit="$emit('submit',phone,phoneCode,checkPhone)"></btn-container>
  </div>
</template>
<script>
import Button from "../Button/Button";
import { MessageBox } from "mint-ui";
import { getPhoneCode} from "../../api/index";
export default {
  data(){
    return {
      phone:"",
      phoneCode: "",
      countDown: 0 // 倒计时
    }
  },
  props:{
    btnText:null
  },
  components:{
    "btn-container":Button
  },
  computed: {
    // 检查手机号格式
    checkPhone() {
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(this.phone);
    }
  },
  methods:{
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
        // console.log(result);
        if (result.success_code == 200) {
          MessageBox.alert("手机验证码为：" + result.data);
          this.phoneCode = result.data; // 填充验证码
        } else {
          MessageBox.alert("获取手机验证码失败");
          clearInterval(timer);
          this.countdown = 0;
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.send-code
  .info
    position  relative
    margin-top 10px
    button 
      position  absolute
      right  5px
      bottom  25px
      height  50px
      font-size  20px 
    input 
      width  100%
      height  60px
      line-height  60px
      font-size  32px
      border  none
      border-bottom  1px solid #222
      background  transparent 
  .btn-container
    margin 60px 0 30px
</style>

