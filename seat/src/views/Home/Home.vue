<template>
  <div id="app-home">
    <div class="title">
      众独空间
    </div>
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
    <div class="order-box">
      <div class="media" v-if="Object.keys(jsonData).length">
        <a class="navigate-right" @click="$router.push(`/order_details/${jsonData.order_id}`)">
          <img class="media-object float-left" src="../../assets/img/ordered.png" />
          <div class="media-body">
            <div>{{jsonData.shop_name}}</div>
            <div>
              <p>{{jsonData.seat_info}}</p>
              <p>
                日期：
                {{jsonData.order_date|dateTimeFilter('dateOnly')}} 
                {{jsonData.start_time|dateTimeFilter('timeOnly')}}-
                {{jsonData.end_time|dateTimeFilter('timeOnly')}}
              </p>
              <p>状态：{{jsonData.start_time|orderStatusFilter}}</p>
            </div>
          </div>
        </a>
      </div>
      <div class="media-none" v-else>
        <img src="../../assets/img/check.png" />&nbsp;暂无可用的订座记录
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator,Toast } from "mint-ui"
import { mapGetters } from 'vuex'
import { getOrderLatest } from "../../api/index"
export default {
  name: "Home",
  data() {
    return {
      swipeList: [
        { id: 1, img_url: require("../../assets/img/home/banner1.jpg") },
        { id: 2, img_url: require("../../assets/img/home/banner2.jpg") },
        { id: 3, img_url: require("../../assets/img/home/banner3.jpg") }
      ],
      menuList: [
        { id: 1, title: "预约体验", img_url: require("../../assets/img/home/menu1.jpg"), path: "/" },
        { id: 2, title: "加入会员", img_url: require("../../assets/img/home/menu2.jpg"), path: "/join_member" },
        { id: 3, title: "预定座位", img_url: require("../../assets/img/home/menu3.jpg"), path: "/select_shop" }
      ],
      jsonData: {}
    };
  },
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo','isLogin']),
  },
  created(){
    this.loadOrderInfo();  
  },
  methods: {
    async loadOrderInfo(){
      if(this.isLogin){
        Indicator.open('加载中...');
        let result= await getOrderLatest(this.userInfo.user_id);
        // console.log(result)
        if (result.success_code === 200) {
          this.jsonData = result.data;
        } 
        Indicator.close();
      }
    }
  }
};
</script>

<style  lang="stylus" scoped>
#app-home 
  width 100%
  min-height 100vh
  padding-bottom 80px
  .title
    width 100%
    height  60px
    line-height  60px
    font-size 18px
    font-weight 500
    text-align  center 
  .mint-swipe  
    height  300px 
    margin-left  25px 
    margin-right  25px 
    border-radius  10px 
    overflow  hidden 
    transform  translateY(0) 
    img  
      width  100% 
      height  100% 
  ul  
    margin  0 
    padding  0 
    width  100% 
    height  180px 
    background  #fff 
 
  .menu  
    display  table 
    text-align  center 
    .menu-item  
      display  table-cell 
      vertical-align  middle 
      padding  0 
      img  
        width  80px 
        height  80px 
      .menu-title  
        display  block 
        font-size  18px 
        margin  15px 
 

  .order-box  
    position  relative 
    background  #fff 
    height 150px 
    margin  20px 15px
    .media,
    .media .media-body  
        overflow  hidden 
    .media  
      padding  15px 65px 15px 15px 
      .media-object 
        margin 30px 15px 30px 0 
        width  60px 
        height  60px 
      .media-body
        * 
          margin 10px 0 
        div
          font-size   18px
          font-weight 500
          p
            font-size  16px
            font-weight 400
    .media-none 
      position  relative 
      top 50% 
      transform translateY(-50%) 
      text-align  center 
      img 
        width  30px 
        height 30px 
        vertical-align  bottom 
</style>
