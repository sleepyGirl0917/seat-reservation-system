<template>
  <div id="app-user">
    <!-- 头像 -->
    <user-info :jsonData=userInfo></user-info>
    <!-- 余额和手机号 -->
    <user-msg :jsonData=userInfo></user-msg>
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
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return{
      }
    },
    computed:{
      // 通过mapGetters获取store中state设置的变量
      ...mapGetters(['userInfo','isLogin'])
    },
    components:{
      "user-info":UserInfo,
      "user-msg":UserMsg,
      "order-record":OrderRecord,
      "member-list":MemberList
    }
  }
</script>

<style lang="stylus" scoped>
#app-user 
  width 100%
  overflow hidden
</style>

