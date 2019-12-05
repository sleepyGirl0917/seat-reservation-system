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
        <div class="media" v-if="Object.keys(jsonData).length">
          <a class="navigate-right">
            <img class="media-object float-left" src="../../assets/img/ordered.png" />
            <div class="media-body">
              <div>{{jsonData.shop_name}}</div>
              <div>
                <p>{{jsonData.seat_info}}</p>
                <p>日期：{{jsonData.start_time|dateTimeFilter('dateOnly')}} {{jsonData.start_time|dateTimeFilter('timeOnly')}}-{{jsonData.end_time|dateTimeFilter('timeOnly')}}</p>
                <p>状态：{{status}}</p>
              </div>
            </div>
          </a>
        </div>
        <div class="media-none" v-else>
          <img src="../../assets/img/check.png" />&nbsp;暂无可用的订座记录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui"
import { mapGetters } from 'vuex'
import { getOrderToday } from "../../api/index"
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
        { id: 2, title: "加入会员", img_url: require("../../assets/img/home/menu2.jpg"), path: "/" },
        { id: 3, title: "预定座位", img_url: require("../../assets/img/home/menu3.jpg"), path: "/" }
      ],
      jsonData: {}
    };
  },
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo','isLogin']),
    status(){
      let now=new Date();
      if(now<this.jsonData.start_time){
        status='未开始'
      }else{
        status='进行中'
      }
      return status;
    }
  },
  created(){
    this.loadOrderInfo();  
  },
  methods: {
    async loadOrderInfo(){
      if(this.isLogin){
        let result= await getOrderToday(this.userInfo.user_id);
        // console.log(result)
        if (result.success_code === 200) {
          this.jsonData = result.data;
        } 
      }
    }
  }
};
</script>

<style  lang="stylus">
.title  
  line-height  60px 
  height  60px 
  display  block 
  width  100% 
  margin  0 
  padding  0 
  text-align  center 
  white-space  nowrap 
  color  #000 

.navigate-right:after  
  font-family  Muiicons 
  content  "\e583" 
  position  absolute 
  font-size  28px 
  right  15px 
  top  50% 
  -webkit-transform  translateY(-50%) 
  transform  translateY(-50%) 
  color  #222 
  -webkit-font-smoothing  antialiased 

#app-home 
  width  100% 
  height  100% 
  .title  
    font-size  18px 
    font-weight  500 
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
  .order-now  
    margin  20px 15px 0 
 

.order-box  
  position  relative 
  background  #fff 
  height 150px 
  .media,
  .media .media-body  
      overflow  hidden 
  .media  
    padding  15px 65px 15px 15px 
    .media-object 
      margin 30px 15px 30px 0 
      width  60px 
      height  60px 
    .media-body * 
      margin 10px 0 
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
