<template>
  <div id="order-confirm">
    <div class="confirm-title">预定座位：{{seat_type==0?'单人座':'双人座'}}{{seat_id}}号</div>
    <div class="confirm-container">
      <div>
        <span>店铺:</span>
        <span>{{shop_name}}</span>
      </div>
      <div>
        <span>时间段:</span>
        <span>{{order_date}} {{start_time}}--{{end_time}}</span>
      </div>
      <div>
        <span>座位数量:</span>
        <span>×{{seat_count}}</span>
      </div>
      <div>
        <span>座位类型:</span>
        <span>{{seat_type==0?'单人座':'双人座'}}</span>
      </div>
      <div>
        <span>预定时长:</span>
        <span>{{duration}}h</span>
      </div>
      <div>
        <span>小计:</span>
        <span>&yen;{{seat_type==0?duration*9:duration*20}}</span>
      </div>
      <div @click=" open">
        <span>我的会员</span>
        <span v-if="payType">{{payType|payTypeFilter}}</span>
        <span v-else>请选择</span>
      </div>
    </div>
    <btn-container id="btn-submit" :text="btnText1" @submit="handleSubmit"></btn-container>
    <mt-popup v-model="popupVisible" position="bottom" class="select-card" popup-transition="popup-fade" >
      <div class="popup-content">
        <div class="bottom-title">选择会员卡</div>
        <my-card class="card-item"></my-card>
        <btn-container :text="btnText2" @submit="payTypeConfirm"></btn-container>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Button from "../../components/Button/Button";
import VipCard from "../../components/VipCard/VipCard";
export default {
  data() {
    return {
      shop_id: null,
      shop_name: null,
      seat_id: null,
      seat_count: 1,
      seat_type: null,
      order_date: null,
      start_time: null,
      end_time: null,
      duration: null,
      payType: null,
      btnText1: "去付款",
      btnText2: "确认",
      popupVisible: null
    };
  },
  components: {
    "btn-container": Button,
    "my-card": VipCard
  },
  created() {
    console.log(this.$route);
    this.parseParams();
  },
  methods: {
    parseParams() {
      this.shop_id = this.$route.params.shop_id;
      this.shop_name = this.$route.params.shop_name;
      this.seat_id = this.$route.params.seat_id;
      this.seat_count = this.$route.params.seat_count;
      this.seat_type = this.$route.params.seat_type;
      this.order_date = this.$route.params.order_date;
      this.start_time = this.$route.params.start_time;
      this.end_time = this.$route.params.end_time;
      this.duration = this.$route.params.duration;
    },
    open() {
      this.popupVisible = true;
    },
    handleSubmit() {
      // 发送请求
      console.log("付款成功，跳到/order");
    },
    payTypeConfirm() {
      this.payType = 1;
    }
  }
};
</script>

<style lang="stylus" scoped>
#order-confirm {
  width: 100%;
  // min-height: 100vh;
  padding-top: 60px;
  position: relative;

  .confirm-title {
    font-size: 18px;
    color: #222;
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .confirm-container {
    background: #fff;
    border-top: 1px solid rgba(88, 88, 88, 0.3);
    border-bottom: 1px solid rgba(88, 88, 88, 0.3);
    padding-left: 15px;

    &>div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 15px;
      height: 80px;
      font-size: 20px;

      :nth-child(1) {
        font-weight: 600;
      }

      :nth-child(2) {
        color: #8f8f94;
      }

      &:not(:last-child) {
        border-bottom: 1px solid rgba(88, 88, 88, 0.3);
      }
    }
  }

  #btn-submit{
    width: 100%;
    position: fixed;
    z-index: 1000;
    bottom: 50px;
    margin: 0;
    padding: 0 30px;
  }

  .mint-popup.select-card {
    width: 100%;
    height: 500px;
    .popup-content{
      height:100%;
      padding:0 5%;
      .bottom-title{
        text-align:center;
        font-size:22px;
        font-weight:500;
        height:50px;
        line-height:50px;
        margin-top:10px;
      }
    }
  }
}
</style>

