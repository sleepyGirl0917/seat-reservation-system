<template>
  <div class="vip-card-box">
    <div class="info-top">
      <div class="left">
        <span class="bg"></span>
        <div>储值卡</div>
      </div>
      <div class="right">&yen;43.9</div>
    </div>
    <div class="info-middle">充值后消费抵扣，预订座位按时计费，当日各门店累计完成单时长超过6小时后，超出时段免费</div>
    <div class="validity">有效期:2020-10-23</div>
  </div>
</template>
<style lang="stylus">
.vip-card-box {
  position: relative;
  width: 100%;
  height: 300px;
  background: rgb(224, 153, 57);
  border-radius: 10Px;
  padding: 60px 30px 0;

  .info-top {
    display: flex;
    align-items: center;
    font-size: 26px;

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
    font-size: 20px;
  }

  .validity {
    position: absolute;
    top: 8%;
    right: 6%;
    font-size: 20px;
  }
}
</style>
