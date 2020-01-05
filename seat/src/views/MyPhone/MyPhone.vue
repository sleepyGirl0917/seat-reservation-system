<template>
  <div id="app-phone">
    <div class="title">
      <span class="mui-icon mui-icon-arrowthinleft" @click="$router.go(-1)"></span>
    </div>
    <div class="container">
      <div class="top">修改手机号</div>
      <my-phone :btnText=btnText @submit="updatePhoneNum(arguments)"></my-phone>
    </div>
  </div>
</template>

<script>
import PhoneCode from "../../components/PhoneCode/PhoneCode"
import {updatePhone} from "../../api/index"
import {Toast} from "mint-ui"
export default {
  data(){
    return {
      btnText:'确认修改'
    }
  },
  components:{
    "my-phone":PhoneCode
  },
  methods:{
    async updatePhoneNum(msg){
      // console.log(msg)
      let phone=msg[0],
          phoneCode=msg[1];
      let result = await updatePhone(this.$store.getters.uid,phone,phoneCode);
      if(result.success_code==200){
        Toast('修改成功！');
        this.$router.go(-1);
      }else{
        Toast(result.message);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#app-phone
  width 100%
  overflow hidden

  .title
    position fixed
    top  30px
    left 15px
    span.mui-icon.mui-icon-arrowthinleft
      font-size 100px
      font-weight 700
      text-shadow 2px 2px 1px #999

  .container   
    width 75%
    margin 300px auto 0
    .top
      font-size 40px
      font-weight 700
      height 100px
      line-height 100px
      margin-bottom 150px
      text-shadow 1px 1px 1px #999
</style>

