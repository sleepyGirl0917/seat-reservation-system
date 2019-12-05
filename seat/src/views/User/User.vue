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
  import { mapGetters } from 'vuex'
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
    computed:{
      // 通过mapGetters获取store中state设置的变量
      ...mapGetters(['userInfo','isLogin'])
    },
    components:{
      "user-info":UserInfo,
      "user-msg":UserMsg,
      "order-record":OrderRecord,
      "member-list":MemberList
    },
    methods:{
      async getUserData(){
        if(this.isLogin){
          Indicator.open('加载中...')
          let result = await getUserInfo(this.userInfo.user_id);
          // console.log(result);
          if(result.success_code===200){
            this.jsonData=result.data;
          }
          Indicator.close();
          this.loadingStatus=true;
        }
      }
    },
    created(){
      this.getUserData();
    }
  }
</script>

<style lang="stylus" scoped>
#app-user 
  width 100%
  overflow hidden
</style>

