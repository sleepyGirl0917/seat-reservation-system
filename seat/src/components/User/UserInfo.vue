<template>
  <div class="top">
    <div v-if="Object.keys(jsonData).length" class="user-info">
      <div class="avatar" :style="'background:url('+(jsonData?baseUrl+jsonData.avatar:avatar)+') no-repeat 50% 50%;background-size:cover;'">
        <!-- <img :src="jsonData?baseUrl+jsonData.avatar:avatar"/> -->
      </div>
      <div class="uname">{{jsonData.user_name}}</div>
    </div>
    <div v-else class="user-info" @click="$router.push('/login')">
      <div class="login">
        <span>立即登录&nbsp;</span>
        <span class="mui-icon mui-icon-forward"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        baseUrl:process.env.VUE_APP_API,
        avatar: process.env.VUE_APP_API+"/img/avatar/default.png"
      };
    },
    props:{
      jsonData: {},
    }
  };
</script>
<style lang="stylus">
.top  
  position  relative 
  width  100% 
  height  300px 
  text-align  center 
  line-height  50px 
  &:after  
    position  absolute 
    width  200% 
    height  300px 
    left  -50% 
    top  0 
    z-index  -1 
    content  "" 
    border-radius  0 0 50% 50% 
    background  linear-gradient(rgb(38, 38, 38), rgb(58, 58, 58)) 
  .user-info  
    position  relative 
    top  25% 
    left  50px 
    height  50% 
    background  transparent 
    display  flex 
    justify-content  flex-start 
    align-items  center 
    .avatar  
      width  120px 
      height  120px 
      overflow hidden 
      border-radius  50%
      border 8px solid #fff 
      img  
        width 100%
        height 100%
    .uname  
      padding-left  30px 
      font-size  30px 
      font-weight  500 
      color  #fff 
    .login span  
      font-size  32px 
      font-weight  700 
      letter-spacing  3px 
      color  #fff 
</style>
