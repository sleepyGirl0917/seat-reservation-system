<template>
  <div id="order-detail">
    <div class="order-title">{{jsonData.order_date|dateTimeFilter('dateOnly')}}</div>
    <div class="order-info">
      <p>{{jsonData.shop_name}}</p>
      <p>{{jsonData.seat_info}}</p>
      <p class="small">
        时间段：{{jsonData.order_date|dateTimeFilter('dateOnly')}}
        {{jsonData.start_time|dateTimeFilter('timeOnly')}}-{{jsonData.end_time|dateTimeFilter('timeOnly')}}
      </p>
      <p>状态：{{jsonData.start_time|orderStatusFilter}}</p>
    </div>
    <div class="btn-container"> 
      <button class="ignore" @click.prevent="cancelOrder">取消订单</button>
      <button class="ignore" @click.prevent="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
import { getOrderDetails } from '../../api/index'
import { Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
export default {
  name: "Order",
  data() {
    return {
      jsonData:{}
    };
  },
  props:['order_id'],
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo']),
  },
  created() {
    console.log(this.order_id)
    this.loadOrderDetails();
  },
  methods: {
    async loadOrderDetails(){
      Indicator.open('加载中...');
      let result=await getOrderDetails(this.userInfo.user_id,this.order_id);
      console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
      }
      Indicator.close();
    },
    cancelOrder(){
      
    }
  }
};
</script>
<style lang="stylus">
#order-detail
  width 100%
  background-color #fff

  .order-title 
    padding 15px 0
    font-size 17px
    color #999
    text-align center
      
  .order-info 
    padding  0 25px
    p 
      font-size 18px
      font-weight 500
      color #333
      padding 15px 0
      margin 0

      &.small 
        font-size 17px
        font-weight 500
        color #999
            
  .btn-container
    width 100%
    display flex
    justify-content space-between
    position absolute
    bottom 20px
    button 
      flex  1
      margin 50px
      height  50px
      font-size 18px
      font-weight 500
      &.ignore
        border-radius 5px
</style>

