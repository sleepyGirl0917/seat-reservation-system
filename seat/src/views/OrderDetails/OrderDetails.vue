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
      <p>状态：{{jsonData.order_status|orderStatusFilter}}</p>
    </div>
    <div class="btn-container">
      <button v-if="process_num==1" class="ignore" @click.prevent="cancelOrder">{{btnText}}</button>
      <button v-else-if="process_num==2" class="ignore" @click.prevent="startOrder">{{btnText}}</button>
      <button v-else-if="process_num==4" class="ignore" @click.prevent="endOrder">{{btnText}}</button>
      <button class="ignore" @click.prevent="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
import {
  getOrderDetails,
  cancelOrder,
  startOrder,
  endOrder,
  overOrder
} from "../../api/index";
import { formatDate } from "../../api/common";
import { Toast, MessageBox, Indicator } from "mint-ui";
export default {
  data() {
    return {
      loadingStatus: false,
      jsonData: {},
      process_num:null,
      now:null
    };
  },
  props: ["order_id"],
  computed: {
    during_time(){
      return this.now-this.jsonData.start_time
    },
    btnText(){
      // if(this.process_num==1){
      //   return '取消订单'
      // }else if(this.process_num==2){
      //   return '开始'
      // }else if(this.process_num==4){
      //   return '结束订单'
      // }else{
      //   return null
      // }
      switch(this.process_num){
        case 1:
          return '取消订单'
        case 2:
          return '开始'
        case 4:
          return '结束订单'
        default:
          return null
      }
    },
    timeOut:{ // 定时器的进程
      set(val){
        this.$store.state.timeout.compileTimeout = val;
      },
      get(){
        return this.$store.state.timeout.compileTimeout;
      }
    }
  },
  watch:{
    during_time(){
      let max=1000*60*15;
      if(this.jsonData.order_status==0&&this.during_time<0){
        this.process_num=1;
        // this.btnText='取消订单';
      }else if(this.jsonData.order_status==0&&this.during_time>=0&&this.during_time<=max){
        this.process_num=2; 
        // this.btnText='开始';
      }else if(this.jsonData.order_status==0&&this.during_time>max){
        this.process_num=3;
        this.overOrder();
      }else if(this.jsonData.order_status==1&&this.jsonData.end_time>this.now){
        this.process_num=4;
        // this.btnText='结束订单';
      }else if(this.jsonData.order_status==1&&this.jsonData.end_time<=this.now){
        this.process_num=5;
        this.endOrder();
      }
    }
  },
  created() {
    this.loadOrderDetails();  
  },
  beforeDestroy() {
    if(this.timeOut) {  
      clearTimeout(this.timeOut);  
    }  
  },
  methods: {
    // 加载订单详情
    async loadOrderDetails() {
      Indicator.open("加载中...");
      let result = await getOrderDetails(this.$store.getters.uid,this.order_id);
      // console.log(result)
      if (result.success_code == 200) {
        this.jsonData = result.data;
        this.loadingStatus = true;
        this.getListIng();
      }
      Indicator.close();
    },
    // 监测订单状态
    getListIng() {
      let _this = this;
      this.now=new Date().getTime()
      this.timeOut = setTimeout(() => {
        _this.getListIng();
      }, 1000)
      // console.log(this.timeOut)
    },
    // 取消订单
    async cancelOrder() {
      let result = await cancelOrder(
        this.$store.getters.uid,
        this.order_id,
        this.jsonData.pid
      );
      // console.log(result);
      if (result.success_code == 200) {
        Toast("取消成功");
        this.$router.go(-1);
      } else {
        MessageBox.alert("取消失败，请稍后重试");
      }
    },
    // 开始订单
    async startOrder() {
      let result = await startOrder(
        this.$store.getters.uid,
        this.order_id
      );
      // console.log(result);
      if (result.success_code == 200) {
        this.jsonData.order_status=1;
        // this.$router.go(0)
        Toast("已开始");
      }else {
        MessageBox.alert("开始失败，请稍后重试");
      }
    },
    // 结束订单
    async endOrder() {
      let result = await endOrder(
        this.$store.getters.uid,
        this.order_id,
        this.jsonData.pid
      );
      // console.log(result);
      if (result.success_code == 200) {
        Toast("结束成功");
        this.$router.go(-1);
      } else {
        MessageBox.alert("结束失败，请稍后重试");
      }
    },
    // 订单逾期
    async overOrder(){
      let result =await overOrder(this.$store.getters.uid,this.order_id,this.jsonData.pid);
      console.log(result)
      if(result.success_code==200){
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="stylus">
#order-detail {
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
  background-color: #fff;

  .order-title {
    padding: 15px 0;
    font-size: 17px;
    color: #999;
    text-align: center;
  }

  .order-info {
    padding: 0 25px;

    p {
      font-size: 18px;
      font-weight: 500;
      color: #333;
      padding: 15px 0;
      margin: 0;

      &.small {
        font-size: 17px;
        font-weight: 500;
        color: #999;
      }
    }
  }

  .btn-container {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    position: absolute;
    bottom: 20px;
    left: 0;

    button {
      flex: 1;
      margin: 50px;
      height: 50px;
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>

