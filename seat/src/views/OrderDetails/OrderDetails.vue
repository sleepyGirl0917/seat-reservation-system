<template>
  <div id="order-detail" v-if="loadingStatus">
    <div class="order-title">{{jsonData.order_date|dateTimeFilter('dateOnly')}}</div>
    <div class="order-info">
      <p>{{jsonData.shop_name}}</p>
      <p>{{jsonData.seat_info}}</p>
      <p class="small">
        时间段：{{jsonData.order_date|dateTimeFilter('dateOnly')}}
        {{jsonData.start_time}}-{{jsonData.end_time}}
      </p>
      <p>状态：{{jsonData.order_date|orderStatusFilter(jsonData.start_time,jsonData.end_time)}}</p>
    </div>
    <div class="btn-container"> 
      <button v-if="orderStatus==1" class="ignore" @click.prevent="cancel">取消订单</button>
      <button v-else-if="orderStatus==2" class="ignore" @click.prevent="end">结束订单</button>
      <button class="ignore" @click.prevent="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
import { getOrderDetails,cancelOrder,endOrder } from '../../api/index'
import { Toast,MessageBox,Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
import { formatDate,parseTime } from '../../api/common'
export default {
  data() {
    return {
      loadingStatus:false,
      jsonData:{},
      orderStatus:null
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
      // console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
        this.loadingStatus=true;
        this.statusControl();
        // if(this.jsonData.orderStatus==0){ // 未开始或进行中
        //   this.statusControl();
        // }else{
        //   this.orderStatus=null
        // }
      }
      Indicator.close();
    },
    statusControl(){
      // 获得date格式的开始/结束时间
      let dateVal=formatDate(new Date(this.jsonData.order_date),'yyyy/MM/dd'),
          startVal=this.jsonData.start_time,
          endVal=this.jsonData.end_time,
          formatStartVal = new Date(dateVal+' '+startVal),
          formatEndVal = new Date(dateVal+' '+endVal);
          console.log(formatStartVal,formatEndVal)
      if(this.jsonData.orderStatus==0){
        if(formatStartVal>new Date()){
          this.orderStatus=1; // 未开始
        }else if(formatStartVal<=new Date()&&formatEndVal>=new Date()){
          this.orderStatus=2; // 进行中
        }else {
          this.orderStatus=null; // 其他
        } 
        // else暂时不删，因为还没有实现超时自动取消/结束订单，自动发送请求
      }
    },
    // 取消订单
    async cancel(){
      let result = await cancelOrder(this.userInfo.user_id,this.order_id,this.jsonData.pid);
      console.log(result)
      if(result.success_code==200){
        Toast('取消成功');
        this.$router.go(-1);
      }else {
        MessageBox.alert("取消失败，请稍后重试");
      }
    },
    // 结束订单
    async end(){
      let result = await endOrder(this.userInfo.user_id,this.order_id,this.jsonData.pid);
      console.log(result)
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
  min-height 100vh
  padding-top 60px
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
    align-items center
    margin 0
    position absolute
    bottom 20px
    left 0
    button 
      flex  1
      margin 50px
      height  50px
      font-size 18px
      font-weight 500
</style>

