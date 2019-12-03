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
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return{
       
      }
    },
    computed:{
      // 通过mapGetters获取store中state设置的变量
      ...mapGetters(['jsonData','isLogin'])
    },
    components:{
      "user-info":UserInfo,
      "user-msg":UserMsg,
      "order-record":OrderRecord,
      "member-list":MemberList
    },
    methods:{
      /* async loadUserInfo() {
        if (this.user_id) {
          Indicator.open('Loading...');
          let result = await getUserInfo(this.user_id);
          console.log(result);
          if (result.success_code === 200) {
            this.jsonData = result.data;
          }
        } else {
          this.jsonData = {};
        }
        Indicator.close();
      } */
    }
  }
</script>

<style lang="stylus" scoped>
#app-user 
  width 100%
  overflow hidden
</style>

