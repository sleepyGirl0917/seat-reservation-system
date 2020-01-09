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
    <!-- 退出登录 -->
    <btn-container v-if="$store.getters.uid" :text="btnText" @submit="btnLogout"></btn-container>
  </div>
</template>

<script>
  import { Indicator,Toast, MessageBox } from 'mint-ui'
  import UserInfo from '../../components/User/UserInfo'
  import OrderRecord from '../../components/User/OrderRecord'
  import MemberList from '../../components/User/MemberList'
  import UserMsg from '../../components/User/UserMsg'
  import Button from '../../components/Button/Button'
  import { getUserInfo,logout } from '../../api/index'
  import * as types from "../../store/mutation-types";
  export default {
    data(){
      return{
        loadingStatus:false,
        btnText:'退出登录',
        jsonData:{}
      }
    },
    components:{
      "user-info":UserInfo,
      "user-msg":UserMsg,
      "order-record":OrderRecord,
      "member-list":MemberList,
      "btn-container":Button
    },
    created(){
      this.loadUserInfo();
    },
    methods:{
      async loadUserInfo(){
        if(this.$store.getters.uid){
          Indicator.open('加载中...')
          let result = await getUserInfo(this.$store.getters.uid);
          // console.log(result);
          if(result.success_code===200){
            this.jsonData=result.data;
          }
          Indicator.close();
        }
        this.loadingStatus=true;
      },
      // 退出登录
      async btnLogout() {
        let result = await logout();
        if (result.success_code == 200) {
          this.$store.commit(types.LOGOUT);
          this.jsonData={};
          Toast({
            message: "已退出",
            position: "middle",
            duration: 2000
          });
        } else {
          MessageBox.alert("退出失败，请重试");
        }
      }
    }
  }
</script>

<style lang="stylus">
#app-user 
  width 100%
  height 100%
  padding-bottom 80px  
  .btn-container
    padding 20px 20px 40px
</style>

