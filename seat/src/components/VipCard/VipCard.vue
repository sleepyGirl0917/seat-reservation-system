<template>
  <div class="vip-card-box">
    <div class="info-top">
      <div class="left">
        <span class="bg"></span>
        <div>{{vipData.recharge_type|payTypeFilter}}</div>
      </div>
      <div class="right">
        <span v-if="vipData.recharge_type==1">&yen;{{vipData.balance}}</span>
      </div>
    </div>
    <div class="info-middle">
      <span v-if="vipData.recharge_type==1">充值后消费抵扣，预订座位按时计费，当日各门店累计完成单时长超过6小时后，超出时段免费</span>
      <span v-if="vipData.recharge_type==2">有效期内随时预定座位使用，不收取订座费用</span>
    </div>
    <div class="validity">有效期:{{vipData.deadline|dateTimeFilter('dateOnly')}}</div>
  </div>
</template>
<script>
export default {
  props:{
    vipData:null
  }
}
</script>

<style lang="stylus">
.vip-card-box {
  position: relative;
  width: 100%;
  height: 350px;
  background: rgb(224, 153, 57);
  border-radius: 10Px;
  padding: 70px 30px 0;

  .info-top {
    display: flex;
    align-items: center;
    font-size: 30px;
    line-height:80px;

    .left {
      flex: 1;
      display: flex;
      align-items: center;

      .bg {
        display: inline-block;
        width: 80px;
        height: 80px;
        background-image: url('../../assets/img/user/card.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      :nth-child(2) {
        padding-left: 20px;
      }
    }

    .right {
      flex: 1;
      text-align: right;
    }
  }

  .info-middle {
    margin-top: 50px;
    font-size: 25px;
    line-height:1.5;
  }

  .validity {
    position: absolute;
    top: 8%;
    right: 6%;
    font-size: 24px;
  }
}
</style>
