<template>
  <div id="app-tab">
    <span class="tab-item" @click="jumpTo('/home')">
      <img :src="$route.path.includes('/home') ? tabBarImgArr[0].active:tabBarImgArr[0].normal">
      <span>首页</span>
    </span>
    <span class="tab-item" @click="jumpTo('/order')">
      <img :src="$route.path.includes('/order') ? tabBarImgArr[1].active:tabBarImgArr[1].normal">
      <span>我的预定</span>
    </span>
    <span class="tab-item" @click="jumpTo('/user')">
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
      jumpTo(path){
        this.$router.push(path);
      }
    }
  }
</script>

<style>
#app-tab{
  bottom: 0;
  width: 100%;
  height: 80px;
  padding: 0;
  position:fixed;
  display:flex;
  z-index:1000;
  background-color: rgb(53,68,58);
}
#app-tab .tab-item{
  display:flex;
  flex:1;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  font-size: 18px;
  color: #fff;
  padding-top:10px;
}
#app-tab .tab-item img{
  width: 30px;
  height: 30px;
}
#app-tab .tab-item span{
  display: block;
  height:30px;
  line-height: 30px;
  margin-top:5px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
