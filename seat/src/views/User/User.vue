<template>
  <div id="app-user">
    <!-- 头像 -->
    <user-info></user-info>
    <!-- 余额和手机号 -->
    <user-msg></user-msg>
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
  export default {
    data(){
      return{
        
      }
    },
    components:{
      "user-info":UserInfo,
      "user-msg":UserMsg,
      "order-record":OrderRecord,
      "member-list":MemberList
    }
  }
</script>

<style scoped>
#app-user{
  width:100%;
  overflow:hidden; 
}
</style>

