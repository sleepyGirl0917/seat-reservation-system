<template>
  <div id="order-detail" v-if="loadingStatus">
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
      <button v-if="`${jsonData.start_time|orderStatusFilter}=='未开始'`" class="ignore" @click.prevent="cancel">取消订单</button>
      <button v-else class="ignore" @click.prevent="end">结束订单</button>
      <button class="ignore" @click.prevent="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
import { getOrderDetails,cancelOrder,endOrder } from '../../api/index'
import { Toast,MessageBox,Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loadingStatus:false,
      jsonData:{}
    };
  },
  props:['order_id'],
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo']),
  },
  created() {
    this.loadOrderDetails();
  },
  methods: {
    async loadOrderDetails(){
      Indicator.open('加载中...');
      let result=await getOrderDetails(this.userInfo.user_id,this.order_id);
      console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
        this.loadingStatus=true;
      }
      Indicator.close();
    },
    // 取消订单
    async cancel(){
      let result = await cancelOrder(this.userInfo.user_id,this.order_id);
      if(result.success_code==200){
        Toast('取消成功');
        this.$router.go(-1);
      }else {
        MessageBox.alert("取消失败，请稍后重试");
      }
    },
    // 结束订单
    async end(){
      let result = await endOrder(this.userInfo.user_id,this.order_id);
      if(result.success_code==200){
        Toast('结束成功');
        this.$router.go(-1);
      }else {
        MessageBox.alert("结束失败，请稍后重试");
      }
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

