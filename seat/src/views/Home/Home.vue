<template>
  <div id="app-home">
    <header>
      <h1 class="title">众独空间</h1>
    </header>
    <!-- 轮播图 -->
    <mt-swipe>
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 菜单列表 -->
    <ul class="menu">
      <li class="menu-item" v-for="item in menuList" :key="item.id" @click="switchTo(item.path)">
        <img :src="item.img_url" />
        <span class="menu-title">{{item.title}}</span>
      </li>
    </ul>
    <!-- v-if 订座 -->
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-if="orderNow.length">
        <a class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="img/ordered.png">
          <div class="mui-media-body">
            <div>众独空间（昙华林店）</div>
            <!-- <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p> -->
            <div>
              <p>单人座：4</p>
              <p>日期：2019-11-21 09:40-21:10</p>
              <p>状态：进行中</p>
            </div>
          </div>
        </a>
      </li>
      <li v-else>暂无可用的订座记录</li>
		</ul>
  </div>
</template>

<script>
export default {
  name:"Home",
  data() {
    return {
      swipeList: [
        { id: 1, img_url: "img/banner1.jpg" },
        { id: 2, img_url: "img/banner2.jpg" },
        { id: 3, img_url: "img/banner3.jpg" }
      ],
      menuList: [
        { id: 1, title: "预约体验", img_url: "img/cell1.jpg", path: "/order" },
        { id: 2, title: "加入会员", img_url: "img/cell2.jpg", path: "/order" },
        { id: 3, title: "预定座位", img_url: "img/cell3.jpg", path: "/order" }
      ],
      orderNow:[]
    };
  },
  methods: {
    switchTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style scoped>
#app-home {
  width: 100%;
  height: 100%;
}
#app-home header {
  width: 100%;
  height: 60px;
}
#app-home header .title {
  font-size: 17px;
  font-weight: 500;
  line-height: 60px;
  position: absolute;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  color: #000;
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
  object-fit:fill;
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
</style>

