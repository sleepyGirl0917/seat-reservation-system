<template>
  <div id="app-logout">
    <button class="ignore" @click.prevent="btnLogout">退出登录</button>
  </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import { logout } from "../../api/index";
import * as types from "../../store/mutation-types";
export default {
  methods: {
    // 退出登录
    async btnLogout() {
      let result = await logout();
      if (result.success_code == 200) {
        this.$store.commit(types.LOGOUT);
        Toast({
          message: "已退出",
          position: "middle",
          duration: 2000
        });
        this.$router.go(-1);
      } else {
        MessageBox.alert("退出失败，请重试");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#app-logout 
  width 100%
  min-height 100vh
  padding-top 60px
  &:after
    content ''
    display table

  button 
    display block
    width 70%
    margin  100px auto
    font-size 25px
</style>

