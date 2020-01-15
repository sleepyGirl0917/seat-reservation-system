<template>
  <div id="app-home">
    <div class="title">众独空间</div>
    <!-- 轮播图 -->
    <mt-swipe>
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 菜单列表 -->
    <ul class="menu">
      <li class="menu-item" @click="getExperience">
        <img src="../../assets/img/home/menu1.jpg" alt="">
        <span class="menu-title">预约体验</span>
      </li>
      <li class="menu-item" @click="$router.push('/join_member')">
        <img src="../../assets/img/home/menu2.jpg" alt="">
        <span class="menu-title">加入会员</span>
      </li>
      <li class="menu-item" @click="$router.push('/select_shop')">
        <img src="../../assets/img/home/menu3.jpg" alt="">
        <span class="menu-title">预定座位</span>
      </li>
    </ul>
    <!-- 可用的订座 -->
    <div class="order-box">
      <div class="media navigate-right" v-if="Object.keys(jsonData).length" @click="$router.push(`/order_details/${jsonData.order_id}`)">
        <div class="media-object">
          <img src="../../assets/img/ordered.png" />
        </div>
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
            <p>状态：{{jsonData.order_status|orderStatusFilter}}</p>
          </div>
        </div>
      </div>
      <div class="media-none" v-else>
        <img src="../../assets/img/check.png" /><span>&nbsp;暂无可用的订座记录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator,Toast } from "mint-ui"
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
      jsonData: {},
      now:null,
    };
  },
  computed: {
    during_time(){
      return this.now-this.jsonData.start_time
    }
  },
  created(){
    this.loadOrderInfo();
  },
  methods: {
    async loadOrderInfo(){
      if(this.$store.getters.uid){
        Indicator.open('加载中...');
        let result= await getOrderLatest(this.$store.getters.uid);
        // console.log(result)
        if (result.success_code === 200) {
          this.jsonData = result.data;
        } 
        Indicator.close();
      }
    },
    getExperience(){
      Toast('您暂无可用的体验卡')
    }
  }
};
</script>

<style lang="stylus" scoped>
#app-home 
  width 100%
  height 100%
  
  .title
    width 100%
    height  80px
    line-height  80px
    font-size 30px
    font-weight 500
    text-align  center 
  .mint-swipe  
    height  380px 
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
    height  200px 
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
        font-size  28px 
        margin  15px 

  .order-box  
    position  relative 
    background  #fff 
    height 240px 
    margin 20px 15px
    .media,
    .media .media-body  
        overflow  hidden 
    .media  
      display flex
      align-items center
      justify-content flex-start
      padding  0 65px 0 15px 
      height 100% 
      .media-object 
        width 80px
        img
          width  100% 
          height  100% 
          display block
      .media-body
        padding-left 20px
        div
          line-height 2
          &:nth-child(1)
            font-size   28px
            font-weight 500
          &:nth-child(2)>p
            font-size  25px
            margin 0
    .media-none 
      position  relative 
      top 50% 
      transform translateY(-50%) 
      text-align  center 
      span 
        font-size 28px
      img 
        width  38px 
        height 38px 
        vertical-align  bottom 
</style>
