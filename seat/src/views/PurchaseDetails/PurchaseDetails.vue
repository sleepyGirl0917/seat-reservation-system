<template>
  <div id="purchase-details" v-if="loadingStatus">
    <div class="containers">
      <div class="container-item">
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
        <div  v-if="$route.path.includes('cancle')||$route.path.includes('end')">
          <span>退款金额:</span>
          <span>&yen;{{Math.abs(jsonData.order_refund)}}</span>
        </div>
        <div  v-else>
          <span>小计:</span>
          <span>&yen;{{jsonData.order_cost}}</span>
        </div>
        <div>
          <span>类型:</span>
          <span>{{$route.name|orderFilter}}</span>
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
      <div class="container-item"  v-if="$route.path.includes('overdue')">
        <div>
          <span>扣取逾期费用:</span>
          <span>&yen;{{printFn(jsonData.order_cost-jsonData.order_refund)}}</span>
        </div>
        <div>
          <span>退款金额:</span>
          <span>&yen;{{jsonData.order_refund}}</span>
        </div>
      </div>
      <div class="container-item">
        <div>支付时间：{{jsonData.pay_time|dateTimeFilter}}</div>
        <div>订单编号：{{jsonData.order_num}}</div>
      </div>
    </div>
    <btn-container :text="btnText" @submit="$router.go(-1)"></btn-container>
  </div>
</template>

<script>
import { getPurchaseDetails } from '../../api/index'
import { Indicator } from "mint-ui"
import Button from "../../components/Button/Button"
export default {
  data() {
    return {
      loadingStatus:false,
      jsonData:{},
      btnText:'返回'
    };
  },
  props:['order_id'],
  components:{
    "btn-container": Button
  },
  created() {
    this.loadPurchaseDetails();
  },
  methods: {
    async loadPurchaseDetails(){
      Indicator.open('加载中...');
      let result= await getPurchaseDetails(this.$store.getters.uid,this.order_id);
      if(result.success_code==200){
        this.jsonData=result.data;
        this.loadingStatus=true; // 有返回值才显示
      }
      Indicator.close();
    },
    printFn(value) {
      const precision = 14;
      return Number(math.format(value, precision));
    }
  }
};
</script>

<style lang="stylus" scoped>
#purchase-details
  width 100%
  height 100%
  padding-top 80px
  
  .container-item
    background #fff
    border-top  1px solid rgba(88,88,88,0.3) 
    border-bottom  1px solid rgba(88,88,88,0.3) 
    margin 20px
      
    &:not(:last-child)
      padding-left 20px
      &>div
        display flex
        justify-content space-between
        align-items center
        padding-right 20px
        height  100px
        
        :nth-child(1)
          font-size  28px
          font-weight 500
        :nth-child(2)
          font-size  26px
          color #8f8f94
        &:not(:last-child)
          border-bottom 1px solid rgba(88, 88,88,0.3) 

    &:last-child
      padding-left 20px
      &>div
        font-size  25px
        font-weight  400
        height  80px  
        line-height 80px

  .btn-container
    padding  60px 40px      
</style>

