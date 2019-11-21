<template>
  <div id="app-tab">
    <span class="tab-item" @click="switchTo('/home')">
      <img :src="$route.path.includes('/home') ? tabBarImgArr[0].active:tabBarImgArr[0].normal">
      <span>首页</span>
    </span>
    <span class="tab-item" @click="switchTo('/order')">
      <img :src="$route.path.includes('/order') ? tabBarImgArr[1].active:tabBarImgArr[1].normal">
      <span>我的预定</span>
    </span>
    <span class="tab-item" @click="switchTo('/user')">
      <img :src="$route.path.includes('/user') ? tabBarImgArr[2].active:tabBarImgArr[2].normal">
      <span>个人中心</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: "Tabbar",
    data(){
      return{
        tabBarImgArr:[
          {normal:require('./images/tab-home.png'),active:require('./images/tab-home-selected.png')},
          {normal:require('./images/tab-order.png'),active:require('./images/tab-order-selected.png')},
          {normal:require('./images/tab-user.png'),active:require('./images/tab-user-selected.png')},
        ]
      }
    },
    methods:{
      switchTo(path){
        this.$router.replace(path);
      }
    }
  }
</script>

<style scoped>
#app-tab{
  bottom: 0;
  display: table;
  width: 100%;
  height: 50px;
  padding: 0;
  table-layout: fixed;
  border-top: 0;
  border-bottom: 0;
  background-color: rgb(53,68,58);
}
#app-tab .tab-item{
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}
#app-tab .tab-item img{
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
}
#app-tab .tab-item span{
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
