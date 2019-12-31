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
      <button v-if="jsonData.order_status==0&&time<0" class="ignore" @click.prevent="cancelOrder">{{btnText}}</button>
      <button v-else-if="jsonData.order_status==0&&time>=0&&time<=max" class="ignore" @click.prevent="startOrder">{{btnText}}</button>
      <button v-else-if="jsonData.order_status==1&&jsonData.endTime<now" class="ignore" @click.prevent="endOrder">{{btnText}}</button>
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
      btnText:null,
      now:null,
      max:1000*60*15
    };
  },
  props: ["order_id"],
  computed: {
    time(){
      return this.now-this.jsonData.start_time
    }
  },
  watch:{
    time(){
      if(this.jsonData.order_status==0&&this.time<0){
        this.btnText='取消订单'
      }else if(this.jsonData.order_status==0&&this.time>=0&&this.time<=this.max){
        this.btnText='开始'
      }else if(this.jsonData.order_status==0&&this.time>this.max){
        this.overOrder()
      }else if(this.jsonData.order_status==1&&this.jsonData.endTime<this.now){
        this.btnText='结束订单'
      }else if(this.jsonData.order_status==1&&this.jsonData.endTime==this.now){
        console.log(this.jsonData.endTime,this.now)
        this.endOrder()
      }
    }
  },
  filters: {
    orderStatusFilter(orderStatus) {
      if (orderStatus == 0) {
        return "未开始";
      } else if (orderStatus == 1) {
        return "进行中";
      } else {
        return "已结束";
      }
    }
  },
  created() {
    this.loadOrderDetails();
    this.timer = setInterval(() => {
      this.now = new Date().getTime();
      console.log(new Date(),this.now)
    }, 1000)  
  },
  updated(){

  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); 
    }
  },
  methods: {
    async loadOrderDetails() {
      Indicator.open("加载中...");
      let result = await getOrderDetails(this.$store.getters.uid, this.order_id);
      // console.log(result)
      if (result.success_code == 200) {
        this.jsonData = result.data;
        this.loadingStatus = true;
        // console.log(this.jsonData)
      }
      Indicator.close();
    },
    // 取消订单
    async cancelOrder() {
      let result = await cancelOrder(
        this.$store.getters.uid,
        this.order_id,
        this.jsonData.pid
      );
      console.log(result);
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
      console.log(result);
      if (result.success_code == 200) {
        Toast("已开始");
        // location. reload()
        this.loadOrderDetails();

        // this.$router.go(0);
        // this.jsonData.order_status=1;
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
      console.log(result);
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

