<template>
  <div id="app-user" v-if="loadingStatus">
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
  import { Indicator } from 'mint-ui'
  import UserInfo from '../../components/User/UserInfo'
  import OrderRecord from '../../components/User/OrderRecord'
  import MemberList from '../../components/User/MemberList'
  import UserMsg from '../../components/User/UserMsg'
  import { getUserInfo } from '../../api/index'
  export default {
    data(){
      return{
        loadingStatus:false,
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
      this.getUserData();
    },
    methods:{
      async getUserData(){
        if(this.$store.getters.uid){
          Indicator.open('加载中...')
          let result = await getUserInfo(this.$store.getters.uid);
          console.log(result);
          if(result.success_code===200){
            this.jsonData=result.data;
          }
          Indicator.close();
        }
        this.loadingStatus=true;
      }
    }
  }
</script>

<style lang="stylus" scoped>
#app-user 
  width 100%
  min-height 100vh
  padding-bottom 80px
  overflow hidden
</style>

