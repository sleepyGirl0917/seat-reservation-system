<template>
  <div id="app-order">
    <h1 class="title">我的预定</h1>
    <div class="order-container" v-for="(item,i) of jsonData" :key="i">
      <div class="order-title">{{item.order_date|dateTimeFilter('dateOnly')}}</div>
      <div class="order-item">
        <div class="order-info">
          <p>{{item.shop_name}}</p>
          <p>{{item.seat_info}}</p>
          <p class="small">时间：{{item.start_time|dateTimeFilter('timeOnly')}}-{{item.end_time|dateTimeFilter('timeOnly')}}</p>
        </div>
        <div class="order-status border-top">状态：{{(new Date(item.start_time) <= myDate)?'进行中':'未开始'}}</div>
        <a class="navigate-right border-top">查看详情</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderAll } from '../../api/index';
import { Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
export default {
  name: "Order",
  data() {
    return {
      jsonData:[]
    };
  },
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo']),
    myDate(){
      let myDate=new Date();
      return myDate
    }
  }, 
  created() {
    this.loadOrderInfoAll();
  },
  methods: {
    async loadOrderInfoAll(){
      Indicator.open('加载中...');
      let result=await getOrderAll(this.userInfo.user_id);
      console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
      }
      Indicator.close();
    }
  }
};
</script>

<style lang="stylus">
#app-order 
  .title 
    font-size 22px
    font-weight 700
  
  .order-container 
    padding 0 15px

    .order-title 
      padding 15px 0
      font-size 20px
      color #999
      text-align center
    
    .order-item 
      background #fff
      padding  0 20px

      .order-info 
        p 
          font-size 20px
          color #333
          padding 15px 0
          margin 0

        .small 
          font-size 18px
          color #999

      .order-status, a 
        padding 10px 0
        font-size 14px
        color #999 !important
      
      .border-top 
        border-top 1px solid rgba(80, 80, 80, 0.1)
      
      .navigate-right 
        position relative
        display block
      
        &:after
          right 0
    
</style>

