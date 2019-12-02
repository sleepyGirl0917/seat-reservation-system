<template>
  <div id="app-user">
    <!-- 头像 -->
    <user-info :jsonData=jsonData></user-info>
    <!-- 余额和手机号 -->
    <user-msg :jsonData=jsonData></user-msg>
    <!-- 消费记录 -->
    <order-record></order-record>
    <!-- 底部列表 -->
    <member-list></member-list>
  </div>
</template>

<script>
  import UserInfo from '../../components/User/UserInfo'
  import OrderRecord from '../../components/User/OrderRecord'
  import MemberList from '../../components/User/MemberList'
  import UserMsg from '../../components/User/UserMsg'
  import { getUserInfo } from "../../api/index"
  import { Indicator } from 'mint-ui'
  export default {
    data(){
      return{
        jsonData:{}
      }
    },
    components:{
      "user-info":UserInfo,
      "user-msg":UserMsg,
      "order-record":OrderRecord,
      "member-list":MemberList
    },
    created(){
      this.loadUserInfo();
    },
    methods:{
      async loadUserInfo() {
        Indicator.open('Loading...');
        if (this.$cookies.get("user_id")) {
          let result = await getUserInfo(this.$cookies.get("user_id"));
          console.log(result);
          if (result.success_code === 200) {
            this.jsonData = result.data;
          }
        } else {
          this.jsonData = {};
        }
        Indicator.close();
      }
    }
  }
</script>

<style lang="stylus" scoped>
#app-user 
  width 100%
  overflow hidden
</style>

