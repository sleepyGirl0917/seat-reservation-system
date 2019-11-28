<template>
  <div id="app-home">
    <h1 class="title">众独空间</h1>
    <!-- 轮播图 -->
    <mt-swipe>
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 菜单列表 -->
    <ul class="menu">
      <li class="menu-item" v-for="item in menuList" :key="item.id" @click="$router.push(item.path)">
        <img :src="item.img_url" />
        <span class="menu-title">{{item.title}}</span>
      </li>
    </ul>
    <!-- 可用的订座 -->
    <div class="order-now">
      <div class="order-box">
        <div class="media" v-if="orderNow.length">
          <a class="navigate-right">
            <!-- <div class="media-object float-left">
              <img class src="img/ordered.png" />
            </div> -->
            <img class="media-object float-left" src="img/ordered.png" />
            <div class="media-body">
              <div>众独空间（昙华林店）</div>
              <div>
                <p>单人座：4</p>
                <p>日期：2019-11-21 09:40-21:10</p>
                <p>状态：进行中</p>
              </div>
            </div>
          </a>
        </div>
        <div class="media-none" v-else>
          <img src="img/check.png" />&nbsp;暂无可用的订座记录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  name: "Home",
  data() {
    return {
      swipeList: [
        { id: 1, img_url: "img/banner1.jpg" },
        { id: 2, img_url: "img/banner2.jpg" },
        { id: 3, img_url: "img/banner3.jpg" }
      ],
      menuList: [
        { id: 1, title: "预约体验", img_url: "img/menu1.jpg", path: "/order" },
        { id: 2, title: "加入会员", img_url: "img/menu2.jpg", path: "/order" },
        { id: 3, title: "预定座位", img_url: "img/menu3.jpg", path: "/order" }
      ],
      orderNow: []
    };
  },
  methods: {
    loadOrderInfo(){
      if (this.$cookies.get("user_id")) {
        getUserInfo(this.$cookies.get("user_id"));
      } else {
        this.$router.push('/login');
        Toast("请先登录！");
      }
    },
    getUserInfo(user_id){
      let url="http:127.0.0.1:3000/api/getUserInfo"+user_id;
      this.axios.get(url).then(res=>{
        console.log(res.data)
        if(res.data.success_code==200){
          this.orderNow=res.data.data;
        }
      })
    }
  },
  created(){
    this.loadOrderInfo();  
  }
};
</script>

<style>
#app-home {
  width: 100%;
  height: 100%;
}
.title {
  line-height: 60px;
  height: 60px;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  color: #000;
}
#app-home .title {
  font-size: 18px;
  font-weight: 500;
}
/*轮播图*/
#app-home .mint-swipe {
  height: 300px;
  margin-left: 25px;
  margin-right: 25px;
  border-radius: 10px;
  overflow: hidden;
  transform: translateY(0);
}
#app-home .mint-swipe img {
  width: 100%;
  height: 100%;
}
/* 菜单列表 */
#app-home ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 180px;
  background: #fff;
}
#app-home .menu {
  display: table;
  text-align: center;
}
#app-home .menu .menu-item {
  display: table-cell;
  vertical-align: middle;
  padding: 0;
}
#app-home .menu .menu-item img {
  width: 80px;
  height: 80px;
}
#app-home .menu .menu-item .menu-title {
  display: block;
  font-size: 18px;
  margin: 15px;
}
/* 可用的订座记录 */
#app-home .order-now {
  margin: 20px 15px 0;
}
.order-box {
  position: relative;
  background: #fff;
  height:150px;
}
.order-box .media,
.order-box .media .media-body {
  overflow: hidden;
}
.order-box .media {
  padding: 15px 65px 15px 15px;
}
.navigate-right:after {
  font-family: Muiicons;
  content: "\e583";
  position: absolute;
  font-size: 28px;
  right: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #222;
  -webkit-font-smoothing: antialiased;
}
.order-box .media .media-object{
  margin:30px 15px 30px 0;
  width: 60px;
  height: 60px;
}
.order-box .media .media-body *{
  margin:10px 0;
}
.order-box .media-none{
  position: relative;
  top:50%;
  transform:translateY(-50%);
  text-align: center;
}
.order-box .media-none img{
  width: 30px;
  height:30px;
  vertical-align: bottom;
}
</style>

