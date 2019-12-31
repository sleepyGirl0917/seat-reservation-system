<template>
  <div id="purchase-details" v-if="loadingStatus">
    <div class="container">
      <div>
        <span>店铺名称:</span>
        <span>{{jsonData.shop_name}}</span>
      </div>
      <div>
        <span>时间段:</span>
        <span>
          {{jsonData.order_date|dateTimeFilter('dateOnly')}} 
          {{jsonData.start_time|dateTimeFilter('timeOnly')}}-{{jsonData.end_time|dateTimeFilter('timeOnly')}}
        </span>
      </div>
      <div>
        <span>小计:</span>
        <span>&yen;{{jsonData.order_cost}}</span>
      </div>
      <div>
        <span>类型:</span>
        <span>{{routeName|orderFilter}}</span>
      </div>
      <div>
        <span>支付方式:</span>
        <span>{{jsonData.pay_type|payTypeFilter}}</span>
      </div>
      <div>
        <span>余额抵扣:</span>
        <span>- &yen;{{jsonData.order_cost}}</span>
      </div>
      <div>
        <span>实际支付:</span>
        <span>&yen;0</span>
      </div>
    </div>
    <div class="container">
      <div>支付时间：{{jsonData.pay_time|dateTimeFilter}}</div>
      <div>订单编号：{{jsonData.order_num}}</div>
    </div>
  </div>
</template>

<script>
import { getPurchaseDetails } from '../../api/index'
import { Indicator } from "mint-ui"
export default {
  data() {
    return {
      loadingStatus:false,
      jsonData:{},
    };
  },
  props:['order_id'],
  computed:{
    routeName(){
      return this.$route.name
    }
  },
  created() {
    this.loadPurchaseDetails();
  },
  methods: {
    async loadPurchaseDetails(){
      Indicator.open('加载中...');
      let result= await getPurchaseDetails(this.$store.getters.uid,this.order_id);
      // console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
        this.loadingStatus=true;
      }
      Indicator.close();
      
    }
  }
};
</script>

<style lang="stylus" scoped>
#purchase-details
  width 100%
  min-height 100vh
  padding-top 60px
  
  .container
    background #fff
    border-top  1px solid rgba(88,88,88,0.3) 
    border-bottom  1px solid rgba(88,88,88,0.3) 
    margin 15px
      
    &:nth-child(1)
      padding-left 15px
      &>div
        display flex
        justify-content space-between
        align-items center
        padding-right 15px
        height  80px
        font-size  20px

        :nth-child(1)
          font-weight 600
        :nth-child(2)
          color #8f8f94
        &:not(:last-child)
          border-bottom 1px solid rgba(88, 88,88,0.3) 

    &:nth-child(2)
      padding 10px 15px
      &>div
        height  50px  
        line-height 50px
        font-size  18px
        font-weight  400
</style>

