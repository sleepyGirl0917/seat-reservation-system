<template>
  <div class="top">
    <div v-if="Object.keys(jsonData).length" class="user-info">
      <div
        class="avatar"
        :style="'background-image:url('+(jsonData.avatar)+');'"
        @click="$router.push('/user/update_info')"
      ></div>
      <div class="uname">{{jsonData.user_name}}</div>
    </div>
    <div v-else class="user-info" @click="$router.push('/login')">
      <!-- <div class="avatar">
        <img src="../../assets/img/user/userIcon.png" alt="">
      </div> -->
      <div class="login">
        <span>立即登录&nbsp;</span>
        <span class="mui-icon mui-icon-forward"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    jsonData: {}
  },
  methods:{
    // jumpToUserInfo(){
    //   this.$router.push({
    //     name:'update_info',
    //     params:{
    //       avatar:this.jsonData.avatar,
    //       uname:this.jsonData.user_name
    //     }
    //   })
    // }
  }
};
</script>
<style lang="stylus" scoped>
.top {
  position: relative;
  width: 100%;
  height: 300px;
  text-align: center;
  line-height: 50px;

  &:after {
    position: absolute;
    width: 200%;
    height: 300px;
    left: -50%;
    top: 0;
    z-index: -1;
    content: '';
    border-radius: 0 0 50% 50%;
    background: linear-gradient(rgb(38, 38, 38), rgb(58, 58, 58));
  }

  .user-info {
    position: relative;
    top: 25%;
    left: 50px;
    height: 50%;
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .avatar {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;
      border: 8px solid #fff;
      background-repeat: no-repeat ;
      background-position: 50% 50%;
      background-size: cover;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .uname {
      padding-left: 30px;
      font-size: 32px;
      font-weight: 500;
      color: #fff;
    }

    .login span {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 3px;
      color: #fff;
    }
  }
}
</style>
