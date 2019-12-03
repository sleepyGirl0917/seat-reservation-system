<template>
  <div id="app-logout">
    <button @click.prevent="btnLogout">退出登录</button>
  </div>
</template>
<script>
import {Toast,MessageBox} from 'mint-ui'
import {logout} from '../../api/index'
export default {
  methods:{
    // 退出登录
    async btnLogout(){
      let result= await logout();
      if(result.success_code==200){
        // 修改登录状态
        this.$store.commit("updateLogin",false);
        // 清除user_id
        this.$store.commit("updateUserId",'');
        // 清除token
        this.$store.commit("updateToken",'');
        // 清除jsonData
        this.$store.commit("updateJsonData",'');
        Toast({
          message: '已退出',
          position: 'middle',
          duration: 2000
        });
        this.$router.push('/user');
      }else{
        MessageBox.alert('退出失败，请重试');
      }     
    } 
  }
}
</script>
<style lang="stylus" scoped>
#app-logout
  button
    display block
    width   70%
    margin  100px auto
    font-size 25px;
    border-radius 5px;
</style>

